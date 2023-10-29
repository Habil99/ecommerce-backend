import { Controller } from "@nestjs/common";
import { ColorService } from "./color.service";
import { GenericResourceService } from "../../generic-resource/generic-resource.service";
import { Color } from "@prisma/client";
import { GenericResourceController } from "../../generic-resource/generic-resource.controller";

@Controller("colors")
export class ColorController extends GenericResourceController<Color> {
  constructor(private readonly colorService: ColorService) {
    super(colorService);
  }
}
