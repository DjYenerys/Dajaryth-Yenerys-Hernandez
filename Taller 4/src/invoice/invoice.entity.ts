import { Appointment } from "src/appointment/appointment.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Patient } from "src/patient/patient.entity";



@Entity('factura')
export class Invoice {
    // Primary key of the invoice
    @PrimaryGeneratedColumn()
    id_factura: number;

    // Date of the invoice format: yy/mm/dd and h/m/s
    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    fecha: Date;

    // Amount of the invoice precision = number of digits max and scale = max digits after the decimal point
    @Column({type: 'decimal', precision: 10, scale: 2})
    total: number;

    // Payment method of the invoice max length 50
    @Column({type: 'varchar', length: 50})
    metodo_pago: string;

    // Status of the invoice (pending, paid, failed) and default value PENDIENTE
    @Column({type: 'varchar', length: 50, default: 'Pendiente'})
    estado_pago: string;

    //Relationships

    // relationship between invoice and appointment One to many 'Various invoices can belong to a appointment' onDelete: 'CASCADE' (If a appointment is deleted, all invoices of that appointment are deleted)
    @ManyToOne(() => Appointment, (Cita) => Cita.invoice, {onDelete: 'CASCADE'})
    // foreign key id_cita JoinColumn = Define the name of the foreign key column in the factura table
    @JoinColumn({name: 'id_cita'})
    propety_cita: Appointment;

    // relationship between invoice and patient One to many 'Various invoices can belong to a patient' onDelete: 'CASCADE' (If a patient is deleted, all invoices of that patient are deleted)
    @ManyToOne(() => Patient, (paciente) => paciente.invoices, {onDelete: 'CASCADE'})
    // foreign key id_paciente JoinColumn = Define the name of the foreign key column in the factura table
    @JoinColumn({name: 'id_paciente'})
    propety_patient: Patient;
}
