import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Person } from "../person/person.entity";
import { Appointment } from "../appointment/appointment.entity";
import { Prescription } from "../prescription/prescription.entity";
import { Specialty } from "../specialty/specialty.entity";


@Entity('doctor')
export class Doctor {

    // Id of the doctor
    @PrimaryGeneratedColumn()
    id: number;

    // License number of the doctor
    // Is required, length between 2 and 100
    @Column(
        {length: 50, type: 'varchar'}
    )
    licenseNumber: string;

    //Relationships

    // Relation Person > Doctor, a Person can have many doctors
    @OneToOne(() => Person, (person) => person.doctor, {cascade: true})
    @JoinColumn({name:'person_id'})
    person:Person;
    
    // Relation Specialty > Doctor, a Specialty can have many doctors
    @ManyToOne(() => Specialty, (Especialidades) => Especialidades.propety_doctor, {cascade: true})
    @JoinColumn({name:'specialty_id'})
    specialty:Specialty; 

    // Relation Appointment > Doctor, an Appointment can have many doctors
    @OneToMany(() => Appointment, (appointment) => appointment.doctor, {cascade: true})
    appointments:Appointment[];
}