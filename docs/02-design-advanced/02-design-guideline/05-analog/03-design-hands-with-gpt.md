# 🎯 **Garmin 指针 SVG 自动化生成模板（可复用 Prompt）**

以下是你的可复用模板，
 你只需要改动 `{参数}` 部分即可自动生成一套专业可用的表盘指针 SVG。

------

# ✅ **自动化 Prompt 模板**

```
请为我生成一套 Garmin 表盘指针与刻度的 SVG 素材，包括：

- Hour Hand（时针）
- Minute Hand（分针）
- Second Hand（秒针，带配重 Counterweight）
- Center Cap（中心盖）
- Hour Ticks（小时刻度圈）
- Minute Ticks（分钟刻度圈）
- Roman Numerals（罗马数字刻度圈）

我会将 SVG 直接复制并粘贴到 Figma 中使用。

------------------------------------------------------------
【整体主题风格】

主题风格为：{主题名称，例如：Christmas / Nordic Minimalism / Retro Mechanical / Aviation Pilot / Business Classic}

请根据主题风格自动设计适合的：
- 材质（例如金属拉丝、磨砂、陶瓷感、漆面等）
- 配色（主色、辅色、高亮色）
- 边缘处理（描边、倒角、内嵌线等）
- 渐变方案（高光、暗部、体积感）

要求确保：
- 指针 + 刻度 + 罗马数字 + 中心盖 风格完全统一
- 整体观感协调、清晰、易读

------------------------------------------------------------
【输出要求】

请输出 7 个独立 SVG 文件，每个都是完整的 <svg>...</svg>：

1. Hour Hand（时针）
2. Minute Hand（分针）
3. Second Hand（秒针，须包含配重 Counterweight）
4. Center Cap（中心盖圆形元素，可带少量装饰细节）
5. Hour Ticks（整圈 12 个小时刻度）
6. Minute Ticks（整圈 60 个分钟刻度，可与小时刻度协调区分）
7. Roman Numerals（整圈 12 个罗马数字：I、II、III、...、XII）

要求：
- 每个 SVG 必须是独立完整的 <svg> 根节点
- 不要输出任何注释或说明性文字，只输出 SVG 代码本身
- 各 SVG 文件之间的设计语言相互统一

------------------------------------------------------------
【SVG 画布规格】

所有 SVG（指针 / 刻度 / 罗马数字 / 中心盖）统一使用以下画布设置：

- width="454"
- height="454"
- viewBox="0 0 454 454"

表盘几何中心为：
- x = 227
- y = 227

------------------------------------------------------------
【旋转点与布局（极其重要）】

1）指针（Hour / Minute / Second）

- 所有指针必须围绕 (227, 227) 旋转
- 指针底部中心点必须**精确落在** (227, 227)
- 指针主体沿 y 轴向上延伸（默认指向 12 点方向）
- 初始朝向为 12 点方向（即指针从中心向上）

可实现方式示例（逻辑要求，不必逐字实现）：
- 使用 <rect> 或 <path> 绘制指针时，确保其底部几何中心与 (227, 227) 对齐
- 不允许在 SVG 根上对整体进行 translate 去“偷换”中心位置

2）刻度圈（Hour Ticks / Minute Ticks / Roman Numerals）

- 整个刻度圈、数字圈必须以 (227, 227) 为圆心布局
- Hour Ticks：12 个刻度均匀分布在 360° 周期（每 30° 一个）
- Minute Ticks：60 个刻度均匀分布在 360° 周期（每 6° 一个）
- Roman Numerals：12 个罗马数字对应 12 小时位置（顶部为 XII）

要求：
- 所有刻度和数字的位置布局都基于 (227, 227) 的极坐标分布
- 元素应保持适当内缩，不要贴近画布边缘，便于放入背景中

------------------------------------------------------------
【尺寸比例（可微调，但需统一协调）】

1）指针

Hour Hand：
- 宽度：12–16 像素
- 有效长度（从中心向上）：150–200 像素

Minute Hand：
- 宽度：8–12 像素
- 有效长度：200–260 像素

Second Hand：
- 宽度：2–4 像素
- 有效长度：260–320 像素
- 含底部主题化配重 Counterweight（可做圆形、椭圆、小徽章、几何块等）

Center Cap：
- 完全圆形
- 直径：20–40 像素
- 可加入简单的内外圆、描边、渐变，形成高级的中心盖效果

2）刻度与数字

Hour Ticks（小时刻度）：
- 每个刻度为短条或块状
- 单个刻度宽度（沿弧线方向）：4–8 像素
- 长度（从外圈向内伸）：12–20 像素
- 相比分钟刻度更粗、更长、更醒目

Minute Ticks（分钟刻度）：
- 60 个细刻度
- 单个刻度宽度：1–3 像素
- 长度：6–12 像素
- 可对 5 的倍数做轻微强化以增强读数，但需与小时刻度区分开

Roman Numerals（罗马数字刻度）：
- 使用矢量形状（path 或 polygon）表现数字，不使用字体
- 数字大小适中，不遮挡指针旋转路径
- 可沿圆弧排布，略微向内侧收缩，保证整体平衡
- XII 在正上方（12 点方向）

参数允许在合理范围内微调，但必须保持成套的比例协调与视觉统一。

------------------------------------------------------------
【SVG 技术规范】

- 允许使用的元素：
  - <rect>、<polygon>、<circle>、<path>、<g>、<defs>、<linearGradient>、<radialGradient>
- 不使用外部字体（不使用 <text> 元素）
- 不使用复杂 filter / mask（如必须使用，请保持结构极度简洁）
- 颜色、渐变命名清晰，便于在 Figma 中后期编辑和全局替换
- 尽量减少不必要的 path 片段，保证结构干净

------------------------------------------------------------
【设计要求】

整体设计需具备以下特征：

- 风格统一：指针、刻度、罗马数字、中心盖遵循同一主题调性和材质语言
- 外轮廓清晰：在暗色 / 浅色背景上都具有良好的可读性
- 层次明确：可通过描边、内阴影感、高光带、双层结构等方式体现
- 渐变合理：不要过于花哨，突出功能性和高级感
- 形状简洁：便于后续在 Figma 中修改（避免过度复杂的贝塞尔曲线）
- 保证最终 SVG 代码可以直接复制到 Figma 中使用，无需额外调整 viewBox 或 transform

------------------------------------------------------------
【最终输出格式】

请严格按以下顺序输出 7 段 SVG 代码，每段之间不要写任何文字说明：

1）<svg>（Hour Hand）</svg>
2）<svg>（Minute Hand）</svg>
3）<svg>（Second Hand，含 Counterweight）</svg>
4）<svg>（Center Cap）</svg>
5）<svg>（Hour Ticks，12 个小时刻度圈）</svg>
6）<svg>（Minute Ticks，60 个分钟刻度圈）</svg>
7）<svg>（Roman Numerals，12 个罗马数字刻度圈）</svg>

每个 SVG 必须是独立完整的 <svg> 根节点，不要放在一起，也不要输出任何额外的注释或文字。

```

