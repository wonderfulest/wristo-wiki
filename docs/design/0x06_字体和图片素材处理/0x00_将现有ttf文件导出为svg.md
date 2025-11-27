## 场景：



我有 图标字体ttf 或者 天气图标字体ttf文件，要导出为 SVG 进行二次编辑



## 在线工具https://font.qqe2.com/



测试单个文字导出效果良好



## 方案一：使用 `fontforge` + `svg` 导出

导出来的svg 可能是反方向的 - 测试效果不是很好

```shell
python3 /Users/mac/workspace/garmin/watchface-resources/icons/icons_ttf2svg-fontTools.py /Users/mac/workspace/gar
min/watchface-resources/icons/connect-icons-font/font.ttf /Users/mac/workspace/garmin/watchface-resources/icons/connect-icons-font-svg          
```

```
import fontforge

font = fontforge.open("your_font.ttf")
for glyph in font.glyphs():
    if glyph.isWorthOutputting():
        glyph.export(f"output/{glyph.unicode}.svg")
```

