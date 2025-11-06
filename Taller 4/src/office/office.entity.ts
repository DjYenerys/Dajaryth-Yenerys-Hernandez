import { Appointment } from "src/appointment/appointment.entity"; 
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('consultorio')
export class Office{
    // Primary key of the office
    @PrimaryGeneratedColumn()
    id_consultorio: number;
    
    // Number of the office
    // Is required, unique
    @Column({unique: true})
    num_consultorio: number;

    // Number of the office
    @Column()
    piso: number;

    // Availability of the office, default value true, change to false if the office is occupied
    @Column({type: 'boolean', default: true})
    disponible: boolean

    //Relationships

    // Relation Appointment > Office, an Appointment can have many offices
    @OneToMany(() => Appointment, (Cita) => Cita.office, {cascade: true})
    property_cita: Appointment[];
}