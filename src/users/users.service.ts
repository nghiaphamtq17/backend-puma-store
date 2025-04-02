/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async create(
    createUserDto: CreateUserDto,
  ): Promise<{ user: UserEntity; token: string }> {
    const existingUser =
      (await this.findByPhoneOrEmail(createUserDto.phone)) ||
      (await this.findByPhoneOrEmail(createUserDto.email));
    if (existingUser) {
      throw new UnauthorizedException(
        'User with this phone or email already exists',
      );
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    // Tạo token
    const payload = { username: user.email, sub: user.id };
    const token = this.jwtService.sign(payload);
    const newUser = await this.usersRepository.save(user);

    return { user: newUser, token };
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.usersRepository.find();
  }

  async findOne(id: string): Promise<UserEntity> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }
  async findByPhoneOrEmail(phoneOrEmail: string): Promise<UserEntity | null> {
    return await this.usersRepository.findOne({
      where: [{ phone: phoneOrEmail }, { email: phoneOrEmail }],
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    await this.usersRepository.update(id, updateUserDto);
    return await this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await this.usersRepository.remove(user);
  }

  async login(loginDto: LoginDto) {
    const user = await this.findByPhoneOrEmail(loginDto.user);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Tạo token
    const payload = { username: user.email, sub: user.id };
    const token = this.jwtService.sign(payload);

    // Remove password from response
    const { password, ...result } = user;
    return { user: { ...result }, token };
  }
}
