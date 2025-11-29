# 适合平台使用的字体要求

- 一般使用简约、整洁的适合数字显示的现代字体

- 字体家族：至少包括Regular, Bold两种，推荐 支持 Thin、Light等更多粗细样式
- 可以用于 **个人和商业用途** 的免费字体

# 字体信息说明



```
Font Family Name: Ubuntu Mono
Font Full Name: Ubuntu Mono Bold               
PostScript Name: UbuntuMono-Bold           
Font Weight: Bold                  
Font Version: 20230101                  
Glyph Count: 65601  
```



我们使用 PostScript Name 作为字体的唯一标识。

> 解释：PostScript Name 是字体的唯一标识符，用于在 PostScript 打印机和其他支持 PostScript 的设备或软件中识别字体。它通常是字体名称的简化版，并且不包含任何空格或特殊字符。这个名字在技术上是字体的“内部名称”，它帮助确保在不同平台和设备间正确加载字体。在字体信息中，PostScript Name 用来精确标识和引用字体，而不是使用常见的字体家族名称或样式。

使用 Font Full Name 

# 字体处理

## 整理要处理的字体文件，放到临时目录下

将所有字体命名为"字体家族名 + 粗细样式"格式，以 BebasNeue 字体家族为例，

```
BebasNeue Bold.otf    BebasNeue Book.otf    BebasNeue Light.otf   BebasNeue Regular.otf BebasNeue Thin.otf         
```

然后，放到 `watchface-resources/tmp-fonts`路径下，

运行脚本 

```shell
watchface-resources git:(main) ✗ bash organize_fonts.sh
```



## 字体信息获取





## 处理临时字体文件

然后，使用window电脑，进入 ``watchface-resources/` 目录，执行脚本 `auto-fonts.bat`，等待处理完成



## 处理完的字体文件

处理完成后，处理完的文件目录结构如下（以Amiko字体家族进行说明）：

- 第一层为文件夹，使用 字体家族名 + 粗细样式命名，如Amiko-Bold、Amiko-Regular、Amiko-SemiBold等；
- 第二层为字体大小，具体数值为 表盘上支持的字体大小，格式为阿拉伯数字；另外ttf等字体文件也位于这一层；
- 第三层为字体的位图文件，包括 fnt 和 png文件。

```shell
super-fonts git:(main) tree -L 3 Amiko-Bold 
Amiko-Bold
├── 10
│   ├── Amiko-Bold-g.fnt
│   └── Amiko-Bold-g_0.png
├── 108
│   ├── Amiko-Bold-g.fnt
│   └── Amiko-Bold-g_0.png
├── 11
│   ├── Amiko-Bold-g.fnt
│   └── Amiko-Bold-g_0.png
├── 12
│   ├── Amiko-Bold-g.fnt
│   └── Amiko-Bold-g_0.png
...
```

将处理完的字体文件移动到 `watchface-resources/super-fonts` 下，

```
mv tmp-fonts/* super-fonts
```

## 字体文件上线至设计平台

备注：

- 如果字体需要经常使用，则需要在设计平台前端工程中进行配置；

- 如果不经常使用，后面会支持自定义字体功能，即 用户上传 ttf 文件，服务器自动执行上面1-3步骤，然后通过 字体接口，返回当前用户上传过的 自定义字体。





静态资源配置：

- ttf 文件 添加到 src/assets/fonts 目录下
- fonts.css 中添加 font-face 配置

字体预加载配置：

- Index.html 中添加如下代码：

  ```
    <link rel="preload" href="/src/assets/fonts/BebasNeue-Bold.ttf" as="font" type="font/ttf" crossorigin />
  ```

字体选择器配置：

- 







# 单个位图字体生成过程讲解（非开发人员勿看）



# bmfont

配置说明文档

https://www.angelcode.com/products/bmfont/doc/file_format.html



## 命令行方式调用

https://www.angelcode.com/products/bmfont/doc/command_line.html



# 字体上传内容管理平台



生成 woff2 字体

```
cd  /Users/mac/workspace/garmin/watchface-resources/fonts
woff2_compress roboto-medium/roboto-medium.ttf 
```



打开 https://api.garminface.com/ ，选择 font进行上传



# 位图字体生成



## 创建字体文件夹，保存ttf文件



注意：

- ttf文件名不应包含空格等特殊字符
- 文件夹名字必须与ttf文件名保持一致

![image-20240519221548669](https://muyids.oss-cn-beijing.aliyuncs.com/img/image-20240519221548669.png)



## 查看 ttf 字体信息

（此处原为本地截图展示效果，构建环境无法访问本地图片，已省略截图，仅保留文字说明。）

注意：

- 记住 字体名字，下一步命令行调用使用



## 执行命令一键生成字体文件



cmd进入 E:\workspace\garmin\watchface-resources 路径下，执行：

```
bmfont-auto.bat 字体名 字体文件路径
```

如

```
bmfont-auto.bat "xBONES 3D" E:\workspace\garmin\watchface-resources\fonts\xbones3d\xbones3d.ttf
```



注意：如果字体名中存在空格，需要用双引号括起来



<img src="https://muyids.oss-cn-beijing.aliyuncs.com/img/image-20240519221751140.png" alt="image-20240519221751140" style="zoom:75%;" />



生成的字体文件会保存在”fonts\字体名字\字体大小“的各个目录下

## 上传字体文件

```
git add .
git commit -m "add fonts"
git pull --rebase
git push
```



# 参考文档



https://blog.csdn.net/akak2010110/article/details/50755270

https://yszheda.github.io/blog/blog/2014/09/02/bmfont-generator/





