import { Controller } from "@nestjs/common";
import { SizeService } from "./size.service";
import { GenericResourceController } from "../../generic-resource/generic-resource.controller";
import { CreateSizeDto } from "./dto/create-size.dto";
import { UpdateSizeDto } from "./dto/update-size.dto";
import { SizeDto } from "./dto/size.dto";
import { ApiBearerAuth } from "@nestjs/swagger";

@Controller("sizes")
@ApiBearerAuth("bearer-auth")
export class SizeController extends GenericResourceController<
  CreateSizeDto,
  UpdateSizeDto,
  SizeDto
> {
  constructor(private readonly sizeService: SizeService) {
    super(sizeService);
  }
}
