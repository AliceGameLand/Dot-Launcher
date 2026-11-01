const { DistributionAPI } = require('helios-core/common')

const DIAMOND_SERVER_ID = 'DiamondCK-26.2'

// 원격·캐시에 같은 제한을 적용해야 새 서버가 추가되어도 목록이 바뀌지 않는다.
function selectDiamondDistribution(distribution){
    if(!Array.isArray(distribution?.servers)) return null
    const servers = distribution.servers.filter(server => server?.id === DIAMOND_SERVER_ID)
    if(servers.length !== 1 || !Array.isArray(servers[0].modules)) return null
    return {
        ...distribution,
        servers: [{ ...servers[0], mainServer: true }]
    }
}

class DiamondDistributionAPI extends DistributionAPI {
    async pullRemote(){
        const response = await super.pullRemote()
        // null은 상위 API가 기존 캐시를 보존하고 복구하도록 하는 신호다.
        return { ...response, data: selectDiamondDistribution(response.data) }
    }

    async pullLocal(){
        return selectDiamondDistribution(await super.pullLocal())
    }
}

module.exports = { DiamondDistributionAPI }
