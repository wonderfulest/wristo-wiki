# 柱状图绘制

Bar-Charts



# 区间柱状图 - BarZoneChart



## 组件实现





## 调用示例

```c
var history = ActivityMonitor.getHistory() as Array<ActivityMonitor.History>;
			var chartData = [];
			var goal = 0;
			var labels = [];
			for (var i = history.size() - 1; i >= 0; i--) { // 获取历史数据
				// var steps = history[i].steps;
				// var distance = history[i].distance;
				// var calories = history[i].calories;
				// var activeMinutes = history[i].activeMinutes;
				goal = history[i].stepGoal;
				chartData.add(history[i].steps);
				var duration = new Time.Duration(Gregorian.SECONDS_PER_DAY * (i + 1));
				labels.add(history[i].startOfDay.subtract(duration));
			}
			// 定义颜色区间
			var options = {
				:goal => goal,
				:colors => [
					{ :threshold => 0, :color => Graphics.COLOR_RED },    // 0% 红色
					{ :threshold => goal * 0.5, :color => Graphics.COLOR_ORANGE },  // 50% 橙色
					{ :threshold => goal * 0.8, :color => Graphics.COLOR_YELLOW }, // 80% 黄色
					{ :threshold => goal, :color => Graphics.COLOR_GREEN }, // 100% 绿色
					{ :threshold => goal * 1.2, :color => Graphics.COLOR_GREEN }    // 120% 深绿色
				],
				:defaultColor => Graphics.COLOR_WHITE,  // 默认颜色（如果值小于所有阈值）
				:bgColor => Graphics.COLOR_BLACK,
				// :minY => 50,  // 设置Y轴最小值
				// :maxY => 150, // 设置Y轴最大值
				:pointCount => chartData.size(),
				:fillMissing => true,
				:showGrid => true,                    // 是否显示网格
				:gridColor => Graphics.COLOR_DK_GRAY,  // 网格颜色
				:gridYCount => 5,                     // Y轴网格数量
				:gridXCount => chartData.size() - 1,  // X轴网格数量: 数据项减去一个刻度
				:showAxis => true,                    // 是否显示坐标轴
				:axisColor => Graphics.COLOR_LT_GRAY, // 坐标轴颜色
				:showLabels => true,                  // 是否显示刻度标签
				:labelColor => Graphics.COLOR_LT_GRAY, // 标签文字颜色
				:timeFormat => "MM/dd",               // 时间格式化方式
				:yLabelWidth => 15,                   // Y轴标签宽度
				:xLabelHeight => 35,                  // X轴标签高度
				:fontSize => RobotocondensedRegular12, // 标签字体大小
				:barWidth => 15,                      // 柱子宽度
				:labels => labels as Array<Time.Moment> // X轴标签数组
			} as BarZoneChart.ChartOptions;

			BarZoneChart.draw(
				dc, 
				screenXCenter * 1,  // x
				screenYCenter * 1,  	// y
				screenXCenter * 1.2,        // width
				screenYCenter * 0.6,  // height
				chartData,            // data
				options               // options
			);
```


