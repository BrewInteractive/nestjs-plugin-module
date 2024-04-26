import * as bluebirdPromise from 'bluebird';
import * as fs from 'fs';
import * as path from 'path';

import { BasePlugin } from './abstract/base-plugin.plugin';
import { PluginModuleOptions } from './interfaces/plugin-module-options.interface';
import { PluginOptions } from './interfaces/plugin-options.interface';
import { Provider } from '@nestjs/common';

const node_modules = require('node_modules-path');

export class PluginTraverser {
  private _directories: Array<string> = [path.resolve(node_modules())];

  constructor(pluginModuleOptions: PluginModuleOptions) {
    if (
      pluginModuleOptions.directories &&
      pluginModuleOptions.directories.length > 0
    )
      this._directories = pluginModuleOptions.directories;
  }

  public async traverseDirectoriesAsync(): Promise<
    Array<Provider<BasePlugin>>
  > {
    const modules = [];
    await bluebirdPromise.mapSeries(
      this._directories,
      async (parentDirectoryPath) => {
        if ((await fs.promises.stat(parentDirectoryPath)).isDirectory())
          await this.explorePluginDirectoryAsync(parentDirectoryPath, modules);
      },
    );
    return modules;
  }

  private async explorePluginDirectoryAsync(
    directoryPath: string,
    modules: Array<Provider<BasePlugin>>,
  ): Promise<void> {
    if (this.isPluginDirectory(directoryPath, '')) {
      modules.push(...this.processDirectory(directoryPath, ''));
      return;
    }

    const dirents = await fs.promises.readdir(directoryPath, {
      withFileTypes: true,
    });

    for (const dirent of dirents) {
      if (dirent.isDirectory()) {
        const subdir = path.join(directoryPath, dirent.name);
        await this.explorePluginDirectoryAsync(subdir, modules);
      }
    }
  }

  private isPluginDirectory(
    parentDirectory: string,
    directoryName: string,
  ): boolean {
    if (this.packageJsonExists(parentDirectory, directoryName)) {
      const packageJsonPath = this.createPackageJsonPath(
        parentDirectory,
        directoryName,
      );
      if (this.isPluginModule(this.parsePackageJson(packageJsonPath)))
        return true;
    }
    return false;
  }

  private processDirectory(
    parentDirectory: string,
    directoryName: string,
  ): Provider<BasePlugin>[] {
    return this.importModule(
      this.createModulePath(parentDirectory, directoryName),
    );
  }

  private packageJsonExists(
    parentDirectory: string,
    directoryName: string,
  ): boolean {
    const packageJsonPath = this.createPackageJsonPath(
      parentDirectory,
      directoryName,
    );
    return fs.existsSync(packageJsonPath);
  }

  private createPackageJsonPath(
    parentDirectory: string,
    directoryName: string,
  ): string {
    return path.join(parentDirectory, directoryName, 'package.json');
  }

  private parsePackageJson(packageJsonPath: string): {
    pluginModule: PluginOptions;
  } {
    return JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
  }

  private isPluginModule(packageJson: {
    pluginModule: PluginOptions;
  }): boolean {
    return (
      packageJson.pluginModule?.name !== undefined &&
      packageJson.pluginModule?.displayName !== undefined
    );
  }

  private createModulePath(
    parentDirectory: string,
    directoryName: string,
  ): string {
    const directoryPath = path.join(parentDirectory, directoryName);
    const srcFolder = path.join(directoryPath, './src');
    const dirSrcFolder = path.join(directoryPath, './dist/src');
    return fs.existsSync(srcFolder)
      ? path.join(srcFolder)
      : path.join(dirSrcFolder);
  }

  private importModule(modulePath: string): Array<Provider<BasePlugin>> {
    try {
      return Object.values(require(modulePath));
    } catch (error) {
      console.error(`Unable to import module at path: ${modulePath}.`, error);
    }
  }
}
