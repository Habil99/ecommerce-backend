import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { ApiBearerAuth } from "@nestjs/swagger";
import { RoleGuard } from "../role/role.guard";
import { Role } from "@prisma/client";
import { Roles } from "../role/role.decorator";

@Controller("categories")
@ApiBearerAuth("bearer-auth")
@UseGuards(RoleGuard)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Roles([Role.ADMIN])
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Roles([Role.ADMIN])
  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Roles([Role.ADMIN])
  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.categoryService.findOne(id);
  }

  @Roles([Role.ADMIN])
  @Get(":id/subcategories")
  findSubcategoriesByParentId(@Param("id", ParseIntPipe) parentId: number) {
    return this.categoryService.findSubcategoriesByParentId(parentId);
  }

  @Roles([Role.ADMIN])
  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Roles([Role.ADMIN])
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.categoryService.remove(id);
  }
}
