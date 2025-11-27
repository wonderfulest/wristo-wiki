



# markdotai/m2

https://github.com/markdotai/m2

forum帖子：

https://forums.garmin.com/developer/connect-iq/f/showcase/213203/watchface-m2?pifragment-1298=1#1080390

# mossprescott/moonface

https://github.com/mossprescott/moonface



## https://github.com/RyanDam/Infocal

![image-20240719144933261](https://muyids.oss-cn-beijing.aliyuncs.com/img/image-20240719144933261.png)

https://apps.garmin.com/en-US/apps/c97c4e34-55e4-4601-b5c2-45763bc481a2#0



- Date
- Digital time/2nd timezone
- Battery
- Total/Active calories
- Live heart rate
- Moved distance (day/weekly)
- Move bar
- Daily steps
- Active minutes
- Notification/Alarm/Connection status
- Altitude
- Temperature (on-device sensor)
- Temperature (outside)
- Temperature (high/low)
- Sunrise/Sunset time
- Floor climbed
- Barometer data
- Countdown to event day
- Weather condition



## https://github.com/darrencroton/SnapshotWatch



项目代码质量不太行



https://apps.garmin.com/en-US/apps/20b5e4c9-382c-429d-91fa-199869c4777b



![image-20240719144035384](https://muyids.oss-cn-beijing.aliyuncs.com/img/image-20240719144035384.png)



- HR charts 绘制代码
- 日出日落代码



## https://github.com/haraldh/SunCalc/blob/master/source/SunCalc.mc



计算 太阳的各种事件，包括日出日落等

You would use it like this:

```
using Toybox.Position as Position;
using Toybox.Time as Time;

var sc = new SunCalc();
var info = Position.getInfo();

if (info != null && info.accuracy != Position.QUALITY_NOT_AVAILABLE) 
{
	var loc = info.position.toRadians();
	var sunrise_moment = sc.calculate(Time.now.value(), loc, SUNRISE);
	var sunset_moment = sc.calculate(Time.now.value(), loc, SUNSET);
}
```

Then convert the moment to a time string like in
https://github.com/haraldh/SunCalc/blob/master/source/SunCalcView.mc#L122

- [Up](https://forums.garmin.com/developer/connect-iq/f/discussion/3078/sun-rise-sunset#)0[Down](https://forums.garmin.com/developer/connect-iq/f/discussion/3078/sun-rise-sunset#)
- [Reply](https://forums.garmin.com/developer/connect-iq/f/discussion/3078/sun-rise-sunset#)
- [More](https://forums.garmin.com/developer/connect-iq/f/discussion/3078/sun-rise-sunset#)