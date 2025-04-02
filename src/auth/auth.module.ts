import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersService } from '../users/users.service';
import { JwtStrategy } from 'src/config/jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'yourSecretKey', // Sử dụng biến môi trường cho secret
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [JwtStrategy, UsersService],
  exports: [JwtModule],
})
export class AuthModule {}
