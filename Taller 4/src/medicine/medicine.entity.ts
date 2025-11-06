import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Prescription } from "src/prescription/prescription.entity";
import { PrescriptionDetail } from "src/prescription-detail/prescription-detail.entity";


@Entity('medicine')
export class Medicine {

    // Primary key of the medicine
    @PrimaryGeneratedColumn()
    id: number;

    // Name of the medicine
    // Is required, length between 2 and 100
    @Column({type: 'varchar', length: 100})
    name: string;

    // Type of the medicine
    // Is required, length between 2 and 50
    // Allowed values: tablet, pill, liquid, injection
    @Column({type: 'varchar', length: 50})
    type: string; //tablet, pill, liquid, injection

    // Presentation of the medicine
    // Is required, length between 2 and 50
    // Allowed values: 100mg, 500mg, 100ml, 500ml, etc
    @Column({type: 'varchar', length: 50})
    presentation: string; // 500mg, 100ml, etc

    //Stock of the medicine
    //Is required, default value 0
    @Column({type: 'int', default: 0})
    stock: number;

    //Description of the medicine
    //Is optional
    @Column({type: 'text', nullable: true})
    description: string;

    //Price of the medicine
    //Is required, length between 2 and 100
    @Column({type: 'varchar', length: 50})
    price: string;

    //Relationships

    // Relation Prescription > Medicine, a Prescription can have many medicines
    @OneToMany(() => Prescription, (prescription) => prescription.medicine)
    prescription: Prescription[];
    
    // Relation PrescriptionDetail > Medicine, a PrescriptionDetail can have many medicines
    @OneToMany(() => PrescriptionDetail, (prescription) => prescription.medicine)
    details: PrescriptionDetail[];
    
}