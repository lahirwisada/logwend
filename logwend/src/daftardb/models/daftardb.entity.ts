import { Column, Connection, ConnectionOptions, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class DaftardbEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", { length: 100 })
    dbName: string;
    
    @Column({default: 0})
    recordCount?: number;

    @Column("varchar", { length: 100 })
    dbmsName?: string;

    @Column({ nullable: true })
    dbPort?: number;

    @Column({type: 'json', nullable: true})
    conProp?: Connection | ConnectionOptions | string;

    @Column({ type: 'timestamp',  nullable: true})
    createdDate?: string;

    @Column({nullable: true})
    createdBy?: string;

    @Column({ type: 'datetime', nullable: true })
    modifiedDate?: string;

    @Column({nullable: true})
    modifiedBy?: string;

    @Column({ type: 'tinyint', default: 1 })
    recordActive?: boolean;
}