------

# 🚀 使用示例：如何快速生成一套新主题指针？

例如：

**我要一套北欧极简风的指针：**

```
主题名称 = Nordic Minimalism
尺寸维持默认
风格要求：极简、无阴影、双色系统、低饱和度
```

把这些填进模板即可立即生成全套 SVG。

# 支持的风格示例（你可以用在提示词里）

- 雅致金属（Elegant Metal）
- 黑金奢华（Black & Gold Luxury）
- 北欧极简（Nordic Minimal）
- 冰蓝机械（Ice-Blue Mechanical）
- 蒸汽朋克（Steampunk）
- 高级运动（Pro Sport）
- 霓虹科幻（Neon Synthwave）
- 冬日雪境（Winter Frost）
- 圣诞节主题（Christmas Ornaments）
- 科技透明骨架（Transparent Skeleton）
- 复古机械表（Vintage Mechanical）
- 日本金工（Japanese Kintsugi）
- 暗黑能量（Dark Energy）



------

# 🕰️ **一、Figma 项目结构（可直接创建）**

在 Figma 新建一个 Frame：

**Frame 名称：** `Watch-Canvas`
 **尺寸：**

- AMOLED：`454 × 454`
- MIP：`280 × 280`

------

## **🎯 Watch-Canvas 内部结构：**

