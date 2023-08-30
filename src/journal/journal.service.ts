import { InternalServerErrorException, BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { GetJournalResponseDto } from './dto/get-journal-response.dto';
import { StudiumException } from 'src/common/studium-exception';
import { CreateJournalResponseDto } from './dto/create-journal-response.dto';
import { UpdateJournalDto } from './dto/update-journal.dto';
import { CreateJournalDto } from './dto/create-journal.dto';
import { UpdateJournalResponseDto } from './dto/update-journal-response.dto';

@Injectable()
export class JournalService {
    constructor(private prisma: PrismaService) {}

    async findAll(): Promise<GetJournalResponseDto[]> {
        const journals = await this.prisma.journal.findMany();
        return journals.map((journal) => GetJournalResponseDto.fromJournal(journal));
    }

    async findOne(id: number): Promise<GetJournalResponseDto> {
        if (isNaN(id)) {
            throw new BadRequestException(StudiumException.idFormatError);
        }

        const journal = await this.prisma.journal.findUnique({
            where: { id },
        });

        if (!journal) {
            throw new InternalServerErrorException(StudiumException.dataNotFound);
        }

        return GetJournalResponseDto.fromJournal(journal);
    }

    async create(createJournalDto: CreateJournalDto): Promise<CreateJournalResponseDto> {
        const {authorId, studyId, ...data} = createJournalDto;
        const journal = await this.prisma.journal.create({
            data: {
                author: { connect: { id: authorId } },
                study: { connect: {id: studyId } },
                ...data,
            },
            include: {
                author: true,
                study: true,
            }
        });
        return CreateJournalResponseDto.fromJournal(journal);
    }

    async update(id: number, updateJournalDto: UpdateJournalDto) {
        const { authorId, studyId, ...data } = updateJournalDto;
        const journal = await this.prisma.journal.update({
            where: { id },
            data: {
                ...data,
            }
        });
        return UpdateJournalResponseDto.fromJournal(journal);
    }

    async remove(id: number) {
        const journalToDelete = await this.findOne(id);
        return await this.prisma.journal.delete({ where: { id: journalToDelete.id } });
    }
}
