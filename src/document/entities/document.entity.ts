import { Column, Entity, PrimaryGeneratedColumn,CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { Workspace } from "src/workspace/entities/workspace.entity";

@Entity('document')
export class Document {
      @PrimaryGeneratedColumn({type:'bigint'})
    d_id:Number;

    @Column()
    d_name:String;

    @CreateDateColumn()
    d_created_at:Date;

    @UpdateDateColumn()
    d_modified_at:Date;

    @ManyToOne(()=>Workspace)
    @JoinColumn({name:'d_w_id' })
    w_id:Workspace;

    @Column({default:true})
    d_isactive:Boolean;
}
