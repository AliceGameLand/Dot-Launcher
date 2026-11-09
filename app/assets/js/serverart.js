const DEFAULT_BACKGROUND = 'assets/images/backgrounds/0.jpg'

function getServerBackground(serverId){
    return serverId === 'DiamondCK-26.2'
        ? 'assets/images/backgrounds/servers/diamond.png'
        : DEFAULT_BACKGROUND
}

module.exports = { DEFAULT_BACKGROUND, getServerBackground }
