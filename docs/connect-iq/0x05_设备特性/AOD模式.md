# Amoled 屏 AOD 模式

只有在低电量模式，并且开启防烧屏保护的设备上支持 AOD 模式

```c
class MyView extends WatchUi.WatchFace {

		var inLowPower = false;
		var canBurnIn = false;

    function initialize() {
        WatchFace.initialize();

        if(Sys.getDeviceSettings() has :requiresBurnInProtection) {
        	canBurnIn=Sys.getDeviceSettings().requiresBurnInProtection;
        }
    }

    function onUpdate(dc) {
        if(inLowPower && canBurnIn) {
            //do AOD display (<10% && 3 minutes max)
        } else {
            // regular display
        }
    }

    function onExitSleep() {
    	inLowPower=false;
    	WatchUi.requestUpdate();
    }

    function onEnterSleep() {
    	inLowPower=true;
    	WatchUi.requestUpdate();
    }
}
```

在 settings > Lower Power Mode 开启后，File > Screen Heat Map观察热量使用
