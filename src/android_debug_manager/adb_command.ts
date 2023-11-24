export class AdbCommand {
    command: string;

    constructor(command: string) {
        this.command =`adb ${command}`;
    }
}


export class AdbShellCommand extends AdbCommand {

    constructor(command: string) {
        super(`shell ${command}`);
    }
}
