import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AppStatus } from '../entities';
import { StatusController } from '../status.controller';
import { StatusService } from '../status.service';
import { appStatusStub } from './stubs';

jest.mock('../status.service');

describe('AppStatusController', () => {
  let statusController: StatusController;
  let statusService: StatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      controllers: [StatusController],
      providers: [StatusService],
    }).compile();

    statusController = module.get<StatusController>(StatusController);
    statusService = module.get<StatusService>(StatusService);
    jest.clearAllMocks();
  });
  describe('getAppStatus', () => {
    let appStatus: AppStatus;
    beforeEach(() => {
      appStatus = statusController.getAppStatus();
    });
    test('then it should call statusService', () => {
      expect(statusService.getAppStatus).toHaveBeenCalled;
    });
    test('then it should return the app status', () => {
      expect(appStatus).toEqual(appStatusStub());
    });
  });
});
