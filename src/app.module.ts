import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { ScheduleModule } from "@nestjs/schedule";
import { StoreModule } from "./store/store.module";
import { CloudinaryModule } from "./cloudinary/cloudinary.module";
import { CountryModule } from "./country/country.module";
import { ColorModule } from './settings/color/color.module';
import { SizeModule } from './settings/size/size.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    ScheduleModule.forRoot(),
    StoreModule,
    CloudinaryModule,
    CountryModule,
    ColorModule,
    SizeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
