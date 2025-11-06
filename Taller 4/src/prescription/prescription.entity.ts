
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Medicine } from "src/medicine/medicine.entity";
import { PrescriptionDetail } from "src/prescription-detail/prescription-detail.entity";
import { Appointment } from "src/appointment/appointment.entity";


@Entity('prescription')
export class Prescription {

    // Primary key of the prescription
    @PrimaryGeneratedColumn()
    id: number;

    // Date of the prescription
    @Column({type:'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    date: Date;

    // Observations of the prescription
    @Column({type: 'text', nullable: true})
    observations: string;

    // Quantity of the prescription of medicine
    @Column({type: 'int', default: 0})
    quantity: number;

    // Duration of the prescription
    @Column({type: 'int', default: 0})
    duration: number;

    // Relationships

    // Relation Appointment > Prescription, an Appointment can have many prescriptions
    @ManyToOne(() => Appointment, appointment => appointment.prescription)
    // foreign key appointment_id JoinColumn = Define the name of the foreign key column in the prescription table
    @JoinColumn({name: 'appointment_id'})
    appointment: Appointment;

    // Relation Medicine > Prescription, a Medicine can have many prescriptions
    @ManyToOne(() => Medicine, medicine => medicine.prescription)
    // foreign key medicine_id JoinColumn = Define the name of the foreign key column in the prescription table
    @JoinColumn({name: 'medicine_id'})
    medicine: Medicine;
    
    // Relation PrescriptionDetail > Prescription, a PrescriptionDetail can have many prescriptions
    @OneToMany(() => PrescriptionDetail, prescriptionDetail => prescriptionDetail.prescription)
    details: PrescriptionDetail[];
}
