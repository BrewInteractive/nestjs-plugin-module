import { Test, TestingModule } from '@nestjs/testing';

import { Logger } from '@nestjs/common';
import { PluginFixture } from '../test/fixtures/plugin.fixture';
import { PluginService } from './plugin.service';

describe('PluginService', () => {
  let service: PluginService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PluginService,
        Logger,
        {
          provide: 'PLUGINTYPES',
          useValue: [PluginFixture],
        },
      ],
    }).compile();

    service = module.get<PluginService>(PluginService);
  });

  it('Should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should load plugins successfully', async () => {
    const spyLogger = jest.spyOn(service['logger'], 'log');
    const mockPlugin = new PluginFixture();
    const spyLoad = jest.spyOn(mockPlugin, 'load');

    jest.spyOn(service['moduleRef'], 'get').mockReturnValue(mockPlugin);

    await service.onModuleInit();

    expect(spyLoad).toHaveBeenCalled();
    expect(spyLogger).toHaveBeenCalledWith(
      `${mockPlugin.displayName} plugin is loaded.`,
    );
    expect(service['plugins']).toContain(mockPlugin);
  });

  it('Should handle plugin loading errors', async () => {
    const spyLogger = jest.spyOn(service['logger'], 'warn');
    const mockPlugin = new PluginFixture();
    const errorMessage = 'Simulated error message';
    const spyLoad = jest
      .spyOn(mockPlugin, 'load')
      .mockRejectedValue(new Error(errorMessage));

    jest.spyOn(service['moduleRef'], 'get').mockReturnValue(mockPlugin);

    await service.onModuleInit();

    expect(spyLoad).toHaveBeenCalled();
    expect(spyLogger).toHaveBeenCalledWith(
      `${mockPlugin.displayName} plugin can't be loaded.: Error: ${errorMessage}`,
    );
    expect(service['plugins']).not.toContain(mockPlugin);
  });
});
