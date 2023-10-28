import { Controller, Get, Param, ParseIntPipe } from "@nestjs/common";
import { CountryService } from "./country.service";
import { Public } from "../decorator/public-route.decorator";

@Controller("countries")
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Public()
  @Get()
  findAllCountries() {
    return this.countryService.findAllCountries();
  }

  @Public()
  @Get(":id")
  findCountryById(@Param("id", ParseIntPipe) id: number) {
    return this.countryService.findCountryById(id);
  }

  @Public()
  @Get(":countryId/cities")
  findCitiesByCountryId(@Param("countryId", ParseIntPipe) countryId: number) {
    return this.countryService.findCitiesByCountryId(countryId);
  }

  @Public()
  @Get(":countryId/cities/:cityId")
  findCityByCountryIdAndCityId(
    @Param("countryId", ParseIntPipe) countryId: number,
    @Param("cityId", ParseIntPipe) cityId: number,
  ) {
    return this.countryService.findCityByCountryIdAndCityId(countryId, cityId);
  }
}
