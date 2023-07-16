import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateApplyFormDto } from './dto/create-apply-form.dto';
import { ApplyForm } from '@prisma/client';

@Injectable()
export class ApplyFormService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.applyForm.findMany();
  }

  async findById(id: number): Promise<ApplyForm> {
    const applyForm = await this.prisma.applyForm.findUnique({
      where: { id },
      include: { user: true, study: true },
    });
    return applyForm;
  }

  async create(applyFormCreateDto: CreateApplyFormDto): Promise<ApplyForm> {
    const applyForm = await this.prisma.applyForm.create({
      data: { ...applyFormCreateDto },
      include: { user: true, study: true },
    });
    return applyForm;
  }

  async update(id: number, data: CreateApplyFormDto): Promise<ApplyForm> {
    const applyForm = await this.prisma.applyForm.update({
      where: { id },
      data,
      //   include: { user: true, study: true },
    });
    return applyForm;
  }

  async deleteById(id: number): Promise<void> {
    const applyForm = await this.findById(id);
    if (applyForm) {
      await this.prisma.applyForm.delete({ where: { id } });
    }
  }
}
