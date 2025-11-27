# setStroke() 和 BitmapTexture

https://forums.garmin.com/developer/connect-iq/f/discussion/292995/setstroke-and-bitmaptexture



绘制虚线

```c
	// drawable.xml
<drawables>
	<bitmap id="DiagMask" filename="diag.png" packingFormat="png" compress="true" />
</drawables>
  
	function onLayout(dc) {
    // 初始化 diagmask
		diagmask = WatchUi.loadResource(Rez.Drawables.DiagMask);
  }

	function onUpdate(dc) {
    // 
		var texture = new Gfx.BitmapTexture({
			:bitmap => diagmask,
			:offsetX => 5,
			:offsetY => 5
		}); 
		// dc.setColor( Gfx.COLOR_RED, Gfx.COLOR_TRANSPARENT );
		// dc.setPenWidth(2);
		// dc.drawRectangle(100,100,100,100);
		dc.setStroke(texture);
		dc.setPenWidth(2);
		dc.drawRectangle(100,100,200,50);
```



diag.png 



# 掩码图片绘制



工具，photoshop 或者 gimp

参考设计部分，如何制作掩码图片



# 练习



制作下面表盘

https://www.facer.io/watchface/5UNlWjJQVo?watchModel=galaxywatch6black





![image-20240917153515469](https://muyids.oss-cn-beijing.aliyuncs.com/img/image-20240917153515469.png)
