import { Controller, Get } from '@nestjs/common';
import { InternalUserService } from './internal-user.service';

@Controller()
export class InternalUserController {
    constructor(private readonly internalUserService: InternalUserService) {}

    @Get()
    findAll() {
        return;
    }
}
