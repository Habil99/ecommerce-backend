import { Injectable } from "@nestjs/common";
import { GenericResourceService } from "../../generic-resource/generic-resource.service";
import { PrismaService } from "../../service/prisma.service";
import { CreateColorDto } from "./dto/create-color.dto";
import { UpdateColorDto } from "./dto/update-color.dto";
import { ColorDto } from "./dto/color.dto";

@Injectable()
export class ColorService extends GenericResourceService<
  CreateColorDto,
  UpdateColorDto,
  ColorDto
> {
  constructor(protected readonly prismaService: PrismaService) {
    super(prismaService);
  }

  protected getEntityName(): string {
    return "color";
  }
}
