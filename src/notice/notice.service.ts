import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { GetNoticeResponseDto } from './dto/get-notice-response.dto';
import { CreateNoticeResponseDto } from './dto/create-notice-response.dto';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { UpdateNoticeDto } from './dto/update-notice.dto';
import { UpdateNoticeResponseDto } from './dto/update-notice-response.dto';
import { StudiumException } from 'src/common/studium-exception';

@Injectable()
export class NoticeService {
    constructor(private prisma: PrismaService) {}

    async findAll(): Promise<GetNoticeResponseDto[]> {
        const notices = await this.prisma.notice.findMany();
        return notices.map((notice) => GetNoticeResponseDto.fromNotice(notice));
    }

    async findOne(id: number): Promise<GetNoticeResponseDto> {
        if (isNaN(id)) {
            throw new BadRequestException(StudiumException.idFormatError);
        }
        const notice = await this.prisma.notice.findUnique({ where: { id } }) 

        if (!notice) {
            throw new InternalServerErrorException(StudiumException.dataNotFound);
        }

        return GetNoticeResponseDto.fromNotice(notice);
    }

    async create(createNoticeDto: CreateNoticeDto): Promise<CreateNoticeResponseDto> {
        const {studyId, ...data} = createNoticeDto;
        const notice = await this.prisma.notice.create({
            data: {
                study: { connect: {id: studyId } },
                ...data
            },
            include: {
                study: true,
            }
        });
        return CreateNoticeResponseDto.fromNotice(notice);
    }

    async update(id: number, updateNoticeDto: UpdateNoticeDto): Promise<UpdateNoticeResponseDto> {
        const { studyId, ...data } = updateNoticeDto;

        const notice = await this.prisma.notice.update({
            where: { id },
            data: {
                ...data
            }
        });

        return UpdateNoticeResponseDto.fromNotice(notice);
    }

    async remove(id: number) {
        const noticeToDelete = await this.findOne(id);
        return await this.prisma.notice.delete({ where: { id: noticeToDelete.id } });
    }
}
