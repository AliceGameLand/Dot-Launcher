const { DiamondDistributionAPI } = require('./diamonddistribution')

const ConfigManager = require('./configmanager')

// 도트 전용 배포 저장소에서 허용된 다이아·야생 구성을 읽는다.
exports.REMOTE_DISTRO_URL = 'https://github.com/AliceGameLand/Dot-Distribution/releases/latest/download/distribution.json'

const api = new DiamondDistributionAPI(
    ConfigManager.getLauncherDirectory(),
    null, // Injected forcefully by the preloader.
    null, // Injected forcefully by the preloader.
    exports.REMOTE_DISTRO_URL,
    process.env.DOT_LOCAL_DISTRIBUTION === '1'
)

exports.DistroAPI = api
