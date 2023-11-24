import { AdbCommand } from "./adb_command";
import { Device, parseDevicesOutput } from "./device";
import { spawnSync } from "child_process";

export class AndroidDebugBridge {

    static devices(): Device[] {
        const devicesOutput = AndroidDebugBridge._executeCommand(new AdbCommand("devices"));
        return parseDevicesOutput(devicesOutput);
    }

    static _executeCommand(toExec: AdbCommand): string {
        return spawnSync(toExec.command)
            .stdout.toString();
    }
}