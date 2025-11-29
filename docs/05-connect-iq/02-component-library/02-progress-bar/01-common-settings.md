# 进度条通用设置



# 目标数据项


Constants.mc

```
:GOAL_TYPE_HEART_RATE, // 心率 0
:GOAL_TYPE_STEPS, // 步数 1
:GOAL_TYPE_CALORIES, // 卡路里 2
:GOAL_TYPE_FLOORS_CLIMBED, // 3 爬楼
:GOAL_TYPE_BATTERY, // 4 电池电量
:GOAL_TYPE_BODY_BATTERY, // 5 身体电量
:GOAL_TYPE_ACTIVE_MINUTES_WEEK, // 6 周活动时间
:GOAL_TYPE_WEEKLY_RUN_DISTANCE, // 7 周跑步距离
:GOAL_TYPE_WEEKLY_CYCLING_DISTANCE, // 8 周骑行距离
:GOAL_TYPE_WEEKLY_SWIMMING_DISTANCE, // 9 周游泳距离
```

settings.xml

```
<setting propertyKey="@Properties.GoalType" title="@Strings.GoalTitle">
  <settingConfig type="list">
    <listEntry value="11">@Strings.Second</listEntry>
    <listEntry value="0">@Strings.HeartRate</listEntry>
    <listEntry value="1">@Strings.Steps</listEntry>
    <listEntry value="2">@Strings.Calories</listEntry>
    <listEntry value="3">@Strings.FloorsClimbed</listEntry>
    <listEntry value="4">@Strings.Battery</listEntry>
    <listEntry value="5">@Strings.BodyBattery</listEntry>
    <listEntry value="6">@Strings.WeeklyActiveMinutes</listEntry>
    <listEntry value="7">@Strings.WeeklyRunDistance</listEntry>
    <listEntry value="8">@Strings.WeeklyCyclingDistance</listEntry>
    <listEntry value="9">@Strings.WeeklySwimmingDistance</listEntry>
    <listEntry value="10">@Strings.WeeklyWalkingDistance</listEntry>
  </settingConfig>
</setting>
```



Propertities.xml

```
<!-- 目标项 -->
<property id="GoalType" type="number">11</property>
```



String.xml

```
<!-- 目标 -->
<string id="GoalTitle">Goal</string>
<string id="Second">Second</string>
```





# 几种进度条示例

```javascript

			// 水平进度条
			ProgressHorizon.draw(
				dc,
				screenXCenter * 0.5, 
				screenYCenter * 1.2,
				screenXCenter * 1.0,
				screenYCenter * 0.05,
				GoalFields.getGoalByFieldType(Constants.GOAL_TYPES[11])[:ratio],
				{
					:padding => 3,
					:color => 0x2cc8ce,
					:bgColor => 0x165759,
					:borderColor => 0x2cc8ce,
					:borderWidth => 2,
					:radius => 4,
				}
			);
			
			// 水平分段进度条
			ProgressHorizonSeg.draw(
				dc,
				screenXCenter, 
				screenYCenter * 1.35,
				screenXCenter * 1.0,
				screenYCenter * 0.05,
				GoalFields.getGoalByFieldType(Constants.GOAL_TYPES[11])[:ratio],
				{
					:color => 0x2cc8ce,
					:bgColor => 0x165759,
					:segmentCount => 20,
					:paddingRatio => 0.5,
				}
			);
			
			// 环形进度条
			ProgressArc.draw(dc, 
				screenXCenter, 
				screenYCenter, 
				screenXCenter, 
				GoalFields.getGoalByFieldType(Constants.GOAL_TYPES[11])[:ratio],
				{
					:color => 0x2cc8ce,
					:bgColor => 0x165759,
					:arcPenWidth => screenXCenter * 0.05,
				}
			);

			// 环形进度条 - 表盘中心目标项
			ProgressArc.draw(dc, 
				screenXCenter * 0.5, 
				screenYCenter * 0.6, 
				screenXCenter * 0.2, 
				GoalFields.getGoalByFieldType(Constants.GOAL_TYPES[11])[:ratio],
				{
					:color => 0x2cc8ce,
					:bgColor => 0x165759,
					:arcPenWidth => screenXCenter * 0.05,
					:fullArcRatio => 300, // full circle
					:arcStart => 240, // top
					:arcDirection => Graphics.ARC_CLOCKWISE,
				}
			);
```

