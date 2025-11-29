没有进行过实际操作, 看帖子也没生效

https://forums.garmin.com/developer/connect-iq/f/discussion/351243/what-s-the-point-of-alpha-blending-mode

# BlendMode

https://developer.garmin.com/connect-iq/api-docs/Toybox/Graphics.html



`BlendMode`指定了源像素的颜色如何与目标像素的颜色混合。例如，`BLEND_MODE_SOURCE_OVER`模式将源像素叠加在目标像素之上，`BLEND_MODE_MULTIPLY`则是两者的颜色值相乘，产生更暗的效果。`BLEND_MODE_ADDITIVE`则是简单地将源和目标颜色值相加，使图像变亮。

# AlphaBlending

`AlphaBlending`则用于设置带有alpha通道的缓冲位图的混合状态，比如`ALPHA_BLENDING_FULL`提供最大的alpha混合支持，而`ALPHA_BLENDING_PARTIAL`则提供至少一个1位的alpha通道，具体的位数可能因设备而异。

# alpha blending mode

```c
function onUpdate(dc as Dc) as Void {
		View.onUpdate(dc);
		var height = dc.getHeight();
		var width = dc.getWidth();
		var x = width / 2;
		var y = height / 2;
		var r = height / 2 - 20;

		var bufferedBitMap = Graphics.createBufferedBitmap({:width => 390, :height => 390,
			:alphaBlending => Graphics.ALPHA_BLENDING_FULL
		});

  // draw something on the layer
  var ldc = bufferedBitMap.get().getDc();

		ldc.setFill(Graphics.createColor(255, 0,0,0));
		ldc.fillCircle(195, 195, r + 10);

		var attr = Graphics.ARC_COUNTER_CLOCKWISE;
		ldc.setPenWidth(6);
		// dc.setColor(Graphics.createColor(64, 255,255, 255), Graphics.COLOR_TRANSPARENT);
		ldc.setFill(Graphics.createColor(64, 255,255, 255));
		ldc.setStroke(Graphics.createColor(64, 255,255, 255));

		ldc.setBlendMode(Graphics.BLEND_MODE_SOURCE_OVER);
		// dc.setColor(Graphics.COLOR_DK_GREEN, Graphics.COLOR_LT_GRAY);
		ldc.drawArc(x, y, r, attr, 0, 90);
		ldc.fillCircle(x+50, y+50, 30);

		ldc.setBlendMode(Graphics.BLEND_MODE_ADDITIVE);
		ldc.drawArc(x, y, r, attr, 90, 180);

		ldc.fillCircle(x+50, y-50, 30);

		ldc.setBlendMode(Graphics.BLEND_MODE_SOURCE);
		ldc.drawArc(x, y, r, attr, 180, 270);
		ldc.fillCircle(x-50, y-50, 30);

		ldc.setBlendMode(Graphics.BLEND_MODE_MULTIPLY);
		ldc.drawArc(x, y, r, attr, 270, 360);
		ldc.fillCircle(x-50, y+50, 30);

		ldc.setBlendMode(Graphics.BLEND_MODE_SOURCE_OVER);

		dc.drawBitmap(0, 0, bufferedBitMap.get());

}
```

#  gradient color
