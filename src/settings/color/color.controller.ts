import { Controller } from "@nestjs/common";
import { ColorService } from "./color.service";
import { GenericResourceController } from "../../generic-resource/generic-resource.controller";
import { ApiBearerAuth } from "@nestjs/swagger";
import { CreateColorDto } from "./dto/create-color.dto";
import { UpdateColorDto } from "./dto/update-color.dto";
import { ColorDto } from "./dto/color.dto";

@Controller("colors")
@ApiBearerAuth("bearer-auth")
export class ColorController extends GenericResourceController<
  CreateColorDto,
  UpdateColorDto,
  ColorDto
> {
  constructor(private readonly colorService: ColorService) {
    super(colorService);
  }
}
