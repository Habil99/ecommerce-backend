import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { ScheduleModule } from "@nestjs/schedule";
import { StoreModule } from './store/store.module';

@Module({
  imports: [AuthModule, UserModule, ScheduleModule.forRoot(), StoreModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
