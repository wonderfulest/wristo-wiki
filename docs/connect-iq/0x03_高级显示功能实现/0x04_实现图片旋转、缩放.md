

# AffineTransformations和矩阵计算



https://forums.garmin.com/developer/connect-iq/f/discussion/336765/bitmap-transformation/1634475

https://forums.garmin.com/developer/connect-iq/f/discussion/336765/bitmap-transformation/1634475

https://forums.garmin.com/developer/connect-iq/f/discussion/336765/bitmap-transformation/1634475



# 矩阵图形变换

https://www.youtube.com/watch?v=AheaTd_l5Is



# 矩阵乘法知识回顾

https://www.shuxuele.com/algebra/matrix-multiplying.html



# 示例代码

![img](https://muyids.oss-cn-beijing.aliyuncs.com/img/pastedimage1712941586922v1.png)



# 图片旋转代码实现



每秒旋转一次

    background =  WatchUi.loadResource(Rez.Drawables.Background0);
    
    var transform = new Gfx.AffineTransform();
    transform.initialize();
    transform.rotate(Math.toRadians(clockTime.sec * 6).toFloat()); // 60秒转一圈
    transform.translate(-screenXCenter, -screenYCenter);
    
    dc.drawBitmap2(screenXCenter, screenYCenter, background,  {
    	:transform => transform
    });
    







# 图片移动



https://www.facer.io/watchface/U1ZU0n6DqZ?watchModel=galaxywatch4black

https://www.facer.io/watchface/MfAaayupHP?watchModel=galaxywatch4black







