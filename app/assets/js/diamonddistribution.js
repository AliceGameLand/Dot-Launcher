const { DistributionAPI } = require('helios-core/common')

const DIAMOND_SERVER_ID = 'DiamondCK-26.2'
const SURVIVAL_SERVER_ID = 'MaybeSurvival-26.3'

// 이전 다이아 전용 캐시도 허용하되, 독립 배포의 두 인스턴스만 노출한다.
function selectDiamondDistribution(distribution){
    if(!Array.isArray(distribution?.servers)) return null
    const servers = []
    for(const id of [DIAMOND_SERVER_ID, SURVIVAL_SERVER_ID]){
        const matches = distribution.servers.filter(server => server?.id === id)
        if(matches.length > 1 || (id === DIAMOND_SERVER_ID && matches.length !== 1)) return null
        if(matches.length === 0) continue
        if(!Array.isArray(matches[0].modules)) return null
        servers.push({ ...matches[0], mainServer: id === DIAMOND_SERVER_ID })
    }
    return {
        ...distribution,
        servers
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
