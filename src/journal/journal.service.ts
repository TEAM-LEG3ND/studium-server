import { InternalServerErrorException, BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { GetJournalResponseDto } from './dto/get-journal-response.dto';
import { StudiumException } from 'src/common/studium-exception';

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
}
