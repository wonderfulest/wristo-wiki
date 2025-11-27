

# Line Charts

折线图绘制

# Bézier curve - 贝塞尔曲线

```
var point = [[40,40],[60,70],[80,40],[100,70],[120,50],[140,80],[160,40],[180,80]];
for (var i = 0;i<7;i++) {
  var t = 0;
  var y1;var y2;var y3;var y4;
  for (var n = 0;n<10;n++) {
    var half = (point[i+1][0] - point*[0])/2.0;
    var tmpy = Cal(point*[1],point*[1],point[i+1][1],point[i+1][1],t);
    var tmpx = Cal(point*[0],point*[0]+half,point*[0]+half,point[i+1][0],t);
    dc.drawPoint(tmpx,tmpy);
    t = t + 0.1;
  }
}

function Cal(y1,y2,y3,y4,t) {
  var tmpy = y1*(1-t)*(1-t)*(1-t)
  +3*y2*t*(1-t)*(1-t)
  +3*y3*t*t*(1-t)
  +y4*t*t*t;
  return tmpy;
}
```





# 贝塞尔曲线绘制

```
			// 生成模拟心率数据
			var heartRateData = new [60] as Array<Numeric?>;
			for (var i = 0; i < 60; i++) {
				// 基础心率：75
				var baseHR = 75.0;
				// 添加周期性变化：模拟呼吸影响（每10秒一个周期）
				var breathingEffect = Math.sin(i * Math.PI / 5) * 5;
				// 添加运动影响：模拟轻微活动（每30秒一个周期）
				var activityEffect = Math.sin(i * Math.PI / 15) * 10;
				// 添加随机波动：±3
				var randomEffect = (Math.rand() % 7) - 3;
				
				heartRateData[i] = (baseHR + breathingEffect + activityEffect + randomEffect).toNumber();
			}

			// 配置图表选项
			var options = {
				:color => Graphics.COLOR_RED,        // 心率曲线使用红色
				:bgColor => Graphics.COLOR_BLACK,
				:minY => 60,                        // 最小心率
				:maxY => 100,                       // 最大心率
				:pointCount => 60,                  // 60个数据点
				:lineWidth => 2,                    // 线条宽度
				:smoothFactor => 0.3f,              // 平滑因子
				:showPoints => true,                // 显示数据点
				:pointColor => Graphics.COLOR_RED,   // 数据点颜色
				:pointRadius => 1,                    // 数据点半径
				:fontSize => RobotocondensedRegular12
			} as LineChart.ChartOptions;

			// 绘制心率图表
			LineChart.draw(
				dc,
				screenXCenter * 1.75,  // x
				screenYCenter * 1.2,  // y
				screenXCenter * 1.5,        // width
				screenYCenter * 0.4,  // height
				heartRateData,        // data
				options               // options
			);
```

