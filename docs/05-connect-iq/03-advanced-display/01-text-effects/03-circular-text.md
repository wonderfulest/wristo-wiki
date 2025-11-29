```javascript
class Circle003View extends Ui.WatchFace {
  	//vector font
    var hasScalable=false;
    var vectorF=null;
    var vectorH=0;
    var vectorR=0;
		function initialize() {
				//check for scalable fonts
        hasScalable=(Toybox.Graphics has :getVectorFont); 
    }
		function onLayout(dc) {
      if(hasScalable) {
            vectorH=smallH-20;
            vectorF=Graphics.getVectorFont({
              :face=>[ "RobotoCondensedBold", "RobotoCondensedRegular", "RobotoRegular"], 
              :size=>vectorH, 
            });
            vectorR=screenYCenter-smallH;
        }
    }
    function onUpdate(dc) {
      RadialText.draw(
        dc,
        screenXCenter,
        screenYCenter,
        vectorR,
        90,
        "1234567890",
        vectorF,
        {} as RadialText.CustomOpt
      );
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

/Users/mac/Library/Application Support/Garmin/ConnectIQ/Devices   

找到对应的设备的 simulator.json 文件，里面有支持的字体类型，一般定义为下面的类型即可：

```
var vectorFont=Graphics.getVectorFont({:face=>["RobotoCondensedRegular","RobotoRegular"], :size=>36});
```

