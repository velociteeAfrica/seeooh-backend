import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AppStatus } from './entities';
import { StatusService } from './status.service';

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
