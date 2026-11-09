const icons = Object.freeze({
    'DiamondCK-26.2': 'diamond.png',
    'MaybeSurvival-26.3': 'grass-block.png'
})

// Home and settings use the same icon even when the network is unavailable.
exports.getServerIcon = function(server){
    return Object.hasOwn(icons, server.id)
        ? 'assets/images/server-icons/' + icons[server.id]
        : server.icon || 'assets/images/SealCircle.png'
}
