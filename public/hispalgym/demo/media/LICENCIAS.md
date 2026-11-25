# Fotos y vídeos de la demo

Ficheros públicos de la demo (no se importan): `scripts/apply-demo.mjs` copia `photos/` y `video/` a `public-demo/media/`.
Se piden por URL con `photoUrl`, `photoThumbUrl`, `videoUrl` y `videoPosterUrl` de `index.ts`. Los datos de cada clip
(ejercicio, material, músculo, series, instrucciones) están en `ejercicios.ts`. Peso total de la carpeta: unos 2,5 MB.

## Fotos (`photos/<clave>.webp` y `<clave>-thumb.webp`)

Todas salen de las dos fotos de la maqueta aprobada «Hispal GYM rediseño», salvo tres (marcadas «añadida») que no se podían
cubrir con ellas.

- **Foto A** (cuerdas de batalla, un hombre y una mujer, 600x399) y **Foto B** (rack de mancuernas con la sala al fondo,
  600x400): del artefacto de la maqueta del usuario. Según el usuario son de Pexels (Pexels License). **Fotógrafo/a y URL por
  completar.**
- **Fotogramas añadidos**: fotogramas de vídeos de Mixkit (Mixkit Stock Video Free License), descargados el 25-11-2026. No son
  de la maqueta.

Los recortes están en píxeles de la foto original (x, y, ancho, alto). Todos se ven distintos entre sí (recorte, zoom y
encuadre); solo `evento` va reflejada, y su recorte deja fuera el rótulo de la sala, que reflejado saldría al revés.

