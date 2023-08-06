import { Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto'; // You need to define this DTO for the update operation.
import { CreateTagResponseDto } from './dto/create-tag-response.dto';
import { PrismaService } from 'src/database/prisma.service';
import { GetTagResponseDto } from './dto/get-tag-response.dto';
import { UpdateTagResponseDto } from './dto/update-tag-response.dto';

@Injectable()
export class TagService {
  constructor(private prisma: PrismaService) {}

  async create(createTagDto: CreateTagDto): Promise<CreateTagResponseDto> {
    // Check if a tag with the same name already exists
    const tagName = createTagDto.name;
    const existingTag = await this.prisma.tag.findUnique({ where: { name: tagName } });
    if (existingTag) {
      throw new Error('Tag with the same name already exists.');
    }

    const tag = await this.prisma.tag.create({
      data: {
        ...createTagDto,
      },
    });

    return new CreateTagResponseDto(tag);
  }

  async findAll(): Promise<GetTagResponseDto[]> {
    const tags = await this.prisma.tag.findMany();
    return tags.map((tag) => new GetTagResponseDto(tag));
  }

  async findOne(id: number): Promise<GetTagResponseDto> {
    const tag = await this.prisma.tag.findUnique({ where: { id } });
    return new GetTagResponseDto(tag);
  }

  async update(id: number, updateTagDto: UpdateTagDto): Promise<UpdateTagResponseDto> {
    const updatedTag = await this.prisma.tag.update({
      where: { id },
      data: updateTagDto,
    });
    return new UpdateTagResponseDto(updatedTag);
  }

  async remove(id: number) {
    return await this.prisma.tag.delete({ where: { id } });
  }
}
