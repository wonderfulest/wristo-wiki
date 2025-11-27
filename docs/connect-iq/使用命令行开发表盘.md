
http://johann-glaser.blogspot.com/2016/10/garmin-connect-iq-on-linux.html

## 编译程序 

```
monkeyc -y ~/.ciq/developer_key.der -o ProgressBar.prg \
    -m manifest.xml -z resources/resources.xml \
    -z resources/strings.xml -z resources/bitmaps.xml \
    source/ProgressBar.mc source/ProgressBarView.mc
```

## 后台启动模拟器

```
connectiq &
```

## 启动程序

```
monkeydo ProgressBar.prg
```
