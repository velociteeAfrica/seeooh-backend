import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AppStatus } from '../entities';
import { StatusService } from '../status.service';
import { appStatusStub } from './stubs';

describe('AppStatusService', () => {
  let appStatusService: StatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [StatusService],
    }).compile();

    appStatusService = module.get<StatusService>(StatusService);
  });

  describe('getAppStatus', () => {
    let appStatus: AppStatus;
    beforeEach(() => {
      appStatus = appStatusService.getAppStatus();
    });
    test('then it should have a status property', () => {
      expect(appStatus).toHaveProperty('status');
    });
    test('then it should a environment property with value test', () => {
      expect(appStatus).toHaveProperty(
        'environment',
        appStatusStub().environment,
      );
    });
  });
});
