# 大时间等宽数字制作

> Wristo 表盘设计 · 教程与案例 · 等宽数字教程

------

第一步：使用 Figma 制作大时间等宽数字 SVG 格式文件

SVG 格式便于后续转换为字体文件，保持矢量特性并支持高质量渲染。

<iframe width="560" height="315" src="https://www.youtube.com/embed/JBH7emnxT10?si=5vBerxpQRMsCC_DY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

第二步：在 Wristo Studio 中使用上面生成 的 SVG 来自动生成字体，并应用于时间显示

<iframe width="560" height="315" src="https://www.youtube.com/embed/jyPVGmrJwJc?si=cfq3bQM_10ErTse6" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## 1. 目的与适用范围

**number_font** 专用于表盘大时间、日期、计数类数据展示，仅包含 **0–9 数字（可选包含冒号 “:”）**，特点是：

- 等宽：所有数字字符宽度完全一致，便于时间对齐
- 高可读：在小尺寸 / 低分辨率 / 强光环境下保持清晰
- 轻量：只包含必要字形，减小资源体积

适用场景：

- 表盘大时间（HH:MM）

------

## 2. 字符范围与编码规范

### 2.1 必须支持的字符

- 数字：`0 1 2 3 4 5 6 7 8 9`
- Unicode 范围：`U+0030 – U+0039`

### 2.2 可选字符（推荐）

- 冒号：`:`，用于时间分隔
  - Unicode：`U+003A`
  - 宽度为数字宽度的 **40% ± 5%**，保持视觉紧凑但不拥挤

> 如果某一款表盘仅用于纯数字计数、无时间显示，可以不含冒号版本，减少体积。

------

## 3. 命名规范（Number Font 系列）

统一使用命名模板（结合你之前的规范）：

```text
{Series}-{Use}-{Style}-{Variant}
```

其中：

- **Series**：系列名
  - 示例：`Aura`, `Elegant`, `Neon`, `MonoBlock`
- **Use**：用途固定为
  - `Number`（表示数字用字体）
- **Style**：风格
  - `Mono`：等宽数字
  - `Round`：圆角
  - `Sharp`：直角
  - `Segment`：数码管风格
- **Variant**：变体
  - `Regular`：实心
  - `Outline`：描边
  - `Bold`：加粗
  - `Light`：细线

示例：

- `Aura-Number-Mono-Regular`
- `Aura-Number-Mono-Outline`
- `Neon-Number-Segment-Regular`

字体内部属性建议：

- `familyname`: `Aura Number`
- `fontname`: `AuraNumberMonoRegular`
- `fullname`: `Aura Number Mono Regular`

------

## 4. 设计规范（视觉 & 几何）

### 4.1 设计画布与坐标

统一使用相同设计单位，便于脚本批量处理：

- 字体 UPM：`1000`
- Ascent：`800`
- Descent：`200`
- Figma 设计画布建议：`200 × 300 px`（或任何统一尺寸）

数字设计要求：

- 数字整体高度建议占 **可用高度的 80–90%**
- 留出上下各 **5–10%** 的安全边距，避免在设备上“贴边”

### 4.2 等宽规范

- 所有数字（0–9）**advance width 必须一致**
- 宽度建议范围：
  - 进制：宽度为 UPM 的 `55–65%`
  - 示例：UPM=1000 时，数字宽度 ≈ `550–650`
- 冒号宽度 ≈ 数字宽度 × `0.4`（允许 `0.35–0.45` 浮动）

### 4.3 视觉风格统一

同一 number_font 内：

- 笔画粗细误差不超过 ±10%
- 圆角半径统一（例如：所有圆角用相同半径）
- 倾斜角度一致（如果是斜体 / 赛博风）

负空间（内部空洞，如 0、6、8、9）：

- 空洞宽度不小于总宽度的 **20%**，防止缩小时糊成一团

------

## 5. Figma 设计流程规范

### 5.1 文件结构

在 Figma 建一个 Page，例如：`Number Fonts – Aura Mono`

