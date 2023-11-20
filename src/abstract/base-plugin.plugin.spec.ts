import { BasePlugin } from './base-plugin.plugin';
import { PluginFixture } from '../../test/fixtures/plugin.fixture';

describe('BasePlugin', () => {
  it('should create an instance of BasePlugin with correct properties', () => {
    const mockPlugin = new PluginFixture();

    expect(mockPlugin).toBeInstanceOf(BasePlugin);
    expect(mockPlugin.name).toBe('plugin-fixture');
    expect(mockPlugin.displayName).toBe('plugin-fixture');
  });
});
