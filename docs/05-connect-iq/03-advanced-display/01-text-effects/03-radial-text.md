## API解析

https://developer.garmin.com/connect-iq/api-docs/Toybox/Graphics/Dc.html#drawRadialText-instance_function

```
drawRadialText(x as Lang.Numeric, y as Lang.Numeric, font as Graphics.VectorFont, text as Lang.String, justification as Graphics.TextJustification or Lang.Number, angle as Lang.Numeric, radius as Lang.Numeric, direction as Graphics.RadialTextDirection) as Void
Draw radial text

Draw text oriented along an arc.

Parameters:

x — (Lang.Numeric) — The x location of the center of circle for radial text
y — (Lang.Numeric) — The y location of the center of circle for radial text
font — (Graphics.VectorFont) — The font to use.
text — (Lang.String) — The String to render.
justification — (Graphics.TextJustification, Lang.Number) — Specifies how text placed relative to the text location.
angle — (Lang.Numeric) — Angle to a point on the circle to justify text in degrees counter-clockwise from the 3 o'clock position.
radius — (Lang.Numeric) — Distance from center of circle on which to draw text.
direction — (Graphics.RadialTextDirection) — Text drawing direction along the arc.
```



## Sample

```javascript

//! Defines the possible TTF face names
const ALL_FACE_NAMES = [
    "BionicBold",
    "ExoSemiBold",
    "KosugiRegular",
    "NanumGothicBold",
    "NanumGothicExtraBold",
    "NanumGothicRegular",
    "NotoNaskhArabicBold",
    "NotoNaskhArabicRegular",
    "NotoSansArmenianBold",
    "NotoSansArmenianRegular",
    "NotoSansHebrewBold",
    "NotoSansHebrewRegular",
    "NotoSansSCMedium",
    "PridiRegular",
    "PridiRegularGarmin",
    "PridiSemiBoldGarmin",
    "RobotoBlack",
    "RobotoCondensedBold",
    "RobotoCondensedRegular",
    "RobotoCondensedRegularItalic",
    "RobotoRegular",
    "SakkalMajallaBold",
    "SakkalMajallaRoman",
    "Swiss721Bold",
    "Swiss721Regular",
    "TomorrowBold",
    "YantramanavRegular"
];
class Circle003View extends Ui.WatchFace {
  	//! Get the first TTF for the given size
    //! @param size The expected TTF size
    function getFirstAvailableTrueTypeFont(size as Number or Float) as VectorFont {
      if (!(Toybox.Graphics has :getVectorFont)) {
        return null;
      }
      for (var i = 0; i < ALL_FACE_NAMES.size(); i++) {
        var font = Graphics.getVectorFont({:face => ALL_FACE_NAMES[i], :size => size});
        if (font != null) {
          return font;
        }
      }
      return null;
    }
		
    function onUpdate(dc) {
      if (!inLowPower || !canBurnIn) {
        RadialText.draw(
          dc,
          screenXCenter * {{ element.left }},
          screenYCenter * {{ element.top }},
          {{ element.textProperty or "{{ element.textTemplate }}"}},
          getFirstAvailableTrueTypeFont({{element.fontSize}}),
          {
            :font => {{ element.fontId }}, // 前端传入的字体
            :radius => {{ element.radius }},
            :angle => {{ element.angle }},
            :justification => {{ element.justify }},
          } as RadialText.CustomOpt
        );
      }
    }
}

```



# RadialText

```c
dc.setColor(0xff0000, -1);
var vectorFont=Graphics.getVectorFont({:face=>["RobotoCondensedRegular","RobotoRegular"], :size=>36});
//top
dc.drawRadialText(width/2, height/2, vectorFont, "1234", Graphics.TEXT_JUSTIFY_CENTER, 90, width/2-(height*.15), Graphics.RADIAL_TEXT_DIRECTION_CLOCKWISE);
dc.drawRadialText(width/2, height/2, vectorFont, "5678", Graphics.TEXT_JUSTIFY_CENTER, 90, width/2-(height*.15)-20, Graphics.RADIAL_TEXT_DIRECTION_COUNTER_CLOCKWISE);    
//bottom
dc.drawRadialText(width/2, height/2, vectorFont, "1234", Graphics.TEXT_JUSTIFY_CENTER, 270, width/2-(height*.15), Graphics.RADIAL_TEXT_DIRECTION_CLOCKWISE);
dc.drawRadialText(width/2, height/2, vectorFont, "5678", Graphics.TEXT_JUSTIFY_CENTER, 270, width/2-(height*.15)-20, Graphics.RADIAL_TEXT_DIRECTION_COUNTER_CLOCKWISE);
//right
dc.drawRadialText(width/2, height/2, vectorFont, "1234", Graphics.TEXT_JUSTIFY_CENTER, 0, width/2-(height*.15), Graphics.RADIAL_TEXT_DIRECTION_CLOCKWISE);
dc.drawRadialText(width/2, height/2, vectorFont, "5678", Graphics.TEXT_JUSTIFY_CENTER, 0, width/2-(height*.15)-20, Graphics.RADIAL_TEXT_DIRECTION_COUNTER_CLOCKWISE);
//left
dc.drawRadialText(width/2, height/2, vectorFont, "1234", Graphics.TEXT_JUSTIFY_CENTER, 180, width/2-(height*.15), Graphics.RADIAL_TEXT_DIRECTION_CLOCKWISE);
dc.drawRadialText(width/2, height/2, vectorFont, "5678", Graphics.TEXT_JUSTIFY_CENTER, 180, width/2-(height*.15)-20, Graphics.RADIAL_TEXT_DIRECTION_COUNTER_CLOCKWISE);

```

# 练习

## Crimson Fleet 

https://www.facer.io/watchface/nHbf7WZUtt?watchModel=gw5progray

## Constellation 

https://www.facer.io/watchface/AjDPospMNM?watchModel=galaxywatch4black



# VectorFont

在模拟器的设备位置下，

/Users/mac/Library/Application\ Support/Garmin/ConnectIQ/Devices   

找到对应的设备的 simulator.json 文件，里面有支持的字体类型，一般定义为下面的类型即可：

```
var vectorFont=Graphics.getVectorFont({:face=>["RobotoCondensedRegular","RobotoRegular"], :size=>36});
```



## 官方demo位置

```
/Users/mac/workspace/garmin/samples/TrueTypeFonts  
```
