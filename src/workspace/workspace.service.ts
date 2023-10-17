import { Injectable,HttpException,HttpStatus } from '@nestjs/common';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';
import { Workspace } from './entities/workspace.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class WorkspaceService {

  constructor(
    @InjectRepository(Workspace) private workspaceEntity:Repository<Workspace>,
  ){}
  async create(createWorkspaceDto: CreateWorkspaceDto) {
    await this.workspaceEntity.query(`INSERT INTO workspace(
      w_name,w_u_id) VALUES(
        '${createWorkspaceDto.workspace}', 
        ${createWorkspaceDto.user_id} )`);
        throw new HttpException('Success', HttpStatus.CREATED)
  }

  findAll() {
    return `This action returns all workspace`;
  }

  async findOne(id: number) {
    let result= await this.workspaceEntity.query(`select 
    w_id as id,
    w_name as workspace
    from workspace where w_u_id=${id} and w_isactive=true`)
    if(result){
      return {statusCode:200, message:'Success',data:result};
    }else{
      throw new HttpException('No workspace exists', HttpStatus.NOT_FOUND);
    }
  }


  async update(id: number, updateWorkspaceDto: UpdateWorkspaceDto) {
      await this.workspaceEntity.query(`UPDATE workspace
   SET w_name='${updateWorkspaceDto.workspace}'
   WHERE w_id=${id}`);
     return {statusCode:200, message:'Success'};
  }

 async remove(id: number) {
    await this.workspaceEntity.query(`UPDATE workspace
    SET w_isactive=false
    WHERE w_id=${id}`);

    return {statusCode:200, message:'Success'};
  }
}
