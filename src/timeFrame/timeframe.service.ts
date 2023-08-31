import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { GetTimeFrameResponseDto } from './dto/get-timeframe-response.dto';

@Injectable()
export class TimeFrameService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<GetTimeFrameResponseDto[]> {
    const timeFrames = await this.prisma.timeFrame.findMany();
    return timeFrames.map((timeFrame) => GetTimeFrameResponseDto.fromTimeFrame(timeFrame));
  }

  async findOne(id: number): Promise<GetTimeFrameResponseDto> {
    const timeFrame = await this.prisma.timeFrame.findUnique({ where: { id } });
    return GetTimeFrameResponseDto.fromTimeFrame(timeFrame);
  }
}
