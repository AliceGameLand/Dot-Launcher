const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')
const vm = require('node:vm')
const { createRequire } = require('node:module')

test('new profiles keep Alice accounts, legacy settings and game data untouched', t => {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'dot-profile-'))
    t.after(() => fs.rmSync(directory, { recursive: true, force: true }))
    const aliceDirectory = path.join(directory, '.alicegameland')
    const dotDirectory = path.join(directory, 'dot-launcher')
    fs.mkdirSync(aliceDirectory)
    const aliceConfig = JSON.stringify({ selectedAccount: 'alice', authenticationDatabase: { alice: {} } })
    const aliceConfigPath = path.join(aliceDirectory, 'config.json')
    fs.writeFileSync(aliceConfigPath, aliceConfig)
    const filename = path.resolve(__dirname, '../app/assets/js/configmanager.js')
    const originalRequire = createRequire(filename)
    const configManager = {}
    const context = vm.createContext({
        exports: configManager,
        process: { env: { APPDATA: directory }, platform: process.platform },
        require(id){
            if(id === '@electron/remote') return { app: { getPath: () => dotDirectory } }
            return originalRequire(id)
        }
    })
    vm.runInContext(fs.readFileSync(filename, 'utf8'), context, { filename })
    configManager.load()
    assert.equal(configManager.getLauncherDirectory(), dotDirectory)
    assert.equal(configManager.getDataDirectory(), path.join(directory, '.dotlauncher'))
    assert.equal(configManager.getInstanceDirectory(), path.join(directory, '.dotlauncher', 'instances'))
    assert.notEqual(configManager.getTempNativeFolder(), 'WCNatives')
    assert.deepEqual(Object.keys(configManager.getAuthAccounts()), [])
    assert.equal(fs.readFileSync(aliceConfigPath, 'utf8'), aliceConfig)
    assert.ok(fs.existsSync(path.join(dotDirectory, 'config.json')))
    assert.equal(fs.existsSync(path.join(directory, '.dotlauncher')), false)
})
