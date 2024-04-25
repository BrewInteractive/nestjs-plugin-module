import { BasePlugin } from '../../../../../src/abstract/base-plugin.plugin';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UnsuccessfulPlugin extends BasePlugin {
  constructor() {
    super({} as any);
  }
  async load(): Promise<void> {
    return Promise.resolve();
  }
}
