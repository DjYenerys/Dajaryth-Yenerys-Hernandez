import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { Appointment } from "../appointment/appointment.entity";
import { Person } from "../person/person.entity";
import { Prescription } from "../prescription/prescription.entity";
import { Invoice } from "../invoice/invoice.entity";



@Entity('patient')
export class Patient {

    // Primary key of the patient
    @PrimaryGeneratedColumn()
    id: number;

    // blood type of the patient
    @Column({type: 'varchar', length: 50})
    bloodType: string;

    // insurance of the patient
    @Column({enum: ['contributive', 'subsidized', 'free']})
    insurance: string;

    // medical history of the patient
    @Column({type: 'text', nullable: true})
    medicalHistory: string;

    //Relationships

    // Relation Person > Patient, a Person can have many patients
    @OneToOne(() => Person, (person) => person.patient, {cascade: true})
    // foreign key person_id JoinColumn = Define the name of the foreign key column in the patient table
    @JoinColumn({name:'person_id'})
    person: Person;

    // Relation Appointment > Patient, an Appointment can have many patients
    @OneToMany (() => Appointment, (appointment) => appointment.patient, {cascade: true})
    // foreign key patient_id JoinColumn = Define the name of the foreign key column in the patient table
    @JoinColumn({name: 'patient_id'})
    appointments: Appointment[];

    // Relation Invoice > Patient, an Invoice can have many patients
    @OneToMany(() => Invoice, (invoice) => invoice.propety_patient, {cascade: true})
    invoices: Invoice[];
}