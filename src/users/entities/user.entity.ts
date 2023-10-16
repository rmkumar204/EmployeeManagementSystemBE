import { Organization } from "src/organization/entities/organization.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn({type:'bigint'})
    u_id:Number;

    @Column()
    u_firstname:String;

    @Column()
    u_lastname:String;

    @Column()
    u_email:String;

    @Column()
    u_dob:Date;

    @Column()
    u_gender:String;

    @CreateDateColumn()
    u_created_at:Date;

    @UpdateDateColumn()
    u_modified_at:Date;

    @ManyToOne(()=>Organization)
    @JoinColumn({name:'u_org_id' })
    org_id:Organization;

    @Column({default:true})
    u_isactive:Boolean;
}
