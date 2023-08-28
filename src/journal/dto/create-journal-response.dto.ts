import { ApiProperty } from '@nestjs/swagger';
import { Journal } from '@prisma/client';
import { IsNumber, IsDate, IsString } from 'class-validator';

export class CreateJournalResponseDto {
    @ApiProperty()
    @IsNumber()
    readonly id: number;

    @ApiProperty()
    @IsDate()
    readonly createdAt: Date;
    
    @ApiProperty()
    @IsDate()
    readonly updatedAt: Date;

    @ApiProperty()
    @IsString()
    readonly title: String;

    @ApiProperty()
    @IsString()
    readonly content: String;

    @ApiProperty()
    @IsString()
    readonly authorId: number;

    constructor(id: number, createdAt: Date, updatedAt: Date, title: string, content: string, authorId: number) {
        this.id = id;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.title = title;
        this.content = content;
        this.authorId = authorId;
    }

    static fromJournal(journal: Journal) {
        return new CreateJournalResponseDto(journal.id, journal.createdAt, journal.updatedAt, journal.title, journal.content, journal.authorId);
    }
}