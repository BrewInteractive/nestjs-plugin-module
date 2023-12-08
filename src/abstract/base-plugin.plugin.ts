import { PluginOptions } from '../interfaces/plugin-options.interface';

export abstract class BasePlugin {
  constructor(pluginOptions: PluginOptions) {
    this.name = pluginOptions.name;
    this.displayName = pluginOptions.displayName;
  }

  name: string;
  displayName: string;
  abstract load(): Promise<void>;
}
