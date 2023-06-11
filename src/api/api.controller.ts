import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';

@Controller('api')
export class ApiController {
    constructor(private readonly userService: UserService) {}

    @Post(`user`)
    async createUser(@Body() data: {  
        manners: number; 
        study_joined: string[]; 
        membersOf: string[]; 
        recruitArticles: string[]; 
        applyForms: string[]; 
    }) {
        const { manners, study_joined, membersOf, recruitArticles, applyForms } = data;
        const studyIdArray = [Number(study_joined)];
        const membersIdArray = [Number(membersOf)];
        const recruitIdArray = [Number(recruitArticles)];
        const applyFormIdArray = [Number(applyForms)];
        return this.userService.createUser({
        manners,
        study_joined: studyIdArray,
        membersOf : membersIdArray,
        recruitArticles : recruitIdArray,
        applyForms : applyFormIdArray,
        });
    }

    @Get('user')
    getUsers(){
        return this.userService.getUsers();
    }


}