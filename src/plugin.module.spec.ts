import { Test, TestingModule } from '@nestjs/testing';

import { PluginModule } from './plugin.module';

describe('PluginModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        PluginModule.registerAsync({
          pluginType: 'app-service',
        }),
      ],
    }).compile();
  });

  it('Should be defined', () => {
    const service = module.get<PluginModule>(PluginModule);
    expect(service).toBeDefined();
  });
});
