# IconResolver 对应表

> Wristo 表盘设计 · 开发对接文档 · IconResolver 对应表

**最常用的五大类：天气、电量、蓝牙/GPS、活动/步数、心率区间**

------

# 🧩 Wristo IconResolver 对应表

（Weather / Battery / Connectivity / Activity / Heart Rate）

> **用途：**
>
> - Wristo 引擎根据数据值动态选择图标
> - 后端、前端、Monkey C 三端通用
> - 可放入 IconResolver 表或 JSON 配置
> - 命名均符合你现有体系：`{category}_{semantic}_{variant}`

------

# 1. Weather IconResolver

天气是图标系统中映射关系最复杂的一类，这里提供标准版（OpenWeather → Wristo）。

## **1.1 天气编号映射（OpenWeather 代码）**

| OpenWeather | 含义       | Wristo 图标 Code       |
| ----------- | ---------- | ---------------------- |
| 01d         | 晴天（日） | `weather_sunny_day`    |
| 01n         | 晴天（夜） | `weather_sunny_night`  |
| 02d         | 少云（日） | `weather_cloudy_day`   |
| 02n         | 少云（夜） | `weather_cloudy_night` |
| 03d / 03n   | 多云       | `weather_cloud`        |
| 04d / 04n   | 阴天       | `weather_overcast`     |
| 09d / 09n   | 小雨       | `weather_rain_light`   |
| 10d         | 中雨（日） | `weather_rain_day`     |
| 10n         | 中雨（夜） | `weather_rain_night`   |
| 11d / 11n   | 雷雨       | `weather_thunder`      |
| 13d / 13n   | 雪         | `weather_snow`         |
| 50d / 50n   | 雾         | `weather_fog`          |

------

# 2. Battery IconResolver

电量是最常用的动态图标之一，用区间匹配即可。

## **2.1 电量区间映射表**

（你的黑金表盘、电量条都常用这一套）

| 区间（%） | Wristo 图标 Code |
| --------- | ---------------- |
| 0–5       | `battery_0`      |
| 6–20      | `battery_20`     |
| 21–40     | `battery_40`     |
| 41–60     | `battery_60`     |
| 61–80     | `battery_80`     |
| 81–100    | `battery_100`    |

------

# 3. Connectivity（蓝牙 / GPS / 手机连接）

## **3.1 蓝牙状态**

| 状态   | Wristo 图标 Code   |
| ------ | ------------------ |
| 已连接 | `bluetooth_on`     |
| 未连接 | `bluetooth_off`    |
| 连接中 | `bluetooth_search` |

## **3.2 GPS 状态**

| 状态       | Wristo 图标 Code |
| ---------- | ---------------- |
| GPS 可用   | `gps_on`         |
| GPS 搜星中 | `gps_search`     |
| GPS 关闭   | `gps_off`        |

## **3.3 手机连接（Garmin Connect）**

| 状态   | Wristo 图标 Code     |
| ------ | -------------------- |
| 已连接 | `phone_connected`    |
| 未连接 | `phone_disconnected` |

------

# 4. Activity / Steps（活动 & 步数成就）

## **4.1 步数进度（Progress → 图标）**

| 进度（达成率） | Wristo 图标 Code |
| -------------- | ---------------- |
| 0–24%          | `steps_0`        |
| 25–49%         | `steps_25`       |
| 50–74%         | `steps_50`       |
| 75–99%         | `steps_75`       |
| 100%           | `steps_100`      |

## **4.2 Move Bar（久坐提醒）**

| 状态            | Wristo 图标 Code |
| --------------- | ---------------- |
| 清空            | `movebar_clear`  |
| 红条 1 格       | `movebar_1`      |
| 红条 2 格       | `movebar_2`      |
| 红条 3 格       | `movebar_3`      |
| 红条 4 格（满） | `movebar_full`   |

------

# 5. Heart Rate Zone（心率区间）

| 区间   | Garmin 区间 | Wristo 图标 Code |
| ------ | ----------- | ---------------- |
| Zone 1 | 热身区      | `hr_zone_1`      |
| Zone 2 | 脂肪燃烧    | `hr_zone_2`      |
| Zone 3 | 有氧        | `hr_zone_3`      |
| Zone 4 | 阈值区      | `hr_zone_4`      |
| Zone 5 | 冲刺区      | `hr_zone_5`      |

------

# 6. IconResolver —— 可落地 JSON 模板

（可直接进后端表 / Monkey C 资源包）

```json
{
  "weather.condition": {
    "01d": "weather_sunny_day",
    "01n": "weather_sunny_night",
    "02d": "weather_cloudy_day",
    "02n": "weather_cloudy_night",
    "03d": "weather_cloud",
    "04d": "weather_overcast",
    "09d": "weather_rain_light",
    "10d": "weather_rain_day",
    "10n": "weather_rain_night",
    "11d": "weather_thunder",
    "11n": "weather_thunder",
    "13d": "weather_snow",
    "13n": "weather_snow",
    "50d": "weather_fog",
    "50n": "weather_fog"
  },

  "battery.level": [
    { "range": [0, 5], "icon": "battery_0" },
    { "range": [6, 20], "icon": "battery_20" },
    { "range": [21, 40], "icon": "battery_40" },
    { "range": [41, 60], "icon": "battery_60" },
    { "range": [61, 80], "icon": "battery_80" },
    { "range": [81, 100], "icon": "battery_100" }
  ],

  "connect.bluetooth": {
    "on": "bluetooth_on",
    "off": "bluetooth_off",
    "search": "bluetooth_search"
  },

  "connect.gps": {
    "on": "gps_on",
    "off": "gps_off",
    "search": "gps_search"
  },

  "steps.progress": [
    { "range": [0, 24], "icon": "steps_0" },
    { "range": [25, 49], "icon": "steps_25" },
    { "range": [50, 74], "icon": "steps_50" },
    { "range": [75, 99], "icon": "steps_75" },
    { "range": [100, 100], "icon": "steps_100" }
  ],

  "heartrate.zone": {
    "1": "hr_zone_1",
    "2": "hr_zone_2",
    "3": "hr_zone_3",
    "4": "hr_zone_4",
    "5": "hr_zone_5"
  }
}
```

------

# 7. 可选：建立数据库表字段（建议）

如果你要写进 MySQL：

| 字段          | 示例               | 说明       |
| ------------- | ------------------ | ---------- |
| id            | 1                  | 主键       |
| resolver_type | battery.level      | 解析器类型 |
| matcher       | 0-5 / “01d” / "on" | 匹配条件   |
| icon_code     | battery_0          | 映射图标   |
| description   | 电量 0–5%          | 可选备注   |

我也可以替你**生成完整 SQL 建表语句 + Seed 数据**。

------

如果你愿意，我还能继续为你补充：
 ✔ **天气（高阶版：风速 / 降水概率 / 紫外线）**
 ✔ **压力 / Body Battery / 体能等级**
 ✔ **睡眠阶段图标**
 ✔ **血氧（SpO2）区间图标**
 ✔ **更细粒度的天气映射（100+ 条）**

你想继续扩展哪一类？
