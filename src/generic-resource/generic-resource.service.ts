// @ts-nocheck
import { PrismaService } from "../service/prisma.service";

export abstract class GenericResourceService<TModel> {
  protected constructor(private readonly prisma: PrismaService) {}

  create(data: TModel) {
    return this.prisma[this.getEntityName()].create({ data });
  }

  findAll() {
    return this.prisma[this.getEntityName()].findMany();
  }

  findOne(id: number) {
    return this.prisma[this.getEntityName()].findUnique({ where: { id } });
  }

  update(id: number, data: TModel) {
    return this.prisma[this.getEntityName()].update({
      where: { id },
      data,
    });
  }

  remove(id: number) {
    return this.prisma[this.getEntityName()].delete({ where: { id } });
  }

  protected abstract getEntityName(): any;
}
