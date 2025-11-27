## View.mc



环形目标进度



```
using WonderBarrel.RatioArc as RatioArc;
using WonderBarrel.GoalFields as GoalFields;

		private var goalType;
	
		RatioArc.draw(dc, screenXCenter, screenYCenter, 
				screenXCenter, // 半径为外径，当半径为屏幕半径时则进度条为屏幕外框
				GoalFields.getGoalByFieldType(Constants.GOAL_TYPES[goalType])[:ratio] ,
				{
					:color => 0x2cc8ce,
					:bgColor => 0x165759,
					:arcPenWidth => screenXCenter * 0.05, // 
				}
			);
			
			
		goalType = _.readKeyInt(getApp(), "GoalType", 11);
```





