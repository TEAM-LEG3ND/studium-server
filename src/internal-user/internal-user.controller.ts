import { Controller, Get, Param } from '@nestjs/common';
import { InternalUserService } from './internal-user.service';

@Controller()
export class InternalUserController {
    constructor(private readonly internalUserService: InternalUserService) {}

    @Get()
    findAll() {
        return this.internalUserService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.internalUserService.findOne(+id);
    }
}
