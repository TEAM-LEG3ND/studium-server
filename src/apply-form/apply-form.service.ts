import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateApplyFormDto } from './dto/create-apply-form.dto';
import { ApplyForm } from '@prisma/client';
import { CreateApplyFormResponseDto } from './dto/create-apply-form-response.dto';
import { GetApplyFormResponseDto } from './dto/get-apply-form-response.dto';

@Injectable()
export class ApplyFormService {
  constructor(private prisma: PrismaService) {}

  async create(createApplyFormDto: CreateApplyFormDto): Promise<CreateApplyFormDto> {
    const applyForm: ApplyForm = await this.prisma.applyForm.create({
      data: {
        ...createApplyFormDto,
      },
    });

    return CreateApplyFormResponseDto.fromApplyForm(applyForm);
  }
  async findAll(): Promise<GetApplyFormResponseDto[]> {
    const applyForms = await this.prisma.applyForm.findMany();
    return applyForms.map((applyForm) => GetApplyFormResponseDto.fromApplyForm(applyForm));
  }

  /*
  async create(CreateApplyFormDto: CreateApplyFormDto): Promise<ApplyForm> {
    const applyForm = await this.prisma.applyForm.create({
      data: { ...CreateApplyFormDto },
      include: { user: true, study: true },
    });
    return applyForm;
  }

  

  async findById(id: number): Promise<ApplyForm> {
    const applyForm = await this.prisma.applyForm.findUnique({
      where: { id },
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
  }*/
}
