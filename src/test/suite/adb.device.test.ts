import * as assert from 'assert';
import * as device from '../../android_debug_manager/device';
import { AndroidDebugBridge } from '../../android_debug_manager/adb_manager';


suite('ADB device test suite', () => {

	test('test ADB devices without connected devices', () => {
		const adbDevicesMock = `
			List of devices attached

		`;

		const devices = AndroidDebugBridge.devices();
		assert.equal(devices.length, 0);
	});
});
