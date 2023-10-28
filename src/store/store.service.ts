import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { CreateStoreDto } from "./dto/create-store.dto";
import { UpdateStoreDto } from "./dto/update-store.dto";
import { PrismaService } from "../service/prisma.service";
import { REQUEST } from "@nestjs/core";
import { SessionRequest } from "../model/request.model";
import { CloudinaryService } from "../cloudinary/cloudinary.service";
import { plainToInstance } from "class-transformer";
import { StoreDto } from "./dto/store.dto";

@Injectable()
export class StoreService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly cloudinaryService: CloudinaryService,
    @Inject(REQUEST) private readonly request: SessionRequest,
  ) {}

  async create(
    files: { logo: Express.Multer.File[]; banner?: Express.Multer.File[] },
    createStoreDto: CreateStoreDto,
  ) {
    const { name, address, cityId, countryId } = createStoreDto;
    const { logo, banner } = files;

    let logoUrl: string | undefined, bannerUrl: string | undefined;

    try {
      const logoUploadResponse = await this.cloudinaryService.uploadFile(
        logo[0],
      );
      logoUrl = logoUploadResponse.url;
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }

    if (banner && banner[0]) {
      try {
        const bannerUploadResponse = await this.cloudinaryService.uploadFile(
          banner[0],
        );
        bannerUrl = bannerUploadResponse.url;
      } catch (e) {
        throw new InternalServerErrorException(e.message);
      }
    }

    const store = await this.prismaService.store.create({
      data: {
        name,
        address,
        countryId: +countryId,
        cityId: +cityId,
        logo: logoUrl as string,
        userId: this.request.user.id,
        ...(banner && { banner: bannerUrl }),
      },
    });

    return plainToInstance(StoreDto, store);
  }

  async findAll() {
    const stores = await this.prismaService.store.findMany({
      where: {
        userId: this.request.user.id,
      },
    });

    return plainToInstance(StoreDto, stores);
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
