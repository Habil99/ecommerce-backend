import { Inject, Injectable } from "@nestjs/common";
import { CreateStoreDto } from "./dto/create-store.dto";
import { UpdateStoreDto } from "./dto/update-store.dto";
import { PrismaService } from "../service/prisma.service";
import { REQUEST } from "@nestjs/core";
import { SessionRequest } from "../model/request.model";

@Injectable()
export class StoreService {
  constructor(
    private readonly prismaService: PrismaService,
    @Inject(REQUEST) private readonly request: SessionRequest,
  ) {}

  async create(
    files: { logo: Express.Multer.File; banner?: Express.Multer.File },
    createStoreDto: CreateStoreDto,
  ) {
    const { name, address, cityId, countryId } = createStoreDto;
    const { logo, banner } = files;
    return "This action adds a new store";
  }

  findAll() {
    return `This action returns all store`;
  }

  findOne(id: number) {
    return `This action returns a #${id} store`;
  }

  update(id: number, updateStoreDto: UpdateStoreDto) {
    return `This action updates a #${id} store`;
  }

  remove(id: number) {
    return `This action removes a #${id} store`;
  }
}
