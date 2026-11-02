const fs = require('fs')
const path = require('path')

function addressTag(address){
    const value = Buffer.from(address, 'utf8')
    const header = Buffer.from([8, 0, 2, 105, 112, 0, 0])
    header.writeUInt16BE(value.length, 5)
    return Buffer.concat([header, value])
}

// Replace only the managed server's old NBT ip tag, preserving other entries and fields.
exports.migrateServerAddress = function(gameDirectory, previousAddress, currentAddress){
    const file = path.join(gameDirectory, 'servers.dat')
    if(previousAddress === currentAddress || !fs.existsSync(file)) return
    const original = fs.readFileSync(file)
    if(original[0] !== 10) return
    const previous = addressTag(previousAddress)
    const current = addressTag(currentAddress)
    const parts = []
    let offset = 0
    let index
    while((index = original.indexOf(previous, offset)) !== -1){
        parts.push(original.subarray(offset, index), current)
        offset = index + previous.length
    }
    if(offset === 0) return
    parts.push(original.subarray(offset))
    fs.writeFileSync(file, Buffer.concat(parts))
}