创建 10 个 Frame：

- 尺寸统一，例如：`200x300`
- 命名规则：`digit-0` ~ `digit-9`
- 每个 Frame 内放一个数字 Text，内容对应 0–9

如果设计冒号：

- 单独一个 Frame：`colon`，宽度为数字 Frame 的一半

### 5.2 对齐与布局

每个数字字符：

1. 使用布局参考线 / baseline，保证数字在垂直方向对齐
2. 水平方向居中对齐 Frame
3. 确保视觉重心居中（有些数字如 1、7，需要稍微微调）

实操建议（量化）：

- 数字可视宽度占 Frame 宽度约 `70–80%`
- 左右留边尽量对称（中心线对齐）

### 5.3 导出 SVG 规范

导出设置：

- 格式：`SVG`
- 选项：
  - ✅ Outline text / convert to vector（确保不依赖系统字体）
  - ✅ 去掉多余 metadata（减小体积）
- 命名规范：

```text
digit_0.svg
digit_1.svg
…
digit_9.svg
colon.svg      （如有）
```

存放路径示例：

```text
/fonts_src/number_font/{Series}/{Style}/svgs/
```

例如：`/fonts_src/number_font/Aura/Mono/svgs/digit_0.svg`

------

## 6. FontForge 生成字体流程

### 6.1 脚本参数规范

建议使用统一脚本（你之前已经在用 FontForge + Python，可以直接沿用），核心参数：

- `UPM = 1000`
- `ASCENT = 800`
- `DESCENT = 200`
- 默认 Style：`Regular`

字符映射：

- `digit_0.svg → U+0030`
- `digit_1.svg → U+0031`
- ...
- `digit_9.svg → U+0039`
- `colon.svg → U+003A`（可选）

### 6.2 自动等宽与居中逻辑（脚本侧）

脚本逻辑建议：

1. **扫描最大宽度**
   - 取 0–9（+ 冒号，可选）所有 glyph 的实际宽度
   - `maxWidth = max(all widths)`
2. **统一 advance width + 居中**
   - 所有 glyph 的 `advance width = maxWidth`
   - 计算左右空白差值，将内容居中（改变 side bearing，不拉伸字形）
3. **冒号特殊处理**
   - 如果你希望冒号更窄，可以在导入前就用较窄的 SVG
   - 或脚本里为 U+003A 设置单独宽度（如 `digitWidth * 0.4`）

------

## 7. 输出文件与目录结构

建议统一输出结构：

```text
/fonts_build/
  Aura-Number-Mono-Regular/
    Aura-Number-Mono-Regular.ttf
    Aura-Number-Mono-Regular.woff2
    metadata.json
```

`metadata.json` 可包含：

```json
{
  "family": "Aura Number",
  "name": "Aura-Number-Mono-Regular",
  "type": "number_font",
  "chars": ["0","1","2","3","4","5","6","7","8","9",":"],
  "design": {
    "upm": 1000,
    "ascent": 800,
    "descent": 200,
    "digitWidth": 600,
    "colonWidthRatio": 0.4
  },
  "version": "1.0.0",
  "createdBy": "Zhu Zhu",
  "createdAt": "2025-11-27"
}
```

------

## 8. 测试规范

### 8.1 表盘场景测试

在实际表盘 / 模拟器中做至少以下组合测试：

1. 时间显示：
   - `00:00`, `01:11`, `10:08`, `23:59`
2. 数值显示：
   - `0`, `8`, `88`, `100`, `12345`
3. 背景对比：
   - 深色背景 / 浅色背景
   - 图片背景上叠加（检查可读性）

观察点：

- 数字是否水平对齐（特别是 1、7）
- 冒号是否过宽 / 过窄
- 小尺寸 / 远距离是否仍然可读

### 8.2 性能与体积

- 单一 number_font 的 TTF 文件体积控制在 **< 50 KB** 为佳
- 若增加 Outline / Bold 变体，建议分字体文件，不合并在一个里，以免浪费普通场景资源

