// Importacion de la clase doctor para usar la entidad y hacer la relacion en la BD 
import { Doctor } from "../doctor/doctor.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

/**
 * Entidad que representa una especialidad en el sistema hospitalario
 * Almacena el nombre, la descriptión y la presentación de cada medicamento disponible.
 */

@Entity('especialidades')
export class Specialty{

    /**
     * El ID unico de la especialidad. Es la clave primaria autogenerada.
     * @example 1
     */

    // Primary key of the specialty
    @PrimaryGeneratedColumn()
    id_especialidad: number;

    // Name of the specialty
    // Is required, length between 2 and 100
    // Unique
    @Column({unique: true, length:100})
    name: string;

   // Description of the specialty
   // Is optional
    @Column({nullable: true})
    description: string;

    //Relationships

    /**
     * Relación con la entidad o tabla Doctor. Relación de uno a muchos
     * Representa las especialidades que puede tener un usuario Doctor.
     */

   // Relation Doctor > Specialty, a Doctor can have many specialties
    @OneToMany(() => Doctor, (Doctor_Alias) => Doctor_Alias.specialty)
    propety_doctor: Doctor[];
}