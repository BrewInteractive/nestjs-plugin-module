import { DynamicModule, Module, Provider } from '@nestjs/common';

import { BasePlugin } from './abstract/base-plugin.plugin';
import { PluginModuleOptions } from './interfaces/plugin-module-options.interface';
import { PluginService } from './plugin.service';
import { PluginTraverser } from './plugin-traverser';

@Module({})
export class PluginModule {
  public static async registerAsync(
    pluginModuleOptions: PluginModuleOptions,
  ): Promise<DynamicModule> {
    const pluginTraverser = new PluginTraverser(pluginModuleOptions);
    const pluginTypes: Array<Provider<BasePlugin>> =
      pluginTraverser.traverseDirectories();

    return {
      module: PluginModule,
      imports: pluginModuleOptions.imports,
      providers: [
        PluginService,
        {
          provide: 'PLUGINTYPES',
          useValue: pluginTypes,
        },
        ...pluginTypes,
      ],
    };
  }
}
