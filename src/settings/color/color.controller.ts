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
import { ColorService } from "./color.service";
import { ApiBearerAuth } from "@nestjs/swagger";
import { RoleGuard } from "../../role/role.guard";
import { CreateColorDto } from "./dto/create-color.dto";
import { UpdateColorDto } from "./dto/update-color.dto";
import { Roles } from "../../role/role.decorator";
import { Role } from "@prisma/client";

@Controller("settings/colors")
@UseGuards(RoleGuard)
@ApiBearerAuth("bearer-auth")
export class ColorController {
  constructor(private readonly colorService: ColorService) {}

  @Roles([Role.ADMIN])
  @Post()
  create(@Body() data: CreateColorDto) {
    return this.colorService.create(data);
  }

  @Roles([Role.ADMIN])
  @Get()
  findAll() {
    return this.colorService.findAll();
  }

  @Roles([Role.ADMIN])
  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.colorService.findOne(id);
  }

  @Roles([Role.ADMIN])
  @Put(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() data: UpdateColorDto) {
    return this.colorService.update(id, data);
  }

  @Roles([Role.ADMIN])
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.colorService.remove(id);
  }
}
