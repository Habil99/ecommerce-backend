// @ts-nocheck
import { PrismaService } from "../service/prisma.service";

export abstract class GenericResourceService<TModel> {
  protected constructor(private readonly prisma: PrismaService) {}

  async create(data: TModel) {
    return this.prisma[this.getEntityName()].create({ data });
  }

  async findAll() {
    return this.prisma[this.getEntityName()].findMany();
  }

  async findOne(id: number) {
    return this.prisma[this.getEntityName()].findUnique({ where: { id } });
  }

  async update(id: number, data: TModel) {
    return this.prisma[this.getEntityName()].update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return this.prisma[this.getEntityName()].delete({ where: { id } });
  }

  protected abstract getEntityName(): any;
}
