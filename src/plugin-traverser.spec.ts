import * as path from 'path';

import { PluginModuleOptions } from './interfaces/plugin-module-options.interface';
import { PluginTraverser } from './plugin-traverser';

describe('PluginTraverser', () => {
  it('Should traverse directories and import modules correctly.', async () => {
    const mockPluginModuleOptions: PluginModuleOptions = {
      pluginType: 'app-service',
      directories: [path.join(__dirname, '../test/fixtures/plugins')],
    };
    const pluginTraverser = new PluginTraverser(mockPluginModuleOptions);
    const result = await pluginTraverser.traverseDirectories();

    expect(result).toHaveLength(1);
  });

  it('Should traverse directories and import modules correctly. (node_modules)', async () => {
    const mockPluginModuleOptions: PluginModuleOptions = {
      pluginType: 'app-service',
    };
    const pluginTraverser = new PluginTraverser(mockPluginModuleOptions);
    const result = await pluginTraverser.traverseDirectories();

    expect(result).toHaveLength(0);
  });
});
