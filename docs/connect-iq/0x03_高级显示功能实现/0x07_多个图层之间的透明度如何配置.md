# 字体覆盖的时候，透明度如何设置



```
dc.setFill(dc.createColor(128, 0, 0, 0));
```



![image-20240918154448911](https://muyids.oss-cn-beijing.aliyuncs.com/img/image-20240918154448911.png)



# 练习

https://www.facer.io/watchface/sJPvAaMYA9?watchModel=galaxywatch6black





# 图形半透明

https://forums.garmin.com/developer/connect-iq/b/news-announcements/posts/a-whole-new-world-of-graphics-with-connect-iq-4

 

```
// Draw the semi-transparent circles above and below
// to offset the time text
dc.setFill(0x80FFFFFF);
dc.setStroke(0x80FFFFFF);
dc.fillCircle(dc.getWidth() / 2, dc.getHeight() * 1.5, dc.getWidth() * .7);
dc.fillCircle(dc.getWidth() / 2, -(dc.getHeight()/2), dc.getWidth() * .7);
```

