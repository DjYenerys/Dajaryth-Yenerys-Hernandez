import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsDateString, IsInt, IsOptional, IsString } from "class-validator";



export class CreateAppointmentDto {

    //Date of the appointment

    @ApiProperty({
    name: 'date',
    type: String,
    description: 'Fecha y hora programada para la cita médica (formato ISO 8601).',
    example: '2025-11-15T10:30:00.000Z',
    })

    @IsDateString()
    date: Date;

    //Reason of the appointment
    //If the appointment is not scheduled, the reason is optional

    @ApiPropertyOptional({
    name: 'reason',
    type: String,
    description: 'Motivo de la cita médica. Este campo es opcional.',
    example: 'Chequeo general anual',
    })

    @IsString()
    @IsOptional()
    reason?: string;

    //Notes of the appointment
    //If the appointment is not scheduled, the notes is optional

    @ApiPropertyOptional({
    name: 'notes',
    type: String,
    description: 'Notas adicionales sobre la cita médica. Este campo es opcional.',
    example: 'El paciente solicitó atención prioritaria por síntomas recientes.',
    })

    @IsString()
    @IsOptional()
    notes?: string;

    //Status of the appointment
    //If the appointment is not scheduled, the status is optional
    //Status: scheduled, completed, canceled

    @ApiPropertyOptional({
    name: 'status',
    type: String,
    description: 'Estado actual de la cita médica. Puede ser `scheduled`, `completed` o `canceled`.',
    example: 'scheduled',
    })

    @IsString()
    @IsOptional()
    status?: string;

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
    description: 'Identificador del paciente que asistirá a la cita.',
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
    
}
