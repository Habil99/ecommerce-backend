import { Injectable } from "@nestjs/common";
import { GenericResourceService } from "../../generic-resource/generic-resource.service";
import { CreateSizeDto } from "./dto/create-size.dto";
import { UpdateSizeDto } from "./dto/update-size.dto";
import { SizeDto } from "./dto/size.dto";
import { PrismaService } from "../../service/prisma.service";

@Injectable()
export class SizeService extends GenericResourceService<
  CreateSizeDto,
  UpdateSizeDto,
  SizeDto
> {
  constructor(protected readonly prismaService: PrismaService) {
    super(prismaService);
  }

  protected getEntityName(): any {
    return "color";
  }
}