| Clave | Fichero (grande / miniatura) | Origen | Recorte grande | Autoría y licencia |
|---|---|---|---|---|
| `entrada` | 900x599 / 360x360 | Foto A de la maqueta | foto entera | Pexels (según el usuario); fotógrafo/a y URL por completar |
| `socio` | 900x506 / 360x360 | Foto A de la maqueta | 0,62 600x337 (16:9) | ídem |
| `rutina-general` | 705x470 / 345x345 | Foto A de la maqueta | 30,70 470x313 (la pareja) | ídem |
| `rutina-empuje` | 525x393 / 345x345 | Foto A de la maqueta | 0,75 350x262 (la mujer) | ídem |
| `clase-funcional` | 530x398 / 360x360 | Foto A de la maqueta | 247,80 353x265 (el hombre) | ídem |
| `clase-boxeo` | 600x401 / 359x359 | Foto A de la maqueta | 0,132 400x267 (la cuerda en primer plano) | ídem |
| `evento` | 570x321 / 360x360 | Foto A de la maqueta | 220,80 380x214, reflejada | ídem |
| `membresia` | 900x600 / 360x360 | Foto B de la maqueta | foto entera | ídem |
| `rutina-fuerza` | 600x401 / 360x360 | Foto B de la maqueta | 0,0 400x267 (rack, parte alta) | ídem |
| `rutina-pierna` | 480x360 / 360x360 | Foto B de la maqueta | 0,140 320x240 (primer plano de las mancuernas) | ídem |
| `rutina-core` | 450x338 / 345x345 | Foto B de la maqueta | 300,50 300x225 (la mujer del fondo) | ídem |
| `clase-general` | 540x360 / 345x345 | Foto B de la maqueta | 240,110 360x240 (suelo y luz del ventanal) | ídem |
| `tienda` | 525x350 / 360x360 | Foto B de la maqueta | 70,40 350x233 (rack y ventanal) | ídem |
| `rutina-cardio` | 900x600 / 360x360 | Añadida: fotograma (10 s) del vídeo [Woman running on treadmill in gym fitness session](https://mixkit.co/free-stock-video/woman-running-on-treadmill-in-gym-fitness-session-100528/) (Mixkit 100528, versión 720p) | 60,0 1000x667 | Mixkit no publica autor/a en la ficha. Mixkit Stock Video Free License. Descargado el 25-11-2026 |
| `clase-ciclo` | 900x600 / 360x360 | Añadida: fotograma (5 s) del vídeo [A young woman athlete pedaling on a stationary bike](https://mixkit.co/free-stock-video/a-young-woman-athlete-pedaling-on-a-stationary-bike-50959/) (Mixkit 50959, 720p; el vídeo original es en blanco y negro) | 160,0 1080x720 | ídem |
| `clase-estiramientos` | 900x600 / 360x360 | Añadida: fotograma (16 s) del vídeo [Man and a woman gym-goers stretching](https://mixkit.co/free-stock-video/man-and-a-woman-gym-goers-stretching-44437/) (Mixkit 44437, 720p) | 200,0 1080x720 | ídem |

Las miniaturas son recortes cuadrados al sujeto de la misma foto. Cada foto de la maqueta es de 600 px, así que ninguna se
amplía más de 1,5 veces: por eso las fotos de la maqueta salen de 450 a 900 px de ancho según cuánto se recorta.

Proceso (con `sharp`): recorte, reflejo en `evento`, escalado Lanczos (a lo sumo 1,5x en las fotos de la maqueta), afilado suave
(sigma 0,7) y WebP de calidad 74. No se oscurecen: el degradado es CSS común.

## Vídeos (`video/<clave>.mp4` y póster `<clave>.webp`)

Seis clips de Mixkit de la misma serie (gimnasio oscuro con luces de neón, ropa negra), 854x480, H.264 perfil main,
`yuv420p`, 24 fps, sin audio, `+faststart`. Cada clip es un tramo con el principio y el final lo más parecidos posible
(se buscó automáticamente el par de fotogramas más similar) para que el bucle apenas se note. Póster: su primer fotograma en WebP.

| Clave | Ejercicio que se ve | Origen | Tramo | Duración / peso | Autoría y licencia |
|---|---|---|---|---|---|
| `press-banca` | Press de banca con barra | [Man in a Weightlifting Session](https://mixkit.co/free-stock-video/man-in-a-weightlifting-session-100545/) (Mixkit 100545, 720p) | 2,00 s a 6,83 s | 4,8 s, 282 KB (póster 12 KB) | Mixkit no publica autor/a en la ficha. Mixkit Stock Video Free License. Descargado el 25-11-2026 |
| `aperturas-polea` | Aperturas en polea (cruce de poleas) | [Man performing cable fly exercise in gym.](https://mixkit.co/free-stock-video/man-performing-cable-fly-exercise-in-gym-100546/) (Mixkit 100546, 720p) | 7,25 s a 12,50 s | 5,3 s, 311 KB (póster 22 KB) | ídem |
| `remo-polea` | Remo en polea baja, sentado | [Man exercising on a rowing machine in the gym](https://mixkit.co/free-stock-video/man-exercising-on-a-rowing-machine-in-the-gym-100550/) (Mixkit 100550, 720p) | 5,17 s a 10,67 s | 5,5 s, 336 KB (póster 30 KB) | ídem |
| `elevacion-piernas` | Elevación de piernas colgado | [Toned Man Performing Pull-ups](https://mixkit.co/free-stock-video/toned-man-performing-pull-ups-100551/) (Mixkit 100551, 720p; el título dice dominadas, pero el tramo elegido muestra elevaciones de piernas) | 4,75 s a 10,67 s | 5,9 s, 229 KB (póster 27 KB) | ídem |
| `prensa-piernas` | Prensa de piernas | [Woman using a leg press machine in the gym](https://mixkit.co/free-stock-video/woman-using-a-leg-press-machine-in-the-gym-100520/) (Mixkit 100520, 720p) | 6,92 s a 12,75 s | 5,8 s, 312 KB (póster 27 KB) | ídem |
| `cinta-correr` | Cinta de correr (trote) | [Woman jogging on a treadmill in a gym setting](https://mixkit.co/free-stock-video/woman-jogging-on-a-treadmill-in-a-gym-setting-100527/) (Mixkit 100527, 720p) | 6,58 s a 12,91 s | 6,3 s, 364 KB (póster 14 KB) | ídem |

Proceso (con `ffmpeg`): corte del tramo, escalado a 854x480 (Lanczos), `libx264 -profile:v main -crf 26 -preset slow -r 24`,
sin audio (`-an`), sin metadatos, `-movflags +faststart`. El póster sale del primer fotograma ya codificado, como WebP
de calidad 72.

## Licencias

- **Pexels License** (fotos de la maqueta, según el usuario): uso libre, también comercial, sin atribución obligatoria.
  Texto oficial: <https://www.pexels.com/license/>. Falta confirmar el fotógrafo y la URL de cada una.
- **Mixkit Stock Video Free License** (vídeos y fotogramas añadidos): la ficha de cada clip enlaza a esta licencia, y
  la página oficial explica que los elementos se pueden usar en proyectos comerciales y no comerciales sin atribución.
  Texto oficial: <https://mixkit.co/license/#videoFree>. Los términos completos no vienen en el HTML de la página (se abren
  en una ventana de la web de Mixkit) y no se han podido copiar aquí: revisarlos en ese enlace antes de redistribuir nada.
  Los clips son parte de la demo y no se ofrecen como descarga.

Sin logotipos destacados ni desnudos. Quedan a la vista un rótulo parcial («YM») al fondo de la foto A (en `entrada`, `socio`,
`rutina-general` y `rutina-empuje`), los rótulos genéricos de la sala del fotograma de `clase-estiramientos` («Barras»,
«Kettlebells») y, en el vídeo `cinta-correr`, un logotipo diminuto del fabricante en la pantalla de la cinta, apenas legible (en la foto `rutina-cardio` queda fuera del recorte).
