import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  HttpStatus,
  MaxFileSizeValidator,
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
import { Public } from "../decorator/public-route.decorator";
import { CreateStoreDto } from "./dto/create-store.dto";
import { ApiConsumes } from "@nestjs/swagger";

@Controller("store")
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Public()
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
    files: { logo: Express.Multer.File; banner?: Express.Multer.File },
  ) {
    console.log(files);
    return this.storeService.create(files, createStoreDto);
  }

  @Get()
  findAll() {
    return this.storeService.findAll();
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
