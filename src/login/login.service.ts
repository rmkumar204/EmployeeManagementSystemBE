import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateLoginDto } from './dto/create-login.dto';
import { UpdateLoginDto } from './dto/update-login.dto';
import { Organization } from 'src/organization/entities/organization.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';


@Injectable()
export class LoginService {

constructor(
  @InjectRepository(Organization) private organizationEntity:Repository<Organization>
){}
  async validateUser(userData: any): Promise<any> {
   const user = await this.checkUserExists(userData.org_name);
   if (!user) {
    throw new HttpException('No Such Users Found', HttpStatus.NOT_FOUND);
}
const isValid = await bcrypt.compare(userData.org_password,user['org_password'] );
let errorMsg = 'Invalid Password';
if(!isValid){
  throw new HttpException(errorMsg, HttpStatus.UNAUTHORIZED);
}
else{
  let userDetails=await this.organizationEntity.query(`select org_id,org_name from organization where org_name='${userData.org_name}'`)
  return {statusCode:201, message:'Success', data:userDetails[0]};
}
 
}
async checkUserExists(org_name) {
  const user = await this.organizationEntity.query(`select * from organization where org_name='${org_name}'`)
  if (user) {
      user['is_user'] = true;
      return user[0];
  }
}

  findAll() {
    return `This action returns all login`;
  }

  findOne(id: number) {
    return `This action returns a #${id} login`;
  }

  update(id: number, updateLoginDto: UpdateLoginDto) {
    return `This action updates a #${id} login`;
  }

  remove(id: number) {
    return `This action removes a #${id} login`;
  }
}
