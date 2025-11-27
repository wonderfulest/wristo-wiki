# vscode验证monkey C安装是否成功

打开命令面板，

如果遇到 java not found in PATH， 是因为

The Path should not contain bin/java, so in your case, it should be either /usr or /opt/homebrew/opt/openjdk

通过下面命令解决

```
 sudo ln -s /Library/Java/JavaVirtualMachines/jdk1.8.0_361.jdk/Contents/Home /usr/local/java    
```

参考：

https://forums.garmin.com/developer/connect-iq/f/discussion/277027/java-path-not-found-mac-os

# 模拟器配置错误


**cd $TMPDIR/Garmin/**

That should open the sim's folder in Finder.

From there, navigate to **apps/settings**


全部删除

```
cd $TMPDIR && rm -rf com.garmin.connectiq*   
```

