import { Controller, Get, Param } from '@nestjs/common';
import { JournalService } from './journal.service';

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
}
