import { BeforeInsert, BeforeUpdate, Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Doctor } from '../doctor/doctor.entity';
import { Patient } from '../patient/patient.entity';
import * as bcrypt from 'bcrypt';

// creacion de un ENUM Constantes ROL
export enum Role{
    Doctor = 'doctor',
    Patient = 'paciente',
    Admin = 'admin'
}

@Entity('person')
export class Person {
    // Primary key of the person
    @PrimaryGeneratedColumn()
    id: number;

    // Name of the person
    // Is required, length between 2 and 100
    @Column(
    {length: 100}
    )
    name: string;

    // Last name of the person
    // Is required, length between 2 and 100
    @Column(
    {length:100}
    )
    lastName: string;

    // Document of the person
    // Is required, unique
    @Column(
    {unique: true}
    )
    document: string;

@Column({
    type: 'date',
    nullable: true
})
birthDate: Date;

    // Email of the person
    // Is required, unique
    @Column(
    {unique: true}
)
phone: string;

@Column(
    {unique: true}
)
email: string;

@Column(
    {select: false}
)
password: string;

// HASH bycript password 

// metodos automaticos 
// ejecuta el hash antes de que se cree un nuevo usuario 
@BeforeInsert()
// ejecuta el hash antes de que un registro se actualice 
@BeforeUpdate()
// condicion que en el campo de la contraseña no este vacio 
async passwordHash(){
   // 1. Verifica si la contraseña existe.
    // 2. Verifica si la contraseña NO comienza con el prefijo de Bcrypt ('$2b$'), 
    //    lo que indica que es texto plano y necesita ser hasheado.
    if (this.password && this.password.length > 0 && !this.password.startsWith('$2b$')) {
        // Costo recomendado: 10
        this.password = await bcrypt.hash(this.password, 10); 
    }
}

// Campo de eleccion rol 
@Column({
    type: 'enum',
    enum: Role
})
role: Role;

    //Relationships

    // Relation Doctor > Person, a Person can have many doctors
    @OneToOne(
    () => Doctor,
    (doctor) => doctor.person
    )    
    doctor: Doctor;

    // Relation Patient > Person, a Person can have many patients
    @OneToOne(
    () => Patient,
    (patient) => patient.person
    )
    patient: Patient;

// Simulacion de login comparacion 
async comparePassword(attempt: string): Promise<boolean> {
        // Descomentado: Este método es ESENCIAL para el login JWT.
        // Compara el texto plano (attempt) con el hash almacenado (this.password).
        return await bcrypt.compare(attempt, this.password); 
    }
}