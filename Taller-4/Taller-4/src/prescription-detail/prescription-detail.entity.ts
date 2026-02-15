import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Prescription } from "../prescription/prescription.entity";
import { Medicine } from "../medicine/medicine.entity";

/**
 * Entidada detalle de prescripción.
 * Sirve como tabla de relación entre prescripción y Medicina, alamcenando
 * la información específica de la dosis y el tiempo de uso.
 */

@Entity('prescription_detail')
export class PrescriptionDetail {
    
    /**
     * / Clave primaria de la tabla prescriptiondetail
     */
    @PrimaryGeneratedColumn()
    id: number;
    
    /**
     * Atributo para la dosis de la medicina.
     */

    @Column({length: 100})
    dose: string;

    // Duration of the prescription 
    @Column({type: 'int'})
    duration: number;

    // Instructions of the prescription 
    @Column({type: 'text'})
    instrucitons: string;

    //Relationships

    /**
     * 
    // Relacion de muchos a uno entre prescription y prescription-detail
     */
    @ManyToOne(() => Prescription, (prescription) => prescription.details, {onDelete: 'CASCADE'})
    // foreign key prescription_id JoinColumn = Define the name of the foreign key column in the prescription_detail table
    @JoinColumn({name: 'prescription_id'})
    prescription: Prescription;

    /**
     * Relacion de muchos a uno entre Prescription-detail y medicine.
     */

    // Relation Medicine > PrescriptionDetail, a Medicine can have many prescription details
    @ManyToOne(() => Medicine, (medicine) => medicine.details)
    // foreign key medicine_id JoinColumn = Define the name of the foreign key column in the prescription_detail table
    @JoinColumn({name: 'medicine_id'})
    medicine: Medicine;
    
}