import { Module } from '@nestjs/common';
import { JobApplicationService } from './job-application.service.js';
import { JobApplicationController } from './job-application.controller.js';

@Module({
  controllers: [JobApplicationController],
  providers: [JobApplicationService],
})
export class JobApplicationModule {}
