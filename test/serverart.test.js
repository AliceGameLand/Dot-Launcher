const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const { DEFAULT_BACKGROUND, getServerBackground } = require('../app/assets/js/serverart')

test('Maybe Survival and unknown servers use the original garden', () => {
    for(const id of ['MaybeSurvival-26.3', 'new-server', null, undefined, 'toString', '__proto__']){
        assert.equal(getServerBackground(id), DEFAULT_BACKGROUND)
    }
    assert.ok(fs.existsSync(path.join(__dirname, '../app', DEFAULT_BACKGROUND)))
})

test('Diamond CK uses the bundled diamond landscape', () => {
    const file = getServerBackground('DiamondCK-26.2')
    assert.notEqual(file, DEFAULT_BACKGROUND)
    const bytes = fs.readFileSync(path.join(__dirname, '../app', file))
    assert.equal(bytes.subarray(1, 4).toString(), 'PNG')
    assert.ok(Math.abs(bytes.readUInt32BE(16) / bytes.readUInt32BE(20) - 16 / 9) < 0.01)
})