```
Watch-Canvas (454×454)
 ├── Pivot (6×6)
 ├── Hour-Hand
 │     └── hour-body
 ├── Minute-Hand
 │     └── minute-body
 ├── Second-Hand
 │     ├── second-body
 │     └── counterweight
 └── Center-Cover (optional)
```

------

# 🎛️ **二、旋转中心设置（关键点）**

每一个指针（Hour-Hand、Minute-Hand、Second-Hand）必须做到：

1. 选中 Group
2. 右侧 → `Angle` → 点击中间的小圆点
3. 将旋转中心 **拖到 Pivot 圆点的正中心**

之后无论怎么变形，旋转永远不会偏。

------

# 💎 **三、雅致金属指针：完整设计方案（可直接照做）**

这是经典“金属机械表”的质感方案，适合 AMOLED，也能适度兼容 MIP。

------

# **A）时针（Hour Hand）**

### **整体参数**

- 长度：表盘半径 **45%**
- 宽度：**14 px**
- 尾部：平直
- 头部：轻微切角（45°）

### **金属渐变填充（复制即可）**

**Linear Gradient（-90°）：**

| Stop | Color   | Opacity |
| ---- | ------- | ------- |
| 0%   | #F6F6F7 | 100%    |
| 35%  | #D9D9DD | 100%    |
| 65%  | #A9A9AE | 100%    |
| 100% | #5E5E65 | 100%    |

效果：顶部亮、中段柔和、末端略暗——极像真金属。

### **边缘高光**

- Stroke：`1.5 px`
- Stroke color：`#FFFFFF`
- Opacity：`35%`
- Style：Inside

这个边缘光能让金属质感“闪”一点点，非常迷人 ✨

------

# **B）分针（Minute Hand）**

### **整体参数**

- 长度：表盘半径 **65%**
- 宽度：**10 px**
- 头部：更尖、更细长

### **金属渐变（同系但更冷一点）**

**Linear Gradient（-90°）：**

| Stop | Color   |
| ---- | ------- |
| 0%   | #E9EAEC |
| 45%  | #CACBD1 |
| 100% | #7F8088 |

### **边缘光**

同样为薄光，但可以稍弱：

- Stroke: `1 px`
- Opacity: 25%

------

# **C）秒针（Second Hand）**

这是整套的“视觉焦点”。

### **整体参数**

- 长度：表盘半径 **90–95%**
- 宽度：**3 px**

### **主体色**

雅致金属表的秒针推荐使用：

- **深红色（奢侈品金属表常用）**
   `#C62828`
- 或
- **烫金色**
   `#F3C26C`

你可以选择红色，会更抓眼更贵气。

### **配重（Counterweight）**

- 圆形：`8 × 8`
- 填充：`#C62828`
- 位置：Pivot 下方 5–7px

### **秒针高光**

- 在秒针主体上叠一个 3px 横条
- 白色 → Opacity 30%
   让它有一点“镭射光”。

------

# 🌟 **四、Figma 布局（可直接粘贴）**

```
Watch-Canvas
 ├── Pivot (Ellipse 6×6, #000)
 ├── Hour-Hand
 │     └── hour-body (Rect / outline / gradient)
 ├── Minute-Hand
 │     └── minute-body (Rect / outline / gradient)
 ├── Second-Hand
 │     ├── second-body (Line 3px / Fill #C62828)
 │     └── counterweight (Circle 8px / Fill #C62828)
 └── Center-Cover (Circle 10px / Fill #FFF / Opacity 80%)
```

**每个指针 Group 都记得设置正确的旋转中心。**

------

# 📤 **五、导出（Garmin 必须遵守）**

每个 PNG 都必须这样导出：

- 选中 Hour-Hand → Export PNG → **454×454**
- 选中 Minute-Hand → 同上
- 选中 Second-Hand → 同上

❗ 绝对不能裁剪内容
 PNG 尺寸必须和表盘画布一致，否则旋转就错位。

