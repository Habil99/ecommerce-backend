import {
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
  ParseIntPipe,
} from "@nestjs/common";
import { GenericResourceService } from "./generic-resource.service";

export class GenericResourceController<T> {
  constructor(private readonly service: GenericResourceService<T>) {}

  @Post()
  create(@Body() data: T) {
    return this.service.create(data);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Put(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() data: T) {
    return this.service.update(id, data);
  }

  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
