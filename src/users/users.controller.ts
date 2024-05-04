
import { Controller, Get, Patch, Param, Body, Post, Delete, Request, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/updateUserDto';

export interface IUserRequest {
    user: {
        id: number,
        username: string
    }
}

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get('me')
    findMe(@Request() { user }: IUserRequest) {
        return this.usersService.findUserById(user.id);
    }
    @Patch('me')
    update(@Request() { user }: IUserRequest, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(user.id, updateUserDto);
    }
    @Get('me/wishes')
    getMyWishes(@Request() { user }: IUserRequest) {
        return this.usersService.findWishes(user.username);
    }
    @Get(':username')
    async getByUsername(@Param('username') username: string) {
        const user = await this.usersService.findOne(username);
        if (!user) throw new BadRequestException('Пользователь не найден');
        return user;
    }
    @Get(':username/wishes')
    async getUsersWishes(@Param('username') username: string) {
        return this.usersService.findWishes(username);
    }

    @Post('find')
    async find(@Body() data: { query: string }) {
        return this.usersService.findUsers(data.query);
    }

}
