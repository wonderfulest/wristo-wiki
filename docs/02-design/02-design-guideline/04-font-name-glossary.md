# 🎯 字体有几种「名字」？每一种到底作用是什么？

一个字体文件（TTF/OTF）里常见的 **5 个名字字段**：

1. **PostScriptName（PS Name）**
2. **Font Family Name（familyname）**
3. **Font Subfamily Name（subfamily / style）**
4. **Full Name（fullname）**
5. **FontName（内部 ID，用于 PostScript 系统）**

不同系统用的重点不一样。

------

# 🟥 1. PostScript Name（PS Name）

🚀 **最重要的、最严格的名字。**

格式要求非常硬核：

- **不能有空格**
- **不能有中文**
- **只能是 A–Z a–z 0–9 和连字符“-”**
- 必须唯一
- 大部分排版/渲染引擎直接依赖这个名字

📌 常见格式：

```
DongweiNumberMono-Regular
DongweiNumberMono-Bold
LandscapeMono-Outline
```

📌 使用场景：

- PDF 内嵌字体
- iOS/macOS 的 CoreText 载入字体
- Adobe 产品识别字体
- 字体工具（FontForge, FontTools）匹配 glyph 集

📌 如果 PostScriptName 不规范，会出现：

- 字体在系统中不显示
- PDF 无法嵌入
- 不同版本字体被系统当成同一个

------

# 🟦 2. Family Name（font.familyname）

📌 作用是把同系列的字体“归类”在一起。

例如：

```
family: Dongwei Number Mono
```

系统会把 Regular / Bold / Outline 聚成一组。

🌀 你的 watch-face 字体体系推荐：

```
Dongwei Number Mono
Wristo Icon
Wristo Text Sans
```

------

# 🟩 3. Subfamily / Style（font.weight 或 subfamily）

📌 区分具体风格，比如：

```
Regular
Bold
Light
Outline
Filled
Mono
```

📌 系统选择字体时，会把 **Family + Subfamily** 组合成一套。
 例如：

```
family: Dongwei Number Mono
subfamily: Regular
```

------

# 🟧 4. Full Name（font.fullname）

📌 这是用户看到的“完整名字”。

通常格式：

```
{FamilyName} {Subfamily}
```

例如：

```
Dongwei Number Mono Regular
Dongwei Number Mono Outline
Landscape Solid Bold
```

在设计软件（Figma、PS、Illustrator）字体下拉列表里看到的就是它。

**如果你写错 fullName，Figma/PS 会把风格显示不出来，全部挤到一个名字下。**

------

# 🟫 5. FontName（font.fontname）

📌 字体内部技术用途（与 PSName 类似，通常保持一致即可）

一般规则：

```
fontname = PostScriptName（不含空格）
```

例如：

```
DongweiNumberMonoRegular
DongweiNumberMonoBold
```

现代系统对它依赖不多，但最好保持一致性。

------

# 🌟 总结大表（最清晰版）

| 名称                  | 字段                        | 示例                            | 有什么用               |
| --------------------- | --------------------------- | ------------------------------- | ---------------------- |
| **PostScriptName**    | DongweiNumberMono-Regular   | PDF、iOS、Adobe、嵌入、渲染识别 | 最严格，不允许空格     |
| **Family Name**       | Dongwei Number Mono         | 归类字体为一个系列              | 字体组的根名字         |
| **Subfamily (Style)** | Regular / Bold / Outline    | 区分版本                        | 与 Family 组合影响选择 |
| **Full Name**         | Dongwei Number Mono Regular | UI里显示的名字                  | 设计软件下拉可见       |
| **FontName**          | DongweiNumberMono-Regular   | 内部 ID                         | 一般与 PSName 一致     |

------

# 🎁 给你一个“标准字体命名模板”

你后面所有字体都可以套用：

```
familyname  = Dongwei Number Mono
subfamily   = Regular
fullname    = Dongwei Number Mono Regular
postscript  = DongweiNumberMono-Regular
fontname    = DongweiNumberMono-Regular
```