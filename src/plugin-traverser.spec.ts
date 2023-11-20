import * as path from 'path';

import { PluginModuleOptions } from './interfaces/plugin-module-options.interface';
import { PluginTraverser } from './plugin-traverser';

describe('PluginTraverser', () => {
  it('Should traverse directories and import modules correctly.', () => {
    const mockPluginModuleOptions: PluginModuleOptions = {
      pluginType: 'app-service',
      directories: [path.join(__dirname, '../test/fixtures/plugins')],
    };
    const pluginTraverser = new PluginTraverser(mockPluginModuleOptions);
    const result = pluginTraverser.traverseDirectories();

    expect(result).toHaveLength(1);
  });

  it('Should traverse directories and import modules correctly. (node_modules)', () => {
    const mockPluginModuleOptions: PluginModuleOptions = {
      pluginType: 'app-service',
    };
    const pluginTraverser = new PluginTraverser(mockPluginModuleOptions);
    const result = pluginTraverser.traverseDirectories();

    expect(result).toHaveLength(0);
  });
});
