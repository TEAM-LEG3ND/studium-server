import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateApplyFormDto } from './dto/create-apply-form.dto';
import { ApplyForm } from '@prisma/client';
import { CreateApplyFormResponseDto } from './dto/create-apply-form-response.dto';
import { GetApplyFormResponseDto } from './dto/get-apply-form-response.dto';
import { UpdateApplyFormDto } from './dto/update-apply-form.dto';
import { UpdateApplyFormResponseDto } from './dto/update-apply-form-response.dto';

@Injectable()
export class ApplyFormService {
  constructor(private prisma: PrismaService) {}

  async create(createApplyFormDto: CreateApplyFormDto): Promise<CreateApplyFormResponseDto> {
    const { userId, studyId, answers, ...data } = createApplyFormDto;
    const applyForm: ApplyForm = await this.prisma.applyForm.create({
      data: {
        user: { connect: { id: userId } },
        study: { connect: { id: studyId } },
        answers: {
          create: answers.map((answer) => ({
            text: answer.text,
            question: { connect: { id: answer.questionId } },
          })),
        },
        ...data,
      },
      include: {
        answers: true,
        user: true,
        study: true,
      },
    });
    return CreateApplyFormResponseDto.fromApplyForm(applyForm);
  }

  async findAll(): Promise<GetApplyFormResponseDto[]> {
    const applyForms = await this.prisma.applyForm.findMany({
      include: {
        answers: true,
      },
    });
    return applyForms.map((applyForm) => GetApplyFormResponseDto.fromApplyForm(applyForm));
  }

  async findOne(id: number): Promise<GetApplyFormResponseDto> {
    const study = await this.prisma.applyForm.findUnique({
      where: { id },
      include: {
        answers: true,
      },
    });
    return GetApplyFormResponseDto.fromApplyForm(study);
  }

  async update(id: number, updateApplyFormDto: UpdateApplyFormDto): Promise<UpdateApplyFormResponseDto> {
    const { userId, studyId, answers, ...data } = updateApplyFormDto;

    const applyForm = await this.prisma.applyForm.update({
      where: { id },
      data: {
        answers: {
          deleteMany: {},
          create: answers.map((answer) => ({
            text: answer.text,
            question: { connect: { id: answer.questionId } },
          })),
        },
        ...data,
      },
      include: {
        answers: true,
      },
    });

    return UpdateApplyFormResponseDto.fromApplyForm(applyForm);
  }
  async remove(id: number) {
    const applyFormToDelete = await this.prisma.applyForm.findUnique({
      where: { id },
      include: { answers: true }, // Include associated answers
    });
    // Delete associated answers first
    await Promise.all(
      applyFormToDelete.answers.map((answer) => this.prisma.answer.delete({ where: { id: answer.id } })),
    );

    return await this.prisma.applyForm.delete({ where: { id } });
  }
}
