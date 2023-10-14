import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrganizationModule } from './organization/organization.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organization } from './organization/entities/organization.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:'postgres',
      host:'localhost',
      port:5432,
      username:'postgres',
      password:'400',
      database:'ems',

      entities:[Organization],
      synchronize:true

    }),
    OrganizationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
