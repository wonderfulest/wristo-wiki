# 🕰️ **Garmin 指针成品结构（最终产物应该长这样）**

## 📁 导出产物（PNG 文件，透明背景）

```
watchface/
 ├── hour_hand.png
 ├── minute_hand.png
 ├── second_hand.png      （可选）
 ├── center_dot.png        （可选，美化）
 ├── ticks_major.png       （可选）
 ├── ticks_minor.png       （可选）
```

**每个 PNG 都必须是与画布相同大小**
 例如你的表盘画布为：
 ✔ 454 × 454（AMOLED）
 或者
 ✔ 280 × 280（MIP）

那所有指针 PNG 必须也是 **454×454 或 280×280，不得裁剪边界！**

------

# 🎨 **一、Figma 中的标准结构（模板）**

你可以直接建立下面这套结构：
 （强烈推荐你照此搭建，每一个表盘统一）

```
Watch-Canvas (454×454 Frame)
 ├── Pivot (6×6 Ellipse)   ← 所有指针旋转中心
 ├── Hour-Hand (Group)
 │     └── hour graphics...
 ├── Minute-Hand (Group)
 │     └── minute graphics...
 ├── Second-Hand (Group)
 │     └── second graphics...
 └── Center-Cover (可选)
```

### ✔ 旋转中心的关键点

在 Figma 中：

- 每个指针（Hour-Hand / Minute-Hand / Second-Hand）
- 必须把 **旋转中心 Anchor** 移动到 **Pivot 精准中心**

你只需：

1. 选中 Hour-Hand 组
2. 右侧属性 → Angle → 小圆点图标
3. 把中心点 **吸附到 Pivot 的正中心**

所有指针重复同样操作。

------

# 🧭 **二、指针尺寸比例（已适配 Garmin）**

### ⏱ 时针（Hour）

- 长度：表盘半径的 **40–50%**
- 宽度：**10–14 px**
- 风格：稳重、视觉权重大

### ⏱ 分针（Minute）

- 长度：表盘半径的 **60–70%**
- 宽度：**6–10 px**
- 风格：略长、略细

### ⏱ 秒针（Second）

- 长度：表盘半径 85–95%
- 宽度：**2–4 px**
- 配重：底部可加小圆（2–4px）

适配 AMOLED 时可以更精致；
 适配 MIP 时注意减少透明层和高频纹理。

------

# 🌈 **三、设计风格规范（你可以直接套用）**

这里给你一套既美观又适配 Garmin 的成品风格体系：

------

## 🍃 **A. 简约极简款（Minimal）**

**推荐适配 MIP & AMOLED**

**时针**

- 白色 / 黑色纯色
- 圆角矩形
- 末端可轻微收尖

**分针**

- 同风格但更细、更长

**秒针**

- 细线 + 小圆点

------

## ✨ B. 雅致金属款（Elegant Metal）

**更适合 AMOLED**

**特点：**

- Linear Gradient 金属拉丝感
- 边缘光晕 2–3px
- 头部做切角，像精工/浪琴

**时针**

- 宽度：12–14px
- 金属渐变：#E1E1E1 → #7A7A80

**分针**

- 稍细：8–10px

**秒针**

- “亮色细针”：红(#F44) / 金(#FFD65D)
- 效果很抓眼

------

## 🔥 C. 运动动感款（Sport）

**适合 Forerunner、Fenix 用户**

**时针**

- 纯白粗指针，有黑边（2px）

**分针**

- 亮蓝色 / 柠檬绿 / 橙色

**秒针**

- 高饱和色 + 中段中空(水滴形态)

------

## 🏛️ D. 复古机械款（Retro Mechanical）

**适合机械风表盘**

**结构特点：**

- 大配重 + 中空指针
- 头部为钻石形
- 颜色：奶白 + 古铜

------

# 📤 **四、导出规则（必须严格遵守）**

这一步决定真实表盘是否“完美旋转”。

### ✔ 导出格式

- PNG
- 透明背景
- 尺寸必须 = 画布尺寸 454×454（或 280×280）

### ✔ 导出流程

- 选中 Hour-Hand → Export 1x PNG → hour_hand.png
- 选中 Minute-Hand → minute_hand.png
- 选中 Second-Hand → second_hand.png

**千万不要裁剪内容（不能仅导出指针本体）。**

Garmin 旋转逻辑依赖图片的 **左上角(0,0)** 作为坐标参考。

# 🧩 **五、Garmin 代码中的适配点（你直接用）**

你只要把 PNG 丢到 resources，然后：

```
var hour    = Ui.loadResource(Rez.Drawables.hour_hand);
var minute  = Ui.loadResource(Rez.Drawables.minute_hand);
var second  = Ui.loadResource(Rez.Drawables.second_hand);

var center = { x: screenWidth/2, y: screenHeight/2 };

dc.drawRotatedBitmap(hour, center, hourAngle);
dc.drawRotatedBitmap(minute, center, minuteAngle);
dc.drawRotatedBitmap(second, center, secondAngle);
```

不需要设置 offset，因为 PNG 已经保持 full-frame。

------

# 🌟 你可以选择一种风格，我给你：

### ✔ 一套完整三指针（Figma 结构 + 设计方案）

### ✔ 颜色、长度、宽度、渐变全部定制

### ✔ 并且我可以为你生成 **完整 PNG 成品**

（可以直接放进 Wristo Studio 或 CIQ 项目）

------