# 一、打开 openweathermap 官方网站

浏览器访问： [https://openweathermap.org/](https://openweathermap.org/)

<img src="https://muyids.oss-cn-beijing.aliyuncs.com/img/image-20230913134217334.png" alt="image-20230913134217334"  />

# 二、注册：

## （一）打开注册页面：

点击右上角 "Sign in" , 选择 "Create an Account"

![image-20230913134923838](https://muyids.oss-cn-beijing.aliyuncs.com/img/image-20230913134923838.png)

或者直接访问：[https://home.openweathermap.org/users/sign_up](https://home.openweathermap.org/users/sign_up)

## （二）填写身份信息

![image-20230913135129477](https://muyids.oss-cn-beijing.aliyuncs.com/img/image-20230913135129477.png)

填写完成后（如下图），提交

![image-20230913135321686](https://muyids.oss-cn-beijing.aliyuncs.com/img/image-20230913135321686.png)

## （三）确认邮件链接

![image-20230913135548402](https://muyids.oss-cn-beijing.aliyuncs.com/img/image-20230913135548402.png)

进入邮箱，点击"Verify your email"

![image-20230913135640140](https://muyids.oss-cn-beijing.aliyuncs.com/img/image-20230913135640140.png)

此时，会跳转回官网，并且是登录状态（如果不是，使用刚注册的用户名、密码直接登录）。

# 三、获取 API Key

![image-20230913135920736](https://muyids.oss-cn-beijing.aliyuncs.com/img/image-20230913135920736.png)

紧接上一补，进入 OpenWeatherMap 官网，点击你的用户名，选择“My API keys”

![image-20230913140147993](https://muyids.oss-cn-beijing.aliyuncs.com/img/image-20230913140147993.png)

将下面的 Key 复制出来，保存。

## （一）测试 API Key 是否生效

请求北京地区的天气情况：

https://api.openweathermap.org/data/2.5/weather?q=Beijing,cn&APPID=你的API-Key

正常返回格式如下：

![image-20230913143152516](https://muyids.oss-cn-beijing.aliyuncs.com/img/image-20230913143152516.png)

注意：如果返回 401，请不要惊慌，因为 API Key 会过一会儿生效，时间一般在一小时内

![image-20230913141308198](https://muyids.oss-cn-beijing.aliyuncs.com/img/image-20230913141308198.png)

# 四、在设置项中配置天气 API Key

在手机上 Connect IQ APP 中，打开对应的表盘“设定”按钮：

<img src="https://muyids.oss-cn-beijing.aliyuncs.com/img/2361694585903_.pic.jpg" alt="2361694585903_.pic" style="zoom:50%;" />

将第（三）步复制的 API Key，粘贴到 OpenWeatherMap 配置项：

<img src="https://muyids.oss-cn-beijing.aliyuncs.com/img/2371694585936_.pic.jpg" alt="2371694585936_.pic" style="zoom:50%;" />
