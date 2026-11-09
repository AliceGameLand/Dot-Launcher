# 이미지 출처

## 아이콘

사용자가 제공한 캐릭터를 내장 image_gen 도구로 배경만 투명하게 처리했습니다.
원본 출력: app/assets/images/DotLauncher.png. 빌드 및 화면용 PNG/ICO는 이 이미지에서 변환했습니다.
실제 image_gen 편집 프롬프트 (transparent_background=true):

```text
Use case: background-extraction. Edit target: the provided square hand-drawn character image. Remove ONLY the exterior white background surrounding the character, including exterior space connected to the image border. Keep the exact original illustration, brown outlines, face, costume, pastel pink and mint colors and framing. Crucially preserve all enclosed white and pale pink regions INSIDE the character: face, ears/hood and clothing must remain opaque. No redraw, no added elements, no text, no shadow, no white border. Return a clean cutout on a genuinely transparent alpha background at the original square composition.
```

## 배경과 서버 아이콘

- 기본 정원 배경과 다이아 광산 배경은 [AliceGameLand-Launcher](https://github.com/AliceGameLand/AliceGameLand-Launcher/tree/aae5c458df7ed73ade0cdb1621d9027b504e7735/app/assets/images/backgrounds)에서 가져왔습니다. 아마도 야생은 기본 정원 배경을 사용합니다.
- 서버 선택에 쓰는 다이아와 잔디 블록 아이콘은 [Dot-Distribution](https://github.com/AliceGameLand/Dot-Distribution/tree/main/metadata)의 이미지를 사용합니다.

이 런처는 Mojang 또는 Microsoft의 공식 제품이 아닙니다.
