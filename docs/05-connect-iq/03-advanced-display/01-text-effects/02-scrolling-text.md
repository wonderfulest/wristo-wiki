滚动文字非常适合每日一句的应用场景，此外也可以用作提示信息，提示用户运动。用作过长数据项显示：如天气预报详情以及建议；股票行情等。



### 滚动文字类

```
using Toybox.Graphics as Gfx;

class ScrollableText {
	var screenHeight;
	var currentPos = 0;

	var x, y, font, text, scrollableWidth;
	var textWidth = null;
	var fontHeight = null;
	function initialize(x, y, font, text, scrollableWidth) {
		self.x = x;
		self.y = y;
		self.font = font;
		self.text = text;
		self.scrollableWidth = scrollableWidth;

		var settings = System.getDeviceSettings();
		screenHeight = settings.screenHeight;
	}

	function onUpdate(dc) {
		if (textWidth == null) {
			textWidth = dc.getTextWidthInPixels(text, font);
		}
		if (fontHeight == null) {
			fontHeight = dc.getFontHeight(font);
		}

		dc.setClip(x, 0, scrollableWidth, screenHeight);

		dc.drawText(x + currentPos, y, font, text, Gfx.TEXT_JUSTIFY_LEFT | Gfx.TEXT_JUSTIFY_VCENTER);

		currentPos = currentPos - 2;
		if (currentPos < -textWidth) {
			currentPos = scrollableWidth - 1;
		}

		dc.clearClip();

		dc.drawRectangle(x, y - fontHeight / 2, scrollableWidth, fontHeight + 2);
	}
}

```



### 在 View 中的调用

```javascript
class Circle003View extends Ui.WatchFace {
	private var updateTimer;
	private var scrollableText;
	function initialize() {
		updateTimer = new Timer.Timer();
	}
	// Load your resources here
	function onLayout(dc) {
    var scrollTextY = (screenYCenter * 7) / 4; // near bottom of the screen
    scrollableText = new ScrollableText(
      0,
      scrollTextY,
      Gfx.FONT_XTINY,
      "The power to make and break habits and learning how to do that is really important. --Naval Ravikant",
      screenWidth
    );
    mSettingsChangedSinceLastDraw = true;
  }
  	// Update the view
	function onUpdate(dc) {
  	if (scrollableText != null && !inLowPower) {
			scrollableText.onUpdate(dc);
			updateTimer.start(method(:triggerUpdate), 50, false);
		}
  }
```



