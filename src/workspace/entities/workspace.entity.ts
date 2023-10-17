import { Column, Entity, PrimaryGeneratedColumn,CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "src/users/entities/user.entity";

@Entity('workspace')
export class Workspace {
    @PrimaryGeneratedColumn({type:'bigint'})
    w_id:Number;

    @Column()
    w_name:String;

    @CreateDateColumn()
    w_created_at:Date;

    @UpdateDateColumn()
    w_modified_at:Date;

    @ManyToOne(()=>User)
    @JoinColumn({name:'w_u_id' })
    u_id:User;

    @Column({default:true})
    w_isactive:Boolean;
}
