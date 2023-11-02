
import * as vscode from 'vscode';

import { AndroidDeviceProvider } from './android_device_provider';

export function activate(context: vscode.ExtensionContext) {
	
	vscode.window.registerTreeDataProvider('androidDeviceExplorer.deviceExplorer', new AndroidDeviceProvider());
}

export function deactivate() {}