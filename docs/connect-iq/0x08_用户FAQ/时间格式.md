## 时间格式 FAQ（常见问题）

### **如何在手表上切换 12 小时和 24 小时格式？**

您可以在手表上进行设置：
 路径：**Clocks => Time => Time Format**

- 选择 **12-hour format**（12 小时制）以使用 AM/PM 标记。
- 选择 **24-hour format**（24 小时制）以使用 00:00 ~ 23:59 的时间格式。

#### **2. 12 小时格式下如何隐藏前导零？**

在 Garmin Connect App 中，您可以通过设置调整是否显示小时前的前导零：

- **开启前导零（Leading Zero For Hours）**：08:30 AM
- **关闭前导零**：8:30 AM

此选项可在 Connect App 中查找相关表盘设置进行调整。

#### **3. 如何在 12 小时格式中显示 AM/PM？**

在 12 小时模式下，手表会默认使用 **AM（上午）/ PM（下午）** 来区分时间，例如：

- 8:30 AM（上午 8:30）
- 2:45 PM（下午 2:45）

如果手表表盘未显示 AM/PM，您可以在表盘设置中查找 **AM/PM 选项** 并启用它。

#### **4. 24 小时格式如何显示？**

当启用 **24-hour format**（24 小时制）时，时间将以 00:00 - 23:59 方式显示，不使用 AM/PM 标记。例如：

- 08:30（上午 8:30）
- 14:45（下午 2:45）

#### **5. 可以在秒数上方添加 AM/PM 吗？**

这取决于具体表盘的设计，某些表盘支持 **自定义 AM/PM 位置**，可以将其放在秒数上方。您可以：

1. 在 **表盘设置** 中查找 AM/PM 选项，并调整其位置。
2. 使用 **自定义表盘** 或第三方应用，修改 AM/PM 显示方式。

#### **6. 什么是 24H 标记？**

部分手表或应用可能会提供 "24H" 作为指示当前使用的是 24 小时格式，而非 12 小时 AM/PM 格式。

# 24 小时制

是否24H制判断方法：System.getDeviceSettings().is24Hour

在设置项中添加 只读设置项：

提示如何设置：设置=> 系统 => 时间 => 时间格式 

新版本：Clocks => Time => Time Format 



如果不是 24 小时制，那么就是 12 小时制，需要进行判断

```javascript
var timeFormat = "$1$:$2$";
var clockTime = System.getClockTime();
var hours = clockTime.hour;
if (!System.getDeviceSettings().is24Hour) {
	if (hours > 12) {
		hours = hours - 12;
	}
}
```



# 时间格式处理参考代码

```javascript
// Get the current time and format it correctly
var timeFormat = "$1$:$2$";
var clockTime = System.getClockTime();
var hours = clockTime.hour;
if (!System.getDeviceSettings().is24Hour) {
	if (hours > 12) {
		hours = hours - 12;
	}
} else {
	if (getApp().getProperty("UseMilitaryFormat")) {
		timeFormat = "$1$$2$";
		hours = hours.format("%02d");
	}
}
var timeString = Lang.format(timeFormat, [hours, clockTime.min.format("%02d")]);
```

# 客服回复话术

中文：garmin 手表支持 12 小时制，24 小时制，军用格式的时间格式设置，后面两种均为 24 小时制，系统默认为 24 小时时间。如果你需要 12 小时制的时间格式，你可以在手表中选择 Clocks => 时间 => 时间格式 中的 12 小时制，我的表盘会自动更新为 12 小时制的显示

英文：
The Garmin watch supports 12-hour format, 24-hour format, and military time format settings. The last two options are both in the 24-hour format, with the system defaulting to 24-hour time. If you prefer the 12-hour time format, you can select it on the watch by going to Clocks => Time => Time Format, and choose the 12-hour format. My watch face will automatically update to display in the 12-hour format.
