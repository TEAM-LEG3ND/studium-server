import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User, Study, Member, RecruitArticle, ApplyForm } from '@prisma/client';

@Injectable()
export class UserService {
    constructor(private repository: UserRepository) {}

    async createUser(
        params: { 
            manners: User['manners'];
            study_joined?: Study[`id`][];
            membersOf?: Member['id'][];
            recruitArticles?: RecruitArticle['id'][];
            applyForms?: ApplyForm['id'][] 
        }) 
        {
        // call repository layer
        /* initialize manners as 0 and everything else as blank arrays */
        const user = await this.repository.createUser({
          data: {
            manners : 0,
            study_joined: undefined,
            membersOf: undefined,
            recruitArticles: undefined,
            applyForms: undefined,
          },
        });
    
        return user;
      }
    
    async getUsers() {
        const users = await this.repository.getUsers({});
        return users;
    }
}