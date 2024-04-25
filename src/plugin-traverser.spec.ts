import * as path from 'path';

import { PluginModuleOptions } from './interfaces/plugin-module-options.interface';
import { PluginTraverser } from './plugin-traverser';

describe('PluginTraverser', () => {
  it('Should traverse directories and import modules correctly.', async () => {
    const mockPluginModuleOptions: PluginModuleOptions = {
      directories: [path.join(__dirname, '../test/fixtures/plugins')],
    };
    const pluginTraverser = new PluginTraverser(mockPluginModuleOptions);
    const result = await pluginTraverser.traverseDirectoriesAsync();

    expect(result).toHaveLength(4);
  });

  it('Should import plugin modules correctly.', async () => {
    const mockPluginModuleOptions: PluginModuleOptions = {
      directories: [
        path.join(__dirname, '../test/fixtures/plugins/successful-plugin'),
      ],
    };
    const pluginTraverser = new PluginTraverser(mockPluginModuleOptions);
    const result = await pluginTraverser.traverseDirectoriesAsync();

    expect(result).toHaveLength(1);
  });

  it('Should traverse multiple directories and import modules from nested directories correctly.', async () => {
    const mockPluginModuleOptions: PluginModuleOptions = {
      directories: [path.join(__dirname, '../test/fixtures')],
    };
    const pluginTraverser = new PluginTraverser(mockPluginModuleOptions);
    const result = await pluginTraverser.traverseDirectoriesAsync();

    expect(result).toHaveLength(34;
  });

  it('Should traverse directories and import modules from node_modules correctly.', async () => {
    const mockPluginModuleOptions: PluginModuleOptions = {};
    const pluginTraverser = new PluginTraverser(mockPluginModuleOptions);
    const result = await pluginTraverser.traverseDirectoriesAsync();

    expect(result).toHaveLength(0);
  });
});
