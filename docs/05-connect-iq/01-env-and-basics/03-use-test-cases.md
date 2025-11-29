# 如何编写测试用例



```
using Toybox.Test;
import Toybox.Lang;

using Toybox.Time as Time;
using Toybox.Time.Gregorian;

function getSafeNumeric(val as Numeric or String) as Numeric? {
	if (val == null) {
		return null;
	}
	if (val instanceof Lang.Number) {
		return val;
	} else if (val instanceof Lang.String) {
		try {
			return val.toNumber();
		} catch (e instanceof Lang.Exception) {
			System.error(
				"convert " + val + " to number failed:" + e.getErrorMessage()
			);
		}
	}
	return null;
}

(:test)
function timestampTest(logger) {
	var val = "--";
	var res = getSafeNumeric(val);
	logger.warning("res: " + res);
	// logger.warning(res);

	return true;
}

```