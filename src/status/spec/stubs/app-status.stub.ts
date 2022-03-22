import { AppStatus } from '../../../status/entities';

export const appStatusStub = (): AppStatus => {
  return {
    status: 'OK',
    message: 'Server is hot',
    environment: 'test',
  };
};
