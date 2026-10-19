import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
} from "@nestjs/common";
// import { JobApplicationService } from "./job-application.service.js";
import {JobApplicationService} from "./job-application.service";
import { CreateJobApplicationDto } from "./dto/create-job-application.dto.js";
import { UpdateJobApplicationDto } from "./dto/update-job-application.dto.js";

@Controller("job-application")
export class JobApplicationController {
  constructor(
    // @Inject(JobApplicationService)
    private readonly jobApplicationService: JobApplicationService,
  ) {}

  @Post()
  create(@Body() createJobApplicationDto: CreateJobApplicationDto) {
    return this.jobApplicationService.create(createJobApplicationDto);
  }

  @Get()
  findAll() {
    return this.jobApplicationService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.jobApplicationService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateJobApplicationDto: UpdateJobApplicationDto,
  ) {
    return this.jobApplicationService.update(+id, updateJobApplicationDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.jobApplicationService.remove(+id);
  }
}
