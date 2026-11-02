# 다이아ck 독립 배포 검증

검증일: 2026-11-01 (Asia/Seoul). 런처 1.0.1 / 게임 배포 1.0.0.

## 변경

- 게임 배포를 AliceGameLand/Dot-Distribution으로 분리했습니다. 런타임 배포 인덱스와 게임 파일은 원본 AliceGameLand-Distribution을 참조하지 않습니다. NeoForge·Minecraft 공용 라이브러리는 제작사 공식 저장소를 사용합니다.
- 표시 이름: 다이아ck. 독립 ID: DiamondCK-26.2. 접속 주소: alicehiyam.dreamcraft.kr:25567.
- AliceDiamondClient와 alice-diamond 전용 리소스팩을 제외했습니다. 옵션의 전용 리소스팩 선택도 제거했습니다. 새 ID의 인스턴스 폴더를 사용하여 기존 콘텐츠 파일을 가져오지 않습니다.
- Donation, 가방과 가방 코어, 최적화·한글·미니맵 유틸리티를 유지했습니다. 서버 목록을 새 이름·주소로 생성하고 기존 사용자 옵션·Iris·서버 목록은 덮어쓰지 않습니다.
- 런처 환영 문구에서 버컴퍼니 다이아몬드 대결 문구를 제거했습니다. 공개 저장소 설명과 README는 간단한 소개를 유지합니다.

## 포함 모드 (14개)

- ImmediatelyFast-NeoForge-1.16.3+26.2.jar
- cloth-config-26.2.155.jar
- donation-neoforge-26.2-3.0.1-patched.jar
- dynamic-fps-3.11.9+minecraft-26.2.0-neoforge.jar
- fast-ip-ping-v1.0.11-mc26.1.2.jar
- ferritecore-9.0.0-neoforge.jar
- iris-neoforge-1.11.2+mc26.2.jar
- koreanify-neoforge-0.1.10+mc26.1.2.jar
- lithium-neoforge-0.25.3+mc26.2.jar
- moreculling-neoforge-26.2-1.8.1.jar
- sodium-neoforge-0.9.1+mc26.2.jar
- sophisticatedbackpacks-26.2-3.26.2.2154.jar
- sophisticatedcore-26.2-1.5.0.2337.jar
- journeymap-neoforge-26.2-6.0.10.jar

## 검증

- Node.js 22 ESLint 통과, 회귀 테스트 16개 통과. 이전 Alice 인스턴스의 원격 데이터와 캐시를 거부하는 사례를 추가했습니다.
- 14개 최상위 JAR와 번들 의존 JAR의 메타데이터를 확인했습니다. Donation은 Minecraft/NeoForge만 필수 의존하며, JourneyMap의 commonnetworking은 JAR 내부에 포함되어 있습니다. 필요한 클라이언트 의존 모드 ID가 모두 존재합니다.
- 독립 배포는 31개 최상위 모듈 / 중첩 포함 59개 모듈입니다. 게시 자산 32개와 distribution.json, 총 33개 파일을 별도 릴리스에 게시했습니다.
- npm run verify와 npm run verify:remote 통과: 공개 자산 32개를 실제 다운로드하여 크기·MD5·SHA-256, 옵션 기본값과 서버 주소를 검증했습니다.
- 새 Git 체크아웃에서도 기본 설정과 메타데이터의 SHA-256이 유지됩니다. 배포 설정 파일의 줄바꿈 변환을 막는 .gitattributes를 적용했습니다.
- 실제 런처 배포 API가 새 공개 인덱스를 읽어 이전 Alice 캐시를 교체하고 다이아ck만 반환하는 것을 확인했습니다.
- Windows NSIS 설치파일 빌드 성공. app.asar의 배포 URL·인스턴스 ID·환영 문구와 버전 1.0.1을 확인했습니다.

## 결과물

- 배포 저장소: https://github.com/AliceGameLand/Dot-Distribution
- 게임 파일 릴리스: https://github.com/AliceGameLand/Dot-Distribution/releases/tag/client-v1.0.0
- 설치파일: dist/dot-launcher-setup-1.0.1.exe
- 크기: 224369482 bytes
- SHA-256: 02055bb1d6433f89d77d5c6faa8b81cafee2e990233bf6eaa2f975011d7514ad

실제 Microsoft 로그인·게임 실행·서버 접속은 이번 작업에서 수행하지 않았습니다. 모드 로딩과 후원 기능의 인게임 검증은 남아 있습니다. 런처 자체의 공개 릴리스는 게시하지 않았으므로 기존 설치본은 새 설치파일로 업데이트해야 합니다. 원본 앨리스 런처·배포 저장소는 변경하지 않았습니다.
