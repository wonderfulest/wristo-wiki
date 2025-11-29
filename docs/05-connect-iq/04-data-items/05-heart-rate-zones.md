https://github.com/fevieira27/MoveToBeActive/blob/main/source/MtbA_functions.mc

```c
// Render heart rate text
		var heartRateText = heartRate.format("%d");	
// Heart rate zones color definition (values for each zone are automatically calculated by Garmin)	
	var autoZones = UserProfile.getHeartRateZones(UserProfile.getCurrentSport());
	var heartRateZone = 0;

	if (autoZones!=null){
		if (heartRate >= autoZones[5]) { // 185
			heartRateZone = 7;
		} else if (heartRate >= autoZones[4]) { // 167
			heartRateZone = 6;
		} else if (heartRate >= autoZones[3]) { // 148
			heartRateZone = 5;
		} else if (heartRate >= autoZones[2]) { // 130
			heartRateZone = 4;
		} else if (heartRate >= autoZones[1]) { // 111
			heartRateZone = 3;
		} else if (heartRate >= autoZones[0]) { // 93
			heartRateZone = 2;
		} else {  
			heartRateZone = 1;
		}
	} else { // Only when no default zones were detected
		if (heartRate >= 185) {
			heartRateZone = 7;
		} else if (heartRate >= 167) {
			heartRateZone = 6;
		} else if (heartRate >= 148) {
			heartRateZone = 5;
		} else if (heartRate >= 130) {
			heartRateZone = 4;
		} else if (heartRate >= 111) {
			heartRateZone = 3;
		} else if (heartRate >= 93) {
			heartRateZone = 2;
		} else { //(heartRate > 0) {
			heartRateZone = 1;
		}  
	}
```