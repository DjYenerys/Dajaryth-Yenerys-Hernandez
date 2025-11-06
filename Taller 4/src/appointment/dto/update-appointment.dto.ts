import { IsDateString, IsInt, IsString } from "class-validator";
import { PartialType } from '@nestjs/mapped-types';
import { CreateAppointmentDto } from './create-appointment.dto';
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class UpdateAppointmentDto extends PartialType(CreateAppointmentDto) {

    //Id of the appointment

    @ApiProperty({
    name: 'id',
    type: Number,
    description: 'Identificador único de la cita médica que se desea actualizar.',
    example: 1,
    })

    @IsInt()
    id: number;

    //Doctor id

    @ApiProperty({
    name: 'doctorId',
    type: Number,
    description: 'Identificador del doctor asignado a la cita médica.',
    example: 3,
    })

    @IsInt()
    doctorId: number;

    //Patient id

    @ApiProperty({
    name: 'patientId',
    type: Number,
    description: 'Identificador del paciente que asistirá a la cita médica.',
    example: 12,
    })

    @IsInt()
    patientId: number;  
    
    //Office id

    @ApiProperty({
    name: 'officeId',
    type: Number,
    description: 'Identificador de la oficina o consultorio donde se realizará la cita.',
    example: 5,
    })

    @IsInt()
    officeId: number;
    
    //Status of the appointment
    //Status: scheduled, completed, canceled

    @ApiProperty({
    name: 'status',
    type: String,
    description: 'Estado actual de la cita médica. Puede ser `scheduled`, `completed` o `canceled`.',
    example: 'completed',
    })

    @IsString()
    status: string;

    //Date of the appointment

    @ApiProperty({
    name: 'date',
    type: String,
    description: 'Fecha y hora programada para la cita médica (formato ISO 8601).',
    example: '2025-12-01T15:00:00.000Z',
    })

    @IsDateString()
    date: Date;

    //Reason of the appointment
    //If the appointment is not scheduled, the reason is optional

    @ApiPropertyOptional({
    name: 'reason',
    type: String,
    description: 'Motivo de la cita médica. Este campo es opcional.',
    example: 'Control postoperatorio',
    })

    @IsString()
    reason: string;

    //Notes of the appointment
    //If the appointment is not scheduled, the notes is optional

    @ApiPropertyOptional({
    name: 'notes',
    type: String,
    description: 'Notas adicionales sobre la cita médica. Este campo es opcional.',
    example: 'El paciente debe traer resultados de laboratorio.',
    })

    @IsString()
    notes: string;
}
