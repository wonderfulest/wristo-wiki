

# 设备文件默认下载位置

在 Sdk Mangager Settings中的Download Location找到：

```
/Users/mac/Library/Application\ Support/Garmin/ConnectIQ/
```





# 模拟器数据修改





## 模拟器中修改默认天气数据



默认情况下，SIM 使用位于堪萨斯州奥拉西的 Garmin 总部的位置。SIM 中的设置>天气数据：

![img](https://muyids.oss-cn-beijing.aliyuncs.com/img/pastedimage1670619026837v1-20250305140305665.png)





```
 if(Toybox has :Weather)
 {
 	 var cc = WEA.getCurrentConditions();
   if(cc)
   {
     locName = cc.observationLocationName;
     cc     = cc.observationLocationPosition;
     if(cc) {
       locGPS = cc.toDegrees();
     }
   }
 }
```

## 当模拟器无法修改数据时



- 尝试删除 `/Users/<your-user-name>/Library/Application Support/Garmin/ConnectIQ/simulator.ini`。此文件包含模拟器用户配置文件编辑器的存储值。
- 尝试删除 $TMPDIR/com.garmin.connectiq/GARMIN

