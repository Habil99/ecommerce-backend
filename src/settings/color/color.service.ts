import { Injectable } from "@nestjs/common";
import { GenericResourceService } from "../../generic-resource/generic-resource.service";
import { Color } from "@prisma/client";
import { PrismaService } from "../../service/prisma.service";

@Injectable()
export class ColorService extends GenericResourceService<Color> {
  constructor(protected readonly prismaService: PrismaService) {
    super(prismaService);
  }

  protected getEntityName(): string {
    return "color";
  }
}
