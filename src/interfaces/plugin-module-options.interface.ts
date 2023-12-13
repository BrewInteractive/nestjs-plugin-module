import { ForwardReference } from '@nestjs/common';

export interface PluginModuleOptions {
  imports?: Array<ForwardReference>;
  directories?: Array<string>;
}
