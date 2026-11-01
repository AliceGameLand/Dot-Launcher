# 이미지 출처

## 아이콘

사용자가 제공한 캐릭터를 내장 image_gen 도구로 배경만 투명하게 처리했습니다.
원본 출력: app/assets/images/DotLauncher.png. 빌드 및 화면용 PNG/ICO는 이 이미지에서 변환했습니다.
실제 image_gen 편집 프롬프트 (transparent_background=true):

```text
Use case: background-extraction. Edit target: the provided square hand-drawn character image. Remove ONLY the exterior white background surrounding the character, including exterior space connected to the image border. Keep the exact original illustration, brown outlines, face, costume, pastel pink and mint colors and framing. Crucially preserve all enclosed white and pale pink regions INSIDE the character: face, ears/hood and clothing must remain opaque. No redraw, no added elements, no text, no shadow, no white border. Return a clean cutout on a genuinely transparent alpha background at the original square composition.
```

## 배경

Minecraft 공식 Beach Cabin 배경화면, 1920×1080. Mojang / Microsoft.
- 공식 페이지: https://www.minecraft.net/en-us/collectibles
- 원본 ZIP: https://www.minecraft.net/content/dam/minecraftnet/games/minecraft/software/wallpapers_minecraft_island.zip
- ZIP 내 파일: wallpaper_minecraft_island_1920x1080.png
- 사용 파일: app/assets/images/backgrounds/0.jpg (JPEG 포맷 변환)

배경 이미지는 생성 이미지가 아닙니다. Minecraft 자산의 권리는 해당 권리자에게 있습니다. 이 런처는 Mojang 또는 Microsoft의 공식 제품이 아닙니다.
