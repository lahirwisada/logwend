import { Module } from '@nestjs/common';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { userEntity } from './user/models/user.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([userEntity])
  ],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}
