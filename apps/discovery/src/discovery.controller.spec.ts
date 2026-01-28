import { Test, TestingModule } from '@nestjs/testing';
import { DiscoveryController } from './discovery.controller';
import { DiscoveryService } from './discovery.service';

describe('DiscoveryController', () => {
  let controller: DiscoveryController;
  let service: DiscoveryService;

  const mockService = {
    listPublishedPrograms: jest.fn(),
    getPublishedProgramById: jest.fn(),
    searchPublishedPrograms: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DiscoveryController],
      providers: [{ provide: DiscoveryService, useValue: mockService }],
    }).compile();

    controller = module.get<DiscoveryController>(DiscoveryController);
    service = module.get<DiscoveryService>(DiscoveryService);

    jest.clearAllMocks();
  });

  it('should list programs', async () => {
    mockService.listPublishedPrograms.mockResolvedValue([{ id: '1' }]);
    const result = await controller.listPrograms(1, 10);
    expect(service.listPublishedPrograms).toHaveBeenCalledWith(1, 10);
    expect(result).toEqual([{ id: '1' }]);
  });

  it('should get a program by id', async () => {
    mockService.getPublishedProgramById.mockResolvedValue({ id: 'abc' });
    const result = await controller.getProgram('abc');
    expect(service.getPublishedProgramById).toHaveBeenCalledWith('abc');
    expect(result).toEqual({ id: 'abc' });
  });

  it('should search programs', async () => {
    mockService.searchPublishedPrograms.mockResolvedValue([{ id: 'x' }]);
    const result = await controller.search('podcast');
    expect(service.searchPublishedPrograms).toHaveBeenCalledWith('podcast');
    expect(result).toEqual([{ id: 'x' }]);
  });
});
