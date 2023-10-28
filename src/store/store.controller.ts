import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common";
import { StoreService } from "./store.service";
import { UpdateStoreDto } from "./dto/update-store.dto";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { CreateStoreDto } from "./dto/create-store.dto";
import { ApiBearerAuth, ApiConsumes } from "@nestjs/swagger";

@ApiBearerAuth("bearer-auth")
@Controller("stores")
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @UseInterceptors(
    FileFieldsInterceptor([
      { name: "logo", maxCount: 1 },
      { name: "banner", maxCount: 1 },
    ]),
  )
  @ApiConsumes("multipart/form-data")
  @Post()
  async create(
    @Body() createStoreDto: CreateStoreDto,
    @UploadedFiles(
      new ParseFilePipe({
        fileIsRequired: true,
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        validators: [
          // new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 2 }), // 2MB
          // new FileTypeValidator({ fileType: /image\/(png|jpg|jpeg|webp)/ }),
        ],
      }),
    )
    files: { logo: Express.Multer.File[]; banner?: Express.Multer.File[] },
  ) {
    return this.storeService.create(files, createStoreDto);
  }

  @Get()
  async findAll() {
    return await this.storeService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.storeService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateStoreDto: UpdateStoreDto) {
    return this.storeService.update(+id, updateStoreDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.storeService.remove(+id);
  }
}
