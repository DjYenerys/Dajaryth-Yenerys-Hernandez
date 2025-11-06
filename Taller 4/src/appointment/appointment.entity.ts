import { Doctor } from "src/doctor/doctor.entity";
/*import { Invoice } from "src/invoice/invoice.entity"; */
import { Patient } from "src/patient/patient.entity";
import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne, OneToMany} from "typeorm";
import { Office } from "src/office/office.entity";
import { Invoice } from "src/invoice/invoice.entity";
import { Prescription } from "src/prescription/prescription.entity";

//Atributos entidad appointment
@Entity('appointment')
export class Appointment {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'timestamp'})
    date: Date;

    @Column({type: 'text', nullable: true})
    reason: string;

    @Column({type: 'text', nullable: true})
    notes: string;

    @Column({default: 'scheduled'})
    status: string; // scheduled, completed, canceled


    //Relationships

    // Relation Doctor > Appointment, a Doctor can have many appointments
    @ManyToOne(() => Doctor, doctor => doctor.appointments)
    @JoinColumn({name: 'doctor_id'})
    doctor: Doctor;
    
    // Relation Patient > Appointment, a Patient can have many appointments
    @ManyToOne(() => Patient, patient => patient.appointments)
    @JoinColumn({name: 'patient_id'})
    patient: Patient;
    
    // Relation Office > Appointment, an Office can have many appointments
    @ManyToOne(() => Office, office => office.property_cita)
    @JoinColumn({name: 'office_id'})
    office: Office;
    
    // Relation Invoice > Appointment, an Invoice can have many appointments
    @OneToOne(() => Invoice, invoice => invoice.propety_cita)
    invoice: Invoice;

    // Relation Prescription > Appointment, an Prescription can have many appointments
    @OneToMany(() => Prescription, prescription => prescription.appointment)
    prescription: Prescription[];
    
}
