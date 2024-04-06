import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/users.dto';
import { plainToClass } from 'class-transformer'; 

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Post() 
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> { 
    const user = plainToClass(User, createUserDto); 
    return this.userService.createUser(user);
  }
}
