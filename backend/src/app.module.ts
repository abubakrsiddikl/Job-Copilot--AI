import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import appConfig from "./config/app.config";
import { AuthModule } from "./module/auth/auth.module.js";
import { JobApplicationModule } from './job-application/job-application.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
    }),
    AuthModule,
    JobApplicationModule,
  ],
})
export class AppModule {}
