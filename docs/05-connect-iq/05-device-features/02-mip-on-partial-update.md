# MIP屏

onPartialUpdate 仅支持 MIP屏

## 工作模式

onPartialUpdate 支持每秒刷新一次，适用于 显示 秒、屏幕常亮场景，但是其对功耗预算有较高要求，需要配合 setClip 使用

## power budget

ou have a "power budget", and the rule is that each minute, the average run time each second can't be greater than 30 milliseconds. 

使用模拟器，settings - Lower Power Mode开启低功耗模式后，在 File -  View Watchface Diagnostics 中查看 Total Time 应小于 30,000。

<img src="https://muyids.oss-cn-beijing.aliyuncs.com/img/image-20231209151227541.png" alt="image-20231209151227541" style="zoom: 50%;" />

## onPartialUpdate方法使用示例

```c
	// only on MIP displays and not on the older MIP devices.
	function onPartialUpdate(dc as Graphics.Dc) {
		// onUpdate(dc);
		inLowPower = true;
    
    // 设置 clip 区域
		dc.setClip(
			x,
			y,
			w,
			h
		);
		dc.setColor(bgColor, bgColor);
		dc.clear(); // 清理 clip 中的内容 
		dc.setColor(textColor, Graphics.COLOR_TRANSPARENT); // 设置颜色进行重写
		dc.drawText(
			x,
			y,
			textFont,
			text,
			Graphics.TEXT_JUSTIFY_LEFT
		);
	}
```
