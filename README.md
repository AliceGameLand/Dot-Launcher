# 귀염뽀쨕도트 런처

앨리스의 게임랜드 런처를 기반으로 만든 독립 Minecraft 런처입니다.

- 버컴퍼니 다이아몬드 대결 인스턴스만 표시합니다. 게임 파일은 AliceGameLand의 기존 공개 배포에서 업데이트합니다.
- Microsoft 로그인, Minecraft 26.2 / NeoForge 설치와 Windows용 Temurin JDK 25 번들을 지원합니다.
- 계정·런처 설정은 전용 dot-launcher 폴더, 게임 파일은 .dotlauncher 폴더에 저장합니다. 기존 앨리스 런처 데이터를 자동으로 가져오지 않습니다.

## 개발 및 검증

Node.js 22에서 다음 명령을 실행합니다.

```powershell
npm ci
npm run lint
node --test test/*.test.js
npm start
```

Windows 설치파일: `npm run dist:win -- --publish never`. 결과는 dist에 생성됩니다. 공개 릴리스는 GitHub Actions의 Windows Release 워크플로를 수동 실행할 때만 게시합니다.

## 저장소와 원본

- [소스 및 문의](https://github.com/AliceGameLand/Dot-Launcher)
- [기반 런처](https://github.com/AliceGameLand/AliceGameLand-Launcher)
- [게임 배포](https://github.com/AliceGameLand/AliceGameLand-Distribution)
- [Helios Launcher](https://github.com/dscalzi/HeliosLauncher), Daniel D. Scalzi — MIT 라이선스는 LICENSE.txt에 보존합니다.

초기 버전은 1.0.0이며, 첫 공개 릴리스 전에는 자동 업데이트 확인이 실패할 수 있습니다.
