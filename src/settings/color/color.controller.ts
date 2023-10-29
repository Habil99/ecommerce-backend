import { Controller } from "@nestjs/common";
import { ColorService } from "./color.service";
import { Color } from "@prisma/client";
import { GenericResourceController } from "../../generic-resource/generic-resource.controller";
import { ApiBearerAuth } from "@nestjs/swagger";

@Controller("colors")
@ApiBearerAuth("bearer-auth")
export class ColorController extends GenericResourceController<Color> {
  constructor(private readonly colorService: ColorService) {
    super(colorService);
  }
}
