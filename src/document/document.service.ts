import { Injectable,HttpException,HttpStatus } from '@nestjs/common';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { Document } from './entities/document.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class DocumentService {

  constructor(
    @InjectRepository(Document) private documentEntity:Repository<Document>,
  ){}
  async create(createDocumentDto: CreateDocumentDto) {

    await this.documentEntity.query(`INSERT INTO Document(
      d_name,d_w_id) VALUES(
        '${createDocumentDto.document}', 
        ${createDocumentDto.workspace_id} )`);
        throw new HttpException('Success', HttpStatus.CREATED)
  }

  findAll() {
    return `This action returns all document`;
  }

  async findOne(id: number) {
    let result= await this.documentEntity.query(`select 
    d_id as id,
    d_name as document
    from document where d_w_id=${id} and d_isactive=true`)
    if(result){
      return {statusCode:200, message:'Success',data:result};
    }else{
      throw new HttpException('No document exists', HttpStatus.NOT_FOUND);
    }
  }

  async update(id: number, updateDocumentDto: UpdateDocumentDto) {
    await this.documentEntity.query(`UPDATE document
    SET d_name='${updateDocumentDto.document}'
    WHERE d_id=${id}`);
      return {statusCode:200, message:'Success'};
  }

 async remove(id: number) {
    await this.documentEntity.query(`UPDATE document
    SET d_isactive=false
    WHERE d_id=${id}`);

    return {statusCode:200, message:'Success'};
  }
}
