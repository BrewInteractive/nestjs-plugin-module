import { BasePlugin } from '../../src/abstract/base-plugin.plugin';

export class PluginFixture extends BasePlugin {
  constructor() {
    super({
      name: 'plugin-fixture',
      displayName: 'plugin-fixture',
      type: 'app-service',
    });
  }

  async load(): Promise<void> {
    return Promise.resolve();
  }
}
