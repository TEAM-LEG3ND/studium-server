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
    try {
      const { userId, studyId, answers, timeFrames, ...data } = createApplyFormDto;
      console.log('timeFrames:', timeFrames);
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
          timeFrames: {
            create: timeFrames.map((timeFrame) => ({
              start: timeFrame.start,
              end: timeFrame.end,
            })),
          },
          ...data,
        },
        include: {
          answers: true,
          user: true,
          study: true,
          timeFrames: true,
        },
      });
      return CreateApplyFormResponseDto.fromApplyForm(applyForm);
    } catch (error) {
      // Handle errors and return appropriate response
      console.error('Error creating apply form:', error);
    }
  }

  async findAll(): Promise<GetApplyFormResponseDto[]> {
    const applyForms = await this.prisma.applyForm.findMany({
      include: {
        answers: true,
        timeFrames: true,
      },
    });
    return applyForms.map((applyForm) => GetApplyFormResponseDto.fromApplyForm(applyForm));
  }

  async findOne(id: number): Promise<GetApplyFormResponseDto> {
    const study = await this.prisma.applyForm.findUnique({
      where: { id },
      include: {
        answers: true,
        timeFrames: true,
      },
    });
    return GetApplyFormResponseDto.fromApplyForm(study);
  }

  async update(id: number, updateApplyFormDto: UpdateApplyFormDto): Promise<UpdateApplyFormResponseDto> {
    const { userId, studyId, answers, timeFrames, ...data } = updateApplyFormDto;

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
        timeFrames: {
          deleteMany: {},
          create: timeFrames.map((timeFrame) => ({
            start: timeFrame.start,
            end: timeFrame.end,
            applyFormId: id, // Set the applyFormId to the current applyForm's id
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
