import { ForwardReference } from '@nestjs/common';

export interface PluginModuleOptions {
  imports?: Array<ForwardReference>;
  pluginType: string;
  directories?: Array<string>;
}
