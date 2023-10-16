import { Injectable ,HttpException,HttpStatus} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private userEntity:Repository<User>
  ){}
 async create(createUserDto: CreateUserDto) {
    await this.userEntity.query(`INSERT INTO users(
      u_firstname,u_lastname,u_email,u_dob,u_gender,u_org_id) VALUES(
        '${createUserDto.firstname}', 
        '${createUserDto.lastname}',
        '${createUserDto.email}',
        '${createUserDto.dob}' ,
        '${createUserDto.gender}',
        ${createUserDto.org_id} )`);
        throw new HttpException('Success', HttpStatus.CREATED)
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: number) {
    let result= await this.userEntity.query(`select 
    u_id as id,
    u_firstname as firstname,
    u_lastname as lastname,
    u_dob as dob,
    u_gender as gender,
    u_email as email
    from users where u_org_id=${id} and u_isactive=true`)
    if(result){
      return {statusCode:200, message:'Success',data:result};
    }else{
      throw new HttpException('No users exists', HttpStatus.NOT_FOUND);
    }
  }

 async  update(id: number, updateUserDto: UpdateUserDto) {
     await this.userEntity.query(`UPDATE users
   SET u_firstname='${updateUserDto.firstname}',
   u_lastname='${updateUserDto.lastname}',
   u_email='${updateUserDto.email}',
   u_dob='${updateUserDto.dob}',
   u_gender='${updateUserDto.gender}'
   WHERE u_id=${id}`);
     return {statusCode:200, message:'Success'};
  }

  async remove(id: number) {
   await this.userEntity.query(`UPDATE users
   SET u_isactive=false
   WHERE u_id=${id}`);

   return {statusCode:200, message:'Success'};
  }
}
