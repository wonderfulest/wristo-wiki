# 模板项目





# 视频处理



## mp4 转 gif

```
ffmpeg -i input.mp4 -vf "crop=720:720,scale=720:720:flags=lanczos,fps=10,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse" -loop 0 output.gif


ffmpeg -i 2126_1719208276.mp4 -vf "crop=720:720,scale=720:720:flags=lanczos,fps=10,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse" -loop 0 output.gif

```



## Monkey Motion处理成mmm

https://developer.garmin.com/connect-iq/reference-guides/monkey-motion-reference/