import { Controller, Get, Param, Post, Patch, Delete, Body } from '@nestjs/common';
import { JournalService } from './journal.service';
import { UpdateJournalDto } from './dto/update-journal.dto';
import { CreateJournalDto } from './dto/create-journal.dto';

@Controller()
export class JournalController {
    constructor(private readonly journalService: JournalService) {}

    @Get()
    findAll() {
        return this.journalService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.journalService.findOne(+id);
    }

    @Post()
    create(@Body() createJournalDto: CreateJournalDto) {
        return this.journalService.create(createJournalDto);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateJournalDto: UpdateJournalDto) {
        return this.journalService.update(+id, updateJournalDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.journalService.remove(+id);
    }
}
