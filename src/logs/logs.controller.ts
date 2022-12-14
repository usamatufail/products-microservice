import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthorizationGuard, Role, Roles, RolesGuard } from '../common';
import { LogsService } from './logs.service';
import { LogDocument } from './schema';

@ApiTags('Analytics')
@ApiBearerAuth()
@Roles(Role.ADMIN)
@UseGuards(AuthorizationGuard, RolesGuard)
@Controller('analytics')
export class LogsController {
  constructor(private readonly logService: LogsService) {}

  @Get()
  getAll(): Promise<LogDocument[]> {
    return this.logService.getAll();
  }
}
