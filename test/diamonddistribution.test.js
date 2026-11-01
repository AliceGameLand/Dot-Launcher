const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs/promises')
const os = require('node:os')
const path = require('node:path')
const http = require('node:http')
const { DiamondDistributionAPI } = require('../app/assets/js/diamonddistribution')

function fixture(){
    return {
        version: '1',
        servers: [
            { id: 'other', name: 'Other', mainServer: true, address: 'localhost', minecraftVersion: '26.2', modules: [] },
            {
                id: 'AliceDiamond-26.2', name: '버컴퍼니 다이아몬드 대결', mainServer: false,
                address: 'diamond.example.test:25565', minecraftVersion: '26.2',
                modules: [{ id: 'diamond:options', name: 'options', type: 'File', artifact: {
                    path: 'options.txt', url: 'https://example.test/options.txt', size: 1
                } }]
            }
        ]
    }
}

async function setup(t, distribution, status = 200){
    const directory = await fs.mkdtemp(path.join(os.tmpdir(), 'dot-distribution-'))
    let currentDistribution = distribution
    let currentStatus = status
    const server = http.createServer((_request, response) => {
        response.writeHead(currentStatus, { 'content-type': 'application/json' })
        response.end(JSON.stringify(currentDistribution))
    })
    await new Promise(resolve => server.listen(0, '127.0.0.1', resolve))
    t.after(async () => {
        await new Promise(resolve => server.close(resolve))
        await fs.rm(directory, { recursive: true, force: true })
    })
    const api = new DiamondDistributionAPI(directory, path.join(directory, 'common'),
        path.join(directory, 'instances'), `http://127.0.0.1:${server.address().port}`, false)
    return {
        directory, api,
        respondWith(data, code = 200){ currentDistribution = data; currentStatus = code }
    }
}

test('remote index exposes and caches only Diamond while keeping its download metadata', async t => {
    const source = fixture()
    const { api, directory } = await setup(t, source)
    const result = await api.getDistribution()
    assert.deepEqual(result.servers.map(server => server.rawServer.id), ['AliceDiamond-26.2'])
    assert.equal(result.getMainServer().rawServer.name, '버컴퍼니 다이아몬드 대결')
    assert.deepEqual(result.getMainServer().rawServer.modules, source.servers[1].modules)
    assert.equal(source.servers[1].mainServer, false)
    const cached = JSON.parse(await fs.readFile(path.join(directory, 'distribution.json'), 'utf8'))
    assert.equal(cached.servers.length, 1)
    assert.equal(cached.servers[0].mainServer, true)
})

test('network failure filters a multi-server cache before selecting the default', async t => {
    const { api, directory } = await setup(t, {}, 404)
    await fs.writeFile(path.join(directory, 'distribution.json'), JSON.stringify(fixture()))
    const result = await api.getDistribution()
    assert.equal(result.servers.length, 1)
    assert.equal(result.getMainServer().rawServer.id, 'AliceDiamond-26.2')
})

test('a remote index missing Diamond uses the valid cache without overwriting it', async t => {
    const { api, directory } = await setup(t, { servers: [fixture().servers[0]] })
    const original = JSON.stringify(fixture())
    await fs.writeFile(path.join(directory, 'distribution.json'), original)
    assert.equal((await api.getDistribution()).servers.length, 1)
    assert.equal(await fs.readFile(path.join(directory, 'distribution.json'), 'utf8'), original)
})

test('missing or ambiguous Diamond entries fail when no valid cache exists', async t => {
    for(const servers of [[], [fixture().servers[0]], [fixture().servers[1], fixture().servers[1]], null]){
        const { api } = await setup(t, { servers })
        await assert.rejects(api.getDistribution(), /Unable to load distribution/)
    }
})

test('an invalid local cache cannot expose another instance', async t => {
    const { api, directory } = await setup(t, { servers: [] })
    await fs.writeFile(path.join(directory, 'distribution.json'), JSON.stringify({ servers: [fixture().servers[0]] }))
    await assert.rejects(api.getDistribution(), /Unable to load distribution/)
})

test('refresh keeps the loaded Diamond when remote and disk no longer contain it', async t => {
    const { api, directory, respondWith } = await setup(t, fixture())
    const initial = await api.getDistribution()
    respondWith({ servers: [] })
    await fs.writeFile(path.join(directory, 'distribution.json'), JSON.stringify({ servers: [] }))
    assert.equal(await api.refreshDistributionOrFallback(), initial)
})

test('local development and local-only loading enforce the same instance restriction', async t => {
    const { api, directory } = await setup(t, {})
    api.toggleDevMode(true)
    await fs.writeFile(path.join(directory, 'distribution_dev.json'), JSON.stringify(fixture()))
    const result = await api.getDistributionLocalLoadOnly()
    assert.equal(result.servers.length, 1)
    assert.equal(result.getMainServer().rawServer.id, 'AliceDiamond-26.2')
})
