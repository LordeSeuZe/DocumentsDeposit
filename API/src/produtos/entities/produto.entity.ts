import { Exclude } from "class-transformer";
import { ObjectId } from "mongodb";
import { Column, CreateDateColumn, Entity, ObjectIdColumn, PrimaryColumn } from "typeorm";

@Entity()
export class Documento {
    @ObjectIdColumn()
    _id: string;
    
    @Column('text')
    pais: string;

    @Column('text')
    cidade: string;

    @CreateDateColumn()
    create_at: Date;
}
