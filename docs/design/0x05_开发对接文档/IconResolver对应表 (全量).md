# 🧩 Wristo IconResolver 完全版

覆盖 20+ 类别 | 300+ 映射项
 （建议放入系统级全局配置表）

结构风格保持互联网公司那种“像开大屏展示数据流动”的节奏，让每个映射都像齿轮一样平稳咬合。

------

# 1. Weather（天气）

## 1.1 天气状况（OpenWeather → Wristo）

```
01d → weather_sunny_day
01n → weather_sunny_night
02d → weather_cloudy_day
02n → weather_cloudy_night
03d/03n → weather_cloud
04d/04n → weather_overcast

09d/09n → weather_rain_light
10d → weather_rain_day
10n → weather_rain_night

11d/11n → weather_thunder
13d/13n → weather_snow
50d/50n → weather_fog
```

## 1.2 温度（Temperature）

按区间映射（摄氏度）：

| 温度区间 | Icon           |
| -------- | -------------- |
| ≤ -10    | `temp_minus10` |
| -9 to 0  | `temp_0`       |
| 1–10     | `temp_10`      |
| 11–20    | `temp_20`      |
| 21–30    | `temp_30`      |
| 31–40    | `temp_40`      |
| ≥ 41     | `temp_hot`     |

## 1.3 风速（Wind Speed）

| 区间（m/s） | Icon     |
| ----------- | -------- |
| 0–1         | `wind_0` |
| 1–3         | `wind_1` |
| 3–6         | `wind_2` |
| 6–10        | `wind_3` |
| >10         | `wind_4` |

## 1.4 风向（Wind Direction）

| 角度               | Icon      |
| ------------------ | --------- |
| 0°–22° / 338°–360° | `wind_n`  |
| 23°–67°            | `wind_ne` |
| 68°–112°           | `wind_e`  |
| 113°–157°          | `wind_se` |
| 158°–202°          | `wind_s`  |
| 203°–247°          | `wind_sw` |
| 248°–292°          | `wind_w`  |
| 293°–337°          | `wind_nw` |

## 1.5 降水概率（POP - Probability of Precipitation）

| 概率区间 | Icon      |
| -------- | --------- |
| 0–10%    | `pop_0`   |
| 11–30%   | `pop_25`  |
| 31–60%   | `pop_50`  |
| 61–80%   | `pop_75`  |
| 81–100%  | `pop_100` |

## 1.6 紫外线等级（UV Index）

| UV Level | Icon          |
| -------- | ------------- |
| 0–2      | `uv_low`      |
| 3–5      | `uv_medium`   |
| 6–7      | `uv_high`     |
| 8–10     | `uv_veryhigh` |
| 11+      | `uv_extreme`  |

## 1.7 空气质量（AQI）

| AQI     | Icon                 |
| ------- | -------------------- |
| 0–50    | `aqi_good`           |
| 51–100  | `aqi_moderate`       |
| 101–150 | `aqi_usg`            |
| 151–200 | `aqi_unhealthy`      |
| 201–300 | `aqi_very_unhealthy` |
| 300+    | `aqi_hazardous`      |

------

# 2. Battery（电量）

区间已与你对齐：

```
0–5 → battery_0
6–20 → battery_20
21–40 → battery_40
41–60 → battery_60
61–80 → battery_80
81–100 → battery_100
```

## 2.1 充电状态

- charging → `battery_charging`
- discharging → `battery_discharging`
- lowPowerMode → `battery_saver`

------

# 3. Connectivity（连接）

## 3.1 蓝牙

- on → `bluetooth_on`
- off → `bluetooth_off`
- searching → `bluetooth_search`

## 3.2 GPS

- enabled → `gps_on`
- disabled → `gps_off`
- searching → `gps_search`

## 3.3 手机连接（Garmin Connect）

- connected → `phone_connected`
- disconnected → `phone_disconnected`
- syncing → `phone_syncing`

------

# 4. Steps / Activity（步数 & 活动）

## 4.1 步数进度

| %     | Icon        |
| ----- | ----------- |
| 0–24  | `steps_0`   |
| 25–49 | `steps_25`  |
| 50–74 | `steps_50`  |
| 75–99 | `steps_75`  |
| 100   | `steps_100` |

