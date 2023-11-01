import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { RoleGuard } from "../../role/role.guard";
import { Roles } from "../../role/role.decorator";
import { Role } from "@prisma/client";
import { CreateSizeDto } from "./dto/create-size.dto";
import { UpdateSizeDto } from "./dto/update-size.dto";
import { SizeService } from "./size.service";

@Controller("settings/sizes")
@UseGuards(RoleGuard)
@ApiBearerAuth("bearer-auth")
export class SizeController {
  constructor(private readonly sizeService: SizeService) {}

  @Roles([Role.ADMIN])
  @Post()
  create(@Body() data: CreateSizeDto) {
    return this.sizeService.create(data);
  }

  @Roles([Role.ADMIN])
  @Get()
  findAll() {
    return this.sizeService.findAll();
  }

  @Roles([Role.ADMIN])
  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.sizeService.findOne(id);
  }

  @Roles([Role.ADMIN])
  @Put(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() data: UpdateSizeDto) {
    return this.sizeService.update(id, data);
  }

  @Roles([Role.ADMIN])
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.sizeService.remove(id);
  }
}
