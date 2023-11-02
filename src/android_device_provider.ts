import { File } from 'buffer';
import * as vscode from 'vscode';

export class AndroidDeviceProvider implements vscode.TreeDataProvider<AndroidFsItem> {
    onDidChangeTreeData?: vscode.Event<any> | undefined;

    getTreeItem(element: AndroidFsItem): vscode.TreeItem | Thenable<vscode.TreeItem> {
        return element;
    }

    getChildren(element?: any): Thenable<AndroidFsItem[]> {
		const spawn = require('child_process').spawnSync;

        var fullPath = element ? element.getFullPath() : '';
        var lsProcess = spawn('/home/gallottino/Android/Sdk/platform-tools/adb' , ['shell','ls', fullPath, '-l']);

		var fileInfos = parseLsOutput(lsProcess.stdout.toString());
        return Promise.resolve(
            
            fileInfos.map((item: FileInfo) => {
                return new AndroidFsItem(
                    element ?? null, 
                    item.name, 
                    item.isDirectory() ? vscode.ThemeIcon.Folder : vscode.ThemeIcon.File,
                    item.isDirectory() ? vscode.TreeItemCollapsibleState.Collapsed : vscode.TreeItemCollapsibleState.None
                );
        }));
    }

    resolveTreeItem?(item: vscode.TreeItem, element: AndroidFsItem, token: vscode.CancellationToken): vscode.ProviderResult<vscode.TreeItem> {
        throw new Error('Method not implemented.');
    }

}

export class AndroidFsItem extends vscode.TreeItem {
    constructor(
        public readonly parent: AndroidFsItem | null,
        public readonly label: string,
        public readonly iconPath: vscode.ThemeIcon,
        public readonly collapsibleState: vscode.TreeItemCollapsibleState,
        public readonly command?: vscode.Command
    ) {
        super(label, collapsibleState);
        this.iconPath = iconPath;
    }

    getFullPath(): string {
        if (this.parent === null) {
            return this.label;
        } else {
            return this.parent.getFullPath() + '/' + this.label;
        }
    }
}

class FileInfo {
    name: string;
    size: number;
    permissions: string;
    modified: Date;

    constructor(name: string, size: number, permissions: string, modified: Date) {
        this.name = name;
        this.size = size;
        this.permissions = permissions;
        this.modified = modified;
    }

    isDirectory(): boolean{
        return this.permissions[0] === 'd';
    }

    isFile(): boolean {
        return this.permissions[0] === '-';
    }

    exclude(): boolean {
        return !this.isDirectory() && !this.isFile();
    }
}

function parseLsOutput(output: string): FileInfo[] {
    // Split the output into lines
    const lines = output.split('\n');
  
    // Remove the header line
    lines.shift();
    // Parse each line into a FileInfo object
    const fileInfos: FileInfo[] = lines
    .map((line) => {
      const [permissions, links, owner, group, size, month, day, name] = line.trim().split(/\s+/);
    
      return new FileInfo(
        name,
        parseInt(size),
        permissions,
        new Date(`${month} ${day}`),
      );
    })
    .filter((fileInfo) => fileInfo.exclude() === false)
    .sort(function(a, b) {
        if (a.permissions < b.permissions) {
          return 1;  // inverte l'ordine
        } else if (a.permissions > b.permissions) {
          return -1; // inverte l'ordine
        } else {
          return 0;
        }
      });

  
    return fileInfos;
  }