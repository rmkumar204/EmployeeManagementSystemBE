import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { Organization } from './entities/organization.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class OrganizationService {

  constructor(
    @InjectRepository(Organization) private organizationEntity:Repository<Organization>
  ){}
 async create(createOrganizationDto: CreateOrganizationDto) {
  const hashedpassword= await bcrypt.hash(createOrganizationDto.org_password,10)
      await this.organizationEntity.query(`
      INSERT INTO organization(org_name,org_terms_cond,org_password) VALUES(
        '${createOrganizationDto.org_name}',
        ${createOrganizationDto.org_terms_cond},
        '${hashedpassword}'
        )`);
        throw new HttpException('Success', HttpStatus.CREATED)
    // return {statusCode:201, message:'Organization Details added'};
  }

  findAll() {
    return `This action returns all organization`;
  }

  findOne(id: number) {
    return `This action returns a #${id} organization`;
  }

  update(id: number, updateOrganizationDto: UpdateOrganizationDto) {
    return `This action updates a #${id} organization`;
  }

  remove(id: number) {
    return `This action removes a #${id} organization`;
  }
}
