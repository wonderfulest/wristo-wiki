

# IQ崩溃 



# 抓取日志

日志文件位于 /Garmin/Apps/Logs/CIQ_LOG.bak



内容如下：

```
---
Error: Unhandled Exception
Time: 2024-05-19T04:04:00Z
Part-Number: 006-B3991-00
Firmware-Version: '18.27'
Language-Code: eng
ConnectIQ-Version: 4.2.3
Store-Id: 752d4f99-ae0e-4d9e-937d-b365298cda1d
Store-Version: 18
Filename: E2H75930
Appname: DigitalLayers 2.0.3
Stack: 
  - pc: 0x100081d5
  - pc: 0x100034cf
```





假设用户向您发送了一个 ciq_log 文件，但没有调试符号，您在堆栈跟踪中看到的只是 pc:。以下是如何缩小范围的方法。当您看到 ERA 报告时会发生这种情况。

Let's say the ciq_log has this:

```
Error: Unexpected Type Error
Details: 'Failed invoking <symbol>'
Time: 2020-06-26T14:52:49Z
Part-Number: 006-B3113-00
Store-Id: 12b4e4ef-353c-4935-909c-315f6e6ad5f8
Store-Version: 23
Filename: A6IC0712
Appname: Pi GD
Stack: 
  - pc: 0x100014eb
  - pc: 0x100008e7
```



使用下面工具转化成 10进制数

https://www.rapidtables.com/convert/number/hex-to-decimal.html

然后在 bin/*.debug.xml文件中，找最接近的数字，定位到有问题的代码行；



如果用户遇到问题，可以发送邮件要求提供错误日志文件进行分析，邮件内容如下：







# 参考



https://forums.garmin.com/developer/connect-iq/f/discussion/231129/so-you-have-a-ciq_log-file-but-all-you-see-is-pc-without-a-friendly-stack-trace---what-to-do#pifragment-1298=1



https://www.rapidtables.com/convert/number/hex-to-decimal.html

