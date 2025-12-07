

```javascript
class Circle003View extends Ui.WatchFace {
  	// vector font
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
      // 在 onUpdate 里：
      AngledText.draw(
        dc,
        screenXCenter,
        screenYCenter,
        "HELLO WORLD",
        90, // 旋转角度，度，顺时针
        {
          :font  => vectorF,
          :color => 0xffffff,
          :bgColor => Graphics.COLOR_TRANSPARENT,
          :justification =>
            Graphics.TEXT_JUSTIFY_CENTER | Graphics.TEXT_JUSTIFY_VCENTER
        }
      );
    }
}
```



# AngledText



```
dc.drawAngledText(screenXCenter, screenYCenter, vectorFont, "1234567890", Graphics.TEXT_JUSTIFY_CENTER | Graphics.TEXT_JUSTIFY_VCENTER, 30);
```



AngledText 必须使用设备中自带的VectorFont



```
hasVF=(Toybox.Graphics has :getVectorFont);

// onLayout
if(hasVF) {
  var sz=(height*.35).toNumber(); 
  font=Graphics.getVectorFont({:face=>"RobotoItalic", :size=>sz});

  sz=sz/2;
  fontS=Graphics.getVectorFont({:face=>"RobotoCondensedBold", :size=>sz});
  System.println(sz);
}



// update
dc.setColor(Graphics.COLOR_WHITE,Graphics.COLOR_BLACK);
if(font!=null) {
	dc.drawText(width/2,height/2,font,"ABC",Graphics.TEXT_JUSTIFY_CENTER|Graphics.TEXT_JUSTIFY_VCENTER);
}
if(fontS!=null) {
	dc.drawRadialText(width/2, height/2, fontS, "1234567", Graphics.TEXT_JUSTIFY_CENTER, 45, width/2-(height*.15), Graphics.RADIAL_TEXT_DIRECTION_CLOCKWISE);

	dc.drawAngledText(width/2, height*.8, fontS, "hello", Graphics.TEXT_JUSTIFY_CENTER, 250);
}
```



参考：

https://forums.garmin.com/developer/connect-iq/f/discussion/349473/simple-example-wf-that-shows-a-bunch-of-things
