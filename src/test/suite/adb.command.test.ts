import assert from "assert";
import { AdbShellCommand } from "../../android_debug_manager/adb_command";

suite('ADB command test suite', () => {
    test('test ADB simple command', () => {
        const AdbCommand = new AdbShellCommand("devices");
        assert.equal(AdbCommand.command, "adb devices");
    });

    test('test ADB shell command', () => {
        const shellCommand = new AdbShellCommand("ls");
        assert.equal(shellCommand.command, "adb shell ls");
    });
});