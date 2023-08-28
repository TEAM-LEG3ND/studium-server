import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateJournalDto {
    @ApiProperty()
    @IsString()
    readonly title: string;

    @ApiProperty()
    @IsString()
    readonly content: string;

    @ApiProperty()
    @IsNumber()
    readonly authorId: number;
}
