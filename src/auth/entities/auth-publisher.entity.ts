import { Publisher } from '../../publisher/schema';
import { AuthToken } from './auth-token.entity';

export type AuthPublisher = Publisher & AuthToken;
