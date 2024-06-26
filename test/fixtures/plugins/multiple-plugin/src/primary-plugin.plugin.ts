import { BasePlugin } from '../../../../../src/abstract/base-plugin.plugin';
import { Injectable } from '@nestjs/common';
import { pluginModule } from '../package.json';

@Injectable()
export class PrimaryPlugin extends BasePlugin {
  constructor() {
    super(pluginModule);
  }
  async load(): Promise<void> {
    return Promise.resolve();
  }
}
