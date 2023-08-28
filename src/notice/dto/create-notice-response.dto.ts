import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsDate, IsString } from 'class-validator';
import { Notice } from '@prisma/client';

export class CreateNoticeResponseDto {
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
    readonly content: String;

    @ApiProperty()
    @IsNumber()
    readonly studyId: number;

    constructor(id: number, createdAt: Date, updatedAt: Date, content: string, studyId: number) {
        this.id = id;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.content = content;
        this.studyId = studyId;
    }

    static fromNotice(notice: Notice) {
        return new CreateNoticeResponseDto(notice.id, notice.createdAt, notice.updatedAt, notice.content, notice.studyId);
    }
}