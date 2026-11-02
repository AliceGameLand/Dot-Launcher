const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')
const { migrateServerAddress } = require('../app/assets/js/serverlist')

function stringTag(name, value){
    const key = Buffer.from(name)
    const text = Buffer.from(value)
    const header = Buffer.alloc(3)
    header[0] = 8
    header.writeUInt16BE(key.length, 1)
    const size = Buffer.alloc(2)
    size.writeUInt16BE(text.length)
    return Buffer.concat([header, key, size, text])
}

test('Server port migration preserves other entries and user fields and is idempotent', () => {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'dot-serverlist-'))
    try {
        const oldAddress = 'alicehiyam.dreamcraft.kr:25568'
        const newAddress = 'alicehiyam.dreamcraft.kr:25567'
        const prefix = Buffer.from([10, 0, 0, 9, 0, 7, ...Buffer.from('servers'), 10, 0, 0, 0, 2])
        const first = [stringTag('name', oldAddress), stringTag('ip', oldAddress), Buffer.from([0])]
        const second = [stringTag('name', '내 다른 서버'), stringTag('ip', 'example.com:25565'), Buffer.from([0, 0])]
        const file = path.join(directory, 'servers.dat')
        fs.writeFileSync(file, Buffer.concat([prefix, ...first, ...second]))
        migrateServerAddress(directory, oldAddress, newAddress)
        const expected = Buffer.concat([prefix, first[0], stringTag('ip', newAddress), first[2], ...second])
        assert.deepEqual(fs.readFileSync(file), expected)
        migrateServerAddress(directory, oldAddress, newAddress)
        assert.deepEqual(fs.readFileSync(file), expected)
        fs.unlinkSync(file)
        migrateServerAddress(directory, oldAddress, newAddress)
        assert.equal(fs.existsSync(file), false)
    } finally {
        fs.rmSync(directory, { recursive: true, force: true })
    }
})
