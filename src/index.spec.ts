import { BasePlugin, PluginModule } from './index';

describe('PluginTest', () => {
  it('Should export BasePlugin', () => {
    expect(BasePlugin).toBeDefined();
  });

  it('Should export PluginModule', () => {
    expect(PluginModule).toBeDefined();
  });
});
