const { DiamondDistributionAPI } = require('./diamonddistribution')

const ConfigManager = require('./configmanager')

// 게임 파일은 원본 배포를 따라가되 다이아몬드 인스턴스만 노출한다.
exports.REMOTE_DISTRO_URL = 'https://github.com/AliceGameLand/AliceGameLand-Distribution/releases/latest/download/distribution.json'

const api = new DiamondDistributionAPI(
    ConfigManager.getLauncherDirectory(),
    null, // Injected forcefully by the preloader.
    null, // Injected forcefully by the preloader.
    exports.REMOTE_DISTRO_URL,
    process.env.DOT_LOCAL_DISTRIBUTION === '1'
)

exports.DistroAPI = api