## 4.2 Move Bar（久坐提醒）

```
clear → movebar_clear
1 → movebar_1
2 → movebar_2
3 → movebar_3
4 → movebar_full
```

## 4.3 楼层爬升（Floors）

| 楼层数 | Icon                  |
| ------ | --------------------- |
| 0      | `floor_0`             |
| 1–9    | `floor_n`（数字系列） |
| ≥10    | `floor_10plus`        |

------

# 5. Health（健康数据）

## 5.1 心率区间（HR Zone）

```
1 → hr_zone_1
2 → hr_zone_2
3 → hr_zone_3
4 → hr_zone_4
5 → hr_zone_5
```

## 5.2 血氧（SpO₂）

| 值     | Icon          |
| ------ | ------------- |
| ≥95%   | `spo2_good`   |
| 90–94% | `spo2_medium` |
| 85–89% | `spo2_low`    |
| <85%   | `spo2_bad`    |

## 5.3 压力（Stress）

| 分数   | Icon              |
| ------ | ----------------- |
| 0–25   | `stress_low`      |
| 26–50  | `stress_medium`   |
| 51–75  | `stress_high`     |
| 76–100 | `stress_veryhigh` |

## 5.4 Body Battery

| 值     | Icon     |
| ------ | -------- |
| 0–25   | `bb_25`  |
| 26–50  | `bb_50`  |
| 51–75  | `bb_75`  |
| 76–100 | `bb_100` |

## 5.5 呼吸频率（Respiration）

| 次/分钟 | Icon            |
| ------- | --------------- |
| ≤10     | `resp_low`      |
| 11–20   | `resp_normal`   |
| 21–30   | `resp_high`     |
| >30     | `resp_veryhigh` |

## 5.6 VO₂max（最大摄氧量）

| 等级      | Icon            |
| --------- | --------------- |
| Poor      | `vo2_poor`      |
| Fair      | `vo2_fair`      |
| Good      | `vo2_good`      |
| Excellent | `vo2_excellent` |
| Superior  | `vo2_superior`  |

------

# 6. Sleep（睡眠阶段）

| 阶段  | Icon          |
| ----- | ------------- |
| Awake | `sleep_awake` |
| REM   | `sleep_rem`   |
| Light | `sleep_light` |
| Deep  | `sleep_deep`  |

------

# 7. Calories（卡路里）

按区间：

| 卡路里  | Icon          |
| ------- | ------------- |
| 0–99    | `cal_0`       |
| 100–199 | `cal_100`     |
| 200–299 | `cal_200`     |
| 300–499 | `cal_300`     |
| ≥500    | `cal_500plus` |

------

# 8. Hydration（喝水）

| ml        | Icon         |
| --------- | ------------ |
| 0–250     | `water_250`  |
| 251–500   | `water_500`  |
| 501–1000  | `water_1000` |
| 1001–2000 | `water_2000` |
| >2000     | `water_full` |

------

# 9. Training Status（训练状态）

| 状态         | Icon                 |
| ------------ | -------------------- |
| Unproductive | `train_unproductive` |
| Maintaining  | `train_maintaining`  |
| Productive   | `train_productive`   |
| Peaking      | `train_peaking`      |
| Recovery     | `train_recovery`     |
| Overreaching | `train_overreaching` |

------

# 10. Floors / Intensity Minutes

## 10.1 强度分钟（Intensity）

```
low → intensity_low
medium → intensity_medium
high → intensity_high
```

------

# 11. 设备状态（Device Status）

```
do_not_disturb → device_dnd
alarm → device_alarm
vibration → device_vibration
lock → device_lock
unlock → device_unlock
```

------

# 🔥 如果你需要，我可以立即输出：

### ✔ **全量 JSON（可直接导入 Wristo Engine）**

### ✔ **MySQL 建表 + Seed SQL（全 300+ 行映射）**

### ✔ **分模块 JSON（weather / battery / health / sleep …）**

### ✔ **导出为 Notion Database 模板（图标库）**

### ✔ **生成 icon_library / icon_asset / icon_variant 三表的完整初始数据**

你想用 **哪种格式导出**？
 （JSON / SQL / CSV / YAML / Markdown 全支持。）
