import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto, UpdateUserDto, DeleteUserDto } from '../dto/users.dto';
import { LoginUserDto } from '../dto/users.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async getUserByUserEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }

  async getUserByUserId(id: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { id } });
  }

  async updateUsers(updateUserDto: UpdateUserDto): Promise<void> {
    await this.userRepository.update(updateUserDto.id, updateUserDto);
  }

  async deleteUser(deleteUserDto: DeleteUserDto): Promise<void> {
    await this.userRepository.delete(deleteUserDto.id);
  }

  async login(loginDto: LoginUserDto): Promise<{ token: string }> {
    const { email, password } = loginDto;
    const user = await this.findOneByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: user.email, sub: user.id }; 
    const token = this.jwtService.sign(payload); 

    return { token };
  }

  private async findOneByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }
}
