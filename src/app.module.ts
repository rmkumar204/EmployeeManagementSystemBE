import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrganizationModule } from './organization/organization.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organization } from './organization/entities/organization.entity';
import { LoginModule } from './login/login.module';
import { UsersModule } from './users/users.module';
import { WorkspaceModule } from './workspace/workspace.module';
import { DocumentModule } from './document/document.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:'postgres',
      host:'localhost',
      port:5432,
      username:'postgres',
      password:'400',
      database:'ems',

      entities:[__dirname + '/**/*.entity{.ts,.js}'],
      synchronize:true

    }),
    OrganizationModule,
    LoginModule,
    UsersModule,
    WorkspaceModule,
    DocumentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
