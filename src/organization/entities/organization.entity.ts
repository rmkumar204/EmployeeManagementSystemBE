import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('organization')
export class Organization {
    @PrimaryGeneratedColumn({type:'bigint'})
    org_id:Number;

    @Column()
    org_name:String;

    @Column()
    org_terms_cond:Boolean;

    @CreateDateColumn()
    org_created_at:Date;

    @UpdateDateColumn()
    org_modified_at:Date;
}
