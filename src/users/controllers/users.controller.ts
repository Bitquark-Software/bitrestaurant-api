import { Controller, Get, Post, Body, Param, UseGuards, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto, UpdateUserDto, DeleteUserDto, LoginUserDto } from '../dto/users.dto';
import { JwtAuthGuard } from '../../auth/guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return this.userService.getAllUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userService.getUserByUserId(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('update')
  async update(@Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUsers(updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('delete')
  async remove(@Body() deleteUserDto: DeleteUserDto) {
    return this.userService.deleteUser(deleteUserDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginUserDto) {
    try {
      const result = await this.userService.login(loginDto);
      return result;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
