# 表盘设计开放平台使用文档

1. 下图片： https://ca.pinterest.com/
2. 处理图片： https://www.fotor.com/
3. 编辑表盘： https://studio.garminface.com/
4. 打包： mac电脑打包iq文件 , 本地安装环境
5. 上线： garmin app store 上传：https://apps.garmin.com/

# 表盘UI设计

## 登录设计平台

点击下方链接，登录[表盘设计平台](https://studio.garminface.com/)主界面

https://studio.garminface.com/

主界面包含四部分：

1. 元素区（左侧）
2. 图层区（左侧）
3. 设计区（中间）
4. 编辑栏（右侧）

## 创建新的表盘设计

您可以通过以下两种方式创建新的表盘设计：

### 从零开始添加元素

- 使用“元素库”中的各种元素（如时间、日期、数据项等），直接拖拽到设计区域。
- 调整每个元素的位置和属性。

### 选择已有设计进行复制

- 在设计列表中，选择已有设计，点击复制，会在设计列表中出现一个新的表盘。
- 导入后，需要更新
- 另外，需要修改模板中的元素，以满足您的个性化需求。

## 添加和编辑设计元素

您可以向表盘添加多种设计元素，如背景图片、时间、日期、数据项、基础几何图形、其他功能组件等。

### 添加背景图片

- 点击元素区的“Background”按钮，选择一张图片作为表盘的背景。
- 当前平台只支持方形图片，格式为PNG，大小大于 500x500，最好不要超过2Mb。
- 使用工具栏中的选项调整图片的大小和位置。

### 添加时间和日期

- 点击添加“Hour”、“Minute”、“Second"、“Date”、“AmPm”等“时间”或“日期”相关元素。
- 原则上同一种时间和日期属性最多只添加一次，比如表盘上不要同时存在两个 Hour元素，以免对用户造成困扰。
- 将时间或日期拖放到表盘上的适当位置。
- 使用编辑栏的属性编辑器来定制时间和日期的字体、颜色和格式。

### 添加数据项

- 点击添加“Fields”
- 选择一个或多个数据项并拖放到表盘上，数据项数量原则上不少于1个，不多于6个，一般2~4个较为适宜。
- 使用属性编辑器来调整数据项的显示样式和位置。
- 关于布局方式的选择

### 导出设计

完成设计后，您需要导出设计文件并上传WonderFace内容管理平台。

- 点击“导出”按钮。

# 设计作品上传

WonderFace内容管理平台访问地址为：https://api.garminface.com/。登录需要注册平台的设计师账号。

如需申请设计师账号，请发送邮件至 [wonder.gface@gmail.com](mailto:wonder.gface@gmail.com) 并说明申请用意，邮件模板为：

```markdown
我叫xx，是一名拥有xx年经验的设计师，对在本平台开发设计表盘很感兴趣，辛苦给我开通设计师账号权限^_^

我的邮箱账号是：xx@xx.com
```

收到申请后，我们会在1~3个工作日内对您的申请做出回复，如果申请通过，会发送 包含下面链接格式的邮件,  点击链接接受邀请即可登录 内容管理平台上传您的设计作品

https://api.garminface.com/admin/auth/register?registrationToken=xxx

## 平台登录

使用您的邮箱和注册信息登录 [WonderFace内容管理平台](https://api.garminface.com/)

![image-20240430153001663](https://muyids.oss-cn-beijing.aliyuncs.com/img/image-20240430153001663.png)

## 作品上传



点击 Content Manager > Design > Create new entry，会弹出下方的上传界面



![image-20240430153106222](/Users/mac/Library/Application Support/typora-user-images/image-20240430153106222.png)



根据要求，上传设计稿。

各数据项说明如下：

- name：作品名称
- kpay_appid: 用于第三方收款
- background: 背景图，图片类必传，少部分表盘不需要
- conf_json: 设计平台导出的配置文件，必传
- approved: 审核状态，true: 通过, false: 不通过
- published: 应用上线状态，true: 发布，false: 未发布
- release_package: 应用软件包；审核通过后，由开发人员上传。
- 其他数据项：根据实际情况上传
  - raw_png_url: 原图链接
  - Design_psd: ps设计稿
  - other: 其他设计文件，如指针表盘的指针等

# 表盘审核

审核通过后，上传 release_package，并将 approved状态改为 true。

# Release包发布

下载 release_package，上传至Garmin应用商店，并将 published 状态改为 true。

