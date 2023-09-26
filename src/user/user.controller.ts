import { Body, Controller, Get, Post, Patch, Delete, Param, HttpCode } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ACCESS_TOKEN } from '../config/swagger-config';
import { UniversalAccountId, UniversalAccountIdHeader } from '../common/account/universal-account-id.decorator';
import { SwaggerUniversalAccountId } from '../config/decorator/swagger-universal-account-id.decorator';

@Controller()
@ApiBearerAuth(ACCESS_TOKEN)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('check-nickname/:nickname')
  checkNickname(@Param('nickname') nickname: string) {
    return this.userService.checkNickname(nickname);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Post()
  @SwaggerUniversalAccountId()
  create(@UniversalAccountIdHeader() accountId: UniversalAccountId, @Body() createUserDto: CreateUserDto) {
    return this.userService.create(accountId, createUserDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
