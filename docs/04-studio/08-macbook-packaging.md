

# Mac 打包应用操作流程



## 打开设计平台 => 设计列表页面



复制红色方框中的 appid（原文此处有本地截图，构建环境不可用，已省略图片）。


## 进入 tools 目录下

command + 空格，搜索 Tabby，打开 tabby



执行下面命令进行 项目构建（原文有两张本地截图展示命令和输出，已省略图片，不影响步骤理解）。

一般 20s 左右会创建完成项目工程，有时图片下载会网络中断，重新执行即可，如果仍然下载不成功，尝试切换代理节点。
## 进入应用工程路径下，用vscode打开工程

```shell
➜  xxx git:(main) cd ../LavenderPetals
➜  LavenderPetals git:(main) ✗ code .
➜  LavenderPetals git:(main) ✗  
```

（此处原为本地截图，路径指向 Typora 用户目录，构建环境不可用，已省略截图。）

## 按下 F5，模拟器会启动项目（原文有一张本地截图，已省略）。
## 截图

保存截图到桌面，名字为 raw.png（原文有一张本地截图，已省略）。

按 F1 截图，保存到桌面，名字为 hero-0.png（原文此处有本地截图展示效果，已省略图片）。

## 处理截图

在app路径下执行，bash scripts/deal_hero.sh，

```
➜  app的路径 git:(main) ✗ bash scripts/deal_hero.sh    
```

几秒后图片处理完成，assets 路径生成图片如下（原文为本地截图，已省略图片）。

## 打包

在app路径下执行，bash scripts/build.sh 

```
 app的路径 git:(main) ✗ bash scripts/build.sh  
```

打包一般需要三分钟左右，最终生成.iq 文件，至此，打包流程完成