import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organization } from 'src/organization/entities/organization.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Organization])],
  controllers: [LoginController],
  providers: [LoginService]
})
export class LoginModule {}
