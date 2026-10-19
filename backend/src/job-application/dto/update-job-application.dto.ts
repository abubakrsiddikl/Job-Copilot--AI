import { PartialType } from '@nestjs/mapped-types';
import { CreateJobApplicationDto } from './create-job-application.dto.js';

export class UpdateJobApplicationDto extends PartialType(CreateJobApplicationDto) {}
