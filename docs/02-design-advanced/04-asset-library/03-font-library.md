# 字体库

> Wristo 表盘设计 · 素材库 · 字体库

字体库是整个表盘体系的“声音”，数字的节奏、信息的呼吸、主题的氛围都由它决定。
这里的内容让每位设计师都能拿到同样锋利的一套字体工具箱。

------

# 4.1 字体分类（Font Categories）

定义两个维度的枚举（用途 + 语言）

✔ 顶层：用途分类 — 决定“字体类型”

```java
public enum DesignFontType {
    NUMBER_FONT,         // 仅 0–9（大时间）
    TEXT_FONT,           // 基础英文 A-Z a-z
    ICON_FONT,           // 图标字体（天气、电量、符号）
    CJK_FONT,            // 中文 + 日文 + 韩文
    MULTILINGUAL_FONT;   // 德 / 法 / 西 / 意 / 葡 / 波等扩展拉丁语
}
```

✔ 第二层：语言集合（哪些语言需要渲染）

```java
public enum FontLanguageSet {
    EN, // English
    DE, // German
    FR, // French
    ES, // Spanish
    IT, // Italian
    PL, // Polish
    PT, // Portuguese
    ZH, // Chinese
    JA, // Japanese
    KR; // Korean
}
```


# 4.2 字体文件目录结构（最关键）

```
fonts/
├── number/
│   └── Wristo-Digital-Mono-Regular.ttf
│
├── text/
│   ├── Latin/
│   │   ├── Wristo-Text-Regular.ttf
│   │   └── Wristo-Text-Bold.ttf
│   ├── LatinExt/
│   │   ├── Wristo-Text-DE.ttf
│   │   ├── Wristo-Text-FR.ttf
│   │   ├── Wristo-Text-ES.ttf
│   │   └── ...
│   └── CJK/
│       ├── Wristo-Text-ZH.ttf
│       ├── Wristo-Text-JA.ttf
│       └── Wristo-Text-KR.ttf
│
├── icon/
│   └── Wristo-Icon-Regular.ttf

```


# 4.3 字体命名规范（Naming Rule）

> 统一命名可让你在 500+ 表盘素材里一秒找到对的文件。

### **基础格式：**

```
{Series}-{Use}-{Style}-{Variant}
```

🧩 1. {Use} — 用途（字体被“用在什么地方”）

用途是最高级分类，你所有字体都属于以下之一：

✔ 标准用途（Wristo 专用）

```
time        → 大时间（HH:MM）专用字体（数字为主）
text        → 信息区文本（步数、电量、天气、小字）(英文)
icon        → 图标字体（天气、电量、箭头）
cjk         → 中日韩大字符集字体
latinExt    → 西欧扩展字体（德/法/西/意/葡/波）
```

🧩 2. {Style} — 字风（字形风格）

Style 是一个字体的“长相性格”。
决定它是等宽？粗体？几何？装饰？轮廓？

① 标准字风合集

```
Mono        → 等宽数字/等宽字
Regular     → 基础字重
Medium      → 中等字重
Bold        → 加粗字重
Outline     → 轮廓字体
Condensed   → 宽度更窄（信息区节省空间）
```

② 主题字风（Decor 系列用）

```
Elegant     → 优雅风（花系常用）
Tech        → 科技风
BlackGold   → 黑金主题
Festival    → 节日主题
Hand        → 手写风（如果你后续要做）
Stencil     → 军事风/破洞风
```

③ 渲染适配字风

```
MIP         → MIP 屏优化字体（更粗、无尖角）
AMOLED      → AMOLED 屏优化字体
```

### **示例：**

```
Wristo-Time-Mono-Regular
Wristo-Time-Mono-Outline
Wristo-Text-Regular
Wristo-Icon-Regular
Wristo-CJK-Regular
Wristo-LatinExt-Regular
```

------

# 4.4 字体设计规范（Design Guidelines）

## 🔢 **1. 数字（0–9）**

- 统一高度（Ascender / Descender）
- 统一视觉重量，避免 “3/8 太轻”
- 大时间数字 **必须等宽（Mono）**
- 可视区居中

## 🎯 **2. 冒号（:）规范**

- 宽度 = 数字宽度的 **45–55%**（你之前问过，这里给最终建议）
- 上下两点居中校准
- 在 128–200px 尺寸下保持 2–3px 的视觉间隔

## 🧵 **3. Outline 轮廓字规范**

- 轮廓宽度：2px / 2.5px / 3px（保持 3 档）
- Round Join（圆角连接）
- 外描边优先，避免内描边吃掉笔画

## 💡 **4. MIP 优化字体**

- 必须加粗（>1.35 weight）
- 避免细尖角
- 对比度优先
- 12px 以下使用 Condensed 版本

## 💬 **5. 信息字体（Info Font）**

- 仅 Regular / Medium 两档
- 数字 + 英文的 x-height 须统一
- 字号建议：
  - 标题：18–22
  - 小数据：12–14
  - 标签：10–11

------

# 4.5 字体生成流程（Production Workflow）

## **① Figma 制作 SVG → 输出 0–9 + :**

- 使用统一 Frame（例如 200×300）
- 数字轮廓转 Path
- 所有数字保持一致 Width
- 冒号宽度按 50% 规则

## **② 使用 FontForge 自动生成 TTF（推荐自动脚本）**

你现在常用这类脚本，可收编到文档：

- 扫描最大宽度
- 自动等宽
- 自动左右居中
- 自动补齐冒号
- 自动生成 Outline 版（偏移法）
- 自动生成 ttf/woff2

## **③ 字体测试**

- AMOLED 机型（Venu / Epix）
- MIP 机型（Fenix / Forerunner）
- 亮度 = 50%
- 检查数字对齐、冒号垂直居中、闪烁问题

## **④ 在 Monkey C 中验证**

- BMFont 转 bitmap
- 检查奇数像素的边缘模糊
- IconResolver 是否需要补自动调节

# 4.6 字体在表盘中的使用建议（Best Practices）

### **大时间（HH:MM）**

- Mono（避免跳动）
- Outline 适用于亮色背景 和 AOD 模式
- 冒号宽度建议为数字宽度的 50%

### **信息区**

- 10–14 px
- 使用 Info-Regular / Medium
- 避免超过 3 行文本

### **运动型表盘**

- 选 MIP-Bold / AMOLED-Bold
- 避免细线 Outline

### **花系 / 氛围表盘**

- 建议数字使用 Decor 系列
- 搭配轻柔 Glow（外发光 1.5–2.5px）

------

# 4.8 字体常见问题（Mistakes to Avoid）

- 数字 1 太细
- 数字 3 和 8 的视觉重量不一致
- 冒号太宽导致时间不稳
- Outline 在 MIP 设备上失真
- 小尺寸字体太轻（12px 以下必须加粗）
- 不同主题字体混用导致风格不统一

------

# 🎉 结语：这章写完，你的“字体库”就成了护城河

有了这个章节，你的团队以后只需照这份文档，就能源源不断生产同水准的表盘字体体系。

------


