

# AffineTransformations和矩阵计算



https://forums.garmin.com/developer/connect-iq/f/discussion/336765/bitmap-transformation/1634475

https://forums.garmin.com/developer/connect-iq/f/discussion/336765/bitmap-transformation/1634475

https://forums.garmin.com/developer/connect-iq/f/discussion/336765/bitmap-transformation/1634475



# 矩阵图形变换

https://www.youtube.com/watch?v=AheaTd_l5Is



# 矩阵乘法知识回顾

https://www.shuxuele.com/algebra/matrix-multiplying.html



# 示例代码

![img](https://muyids.oss-cn-beijing.aliyuncs.com/img/pastedimage1712941586922v1.png)



# 图片旋转代码实现





    	<bitmap id="hourHand" filename="hour.png" dithering="floyd_steinberg" packingFormat="png" />
      <bitmap id="minuteHand" filename="minute.png" dithering="floyd_steinberg" packingFormat="png" />
      <bitmap id="secondHand" filename="second.png" dithering="floyd_steinberg" packingFormat="png" />
    





```javascript
class TestHandsView extends Ui.WatchFace {	
	private var hourHand;
	private var minuteHand;
	private var secondHand;

	function onLayout(dc) {
    hourHand = WatchUi.loadResource(Rez.Drawables.hourHand);
		minuteHand = WatchUi.loadResource(Rez.Drawables.minuteHand);
		secondHand = WatchUi.loadResource(Rez.Drawables.secondHand);		
  }

	function onUpdate(dc) {
		var transformHour = new Gfx.AffineTransform();
		transformHour.initialize();
		transformHour.rotate(Math.toRadians((hour % 12) * 30 + minute * 0.5).toFloat());
		transformHour.translate(-screenXCenter, -screenYCenter);
		dc.drawBitmap2(screenXCenter, screenYCenter, hourHand,  {
			:transform => transformHour
		});

		var transformMinute = new Gfx.AffineTransform();
		transformMinute.initialize();
		transformMinute.rotate(Math.toRadians(minute * 6 + second * 0.1).toFloat()); // 60秒转一圈
		transformMinute.translate(-screenXCenter, -screenYCenter);
		dc.drawBitmap2(screenXCenter, screenYCenter, minuteHand, {
			:transform => transformMinute
		});
		
    var transformSecond = new Gfx.AffineTransform();
		transformSecond.initialize();
		transformSecond.rotate(Math.toRadians(second * 6).toFloat());
		transformSecond.translate(-screenXCenter, -screenYCenter);
		dc.drawBitmap2(screenXCenter, screenYCenter, secondHand, {
			:transform => transformSecond
		});
	}
}
```




# 图片移动



https://www.facer.io/watchface/U1ZU0n6DqZ?watchModel=galaxywatch4black

https://www.facer.io/watchface/MfAaayupHP?watchModel=galaxywatch4black







