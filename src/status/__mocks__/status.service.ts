import { appStatusStub } from '../spec/stubs';

export const StatusService = jest.fn().mockReturnValue({
  getAppStatus: jest.fn().mockReturnValue(appStatusStub()),
});
