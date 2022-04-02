import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/decorator';
import { AppStatus } from './entities';
import { StatusService } from './status.service';

@Public()
@ApiTags('application status')
@Controller('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @ApiOkResponse({
    type: AppStatus,
    description: 'check the status of the server',
  })
  @Get()
  getAppStatus(): AppStatus {
    return this.statusService.getAppStatus();
  }
}
