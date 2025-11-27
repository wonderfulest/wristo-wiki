



# 快速复制 facer.io 上的优秀设计



所有操作以在 chrome 浏览器为例



# 背景图片



打开浏览器控制台：右键 => 检查 

选择 Network， Filter输入 https://files.facer.io, 过滤得到所有设计的 webp 格式图片素材



选择 Preview ，右键点击图片，保存到指定位置 （如桌面）



# 处理背景图片

打开 fotor.com

## 去掉图片上的无关元素(如 文字，图标等)



使用 AI => 消除文字 功能， 消除完毕后应用；

如果没有消除干净，使用消除笔，选中需要消除的位置，进行二次消除。



## 增加分辨率

因为表盘的分辨率为 454x454 , 要求图片分辨率为 800x800以上；

使用智能超分功能。



下载处理后的图片，图片处理完成



# 字体



## 字体文件查找

打开表盘的单个对应页面

<img src="https://muyids.oss-cn-beijing.aliyuncs.com/img/image-20240926202903137.png" alt="image-20240926202903137" style="zoom:25%;" />



右键 => 检查 ，

使用 Ctrl + F 查找 font ，找到类似下面的代码：

<img src="https://muyids.oss-cn-beijing.aliyuncs.com/img/image-20240926203039343.png" alt="image-20240926203039343" style="zoom:50%;" />



## 字体文件下载

根据 font-family的值，去搜索对应字体，比如上面的 Cotton_Candy_ttf，在搜索引擎中搜索  Cotton_Candy字体，得到字体文件。

如果找不到，使用base64代码进行处理，得到字体文件。



## 字体文件处理

TODO：设计工具上自动化上传功能 

Woff2： 用于上传到内容管理平台：api.garminface.com



# 参考原来的设计稿设计







