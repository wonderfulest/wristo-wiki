
# 指针表盘素材开发规范

素材目录结构

```
designs                                    
├── README.txt                  
├── background.png                          
├── hour-hand.svg                         
├── minute-hand.svg                    
├── second-hand.svg          
└── design.png/psd
```

# 示例

设计稿文件 design.png/psd，用于描述表盘的整体设计

# 背景图

默认暗色背景和亮色背景两张图片：

- 暗色背景：background.png
- 亮色背景：background-light.png

表盘默认使用 暗色背景，图片大小为1024x1024 的png图片格式。

暗色背景显示效果为黑色背景 + 白色 tickets。

Tickets 由背景图提前做好还是由代码生成，根据不同应用的设计来决定，需要设计师与研发提前确认沟通。

注意：

- 图片的颜色是固定的，代码无法修改，所以应确定如何应对不同主题进行图片的透明设计

# 指针

默认提供三个指针的svg文件，如果使用线状指针，则在README.txt中进行说明。

注意 指针的长宽比例，最终会影响实际观感。

# 其他元素

其他数据项、icon、文字显示暂且与图片表盘保持一致。
