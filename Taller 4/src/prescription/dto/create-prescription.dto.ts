import { Type } from "class-transformer";
import { IsInt, IsOptional, IsDateString , IsString, ValidateNested, IsArray, IsNumber } from "class-validator";
import { CreatePrescriptionDetailDto } from "../../prescription-detail/dto/create-prescription-detail.dto";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";


// Create Prescription DTO
export class CreatePrescriptionDto {

    @ApiPropertyOptional({
    name: 'date',
    type: String,
    description: 'Fecha de creación de la prescripción (por defecto la actual).',
    example: '2025-10-29T14:30:00Z',
    })
    @IsDateString()
    @IsOptional()
    date?: Date;


    @ApiPropertyOptional({
    name: 'observations',
    type: String,
    description: 'Observaciones médicas o indicaciones adicionales relacionadas con la prescripción.',
    example: 'Tomar el medicamento después de cada comida.',
    })
    @IsString()
    @IsOptional()
    observations: string;


    @ApiProperty({
    name: 'quantity',
    type: Number,
    description: 'Cantidad del medicamento prescrita al paciente.',
    example: 3,
    })
    @IsInt()
    quantity: number;


    @ApiProperty({
    name: 'duration',
    type: Number,
    description: 'Duración del tratamiento en días.',
    example: 7,
    })
    @IsInt()
    duration: number;


    @ApiProperty({
    name: 'appointmentId',
    type: Number,
    description: 'Identificador de la cita médica asociada a la prescripción.',
    example: 12,
    })
    @IsNumber()
    appointmentId: number;


    @ApiProperty({
    name: 'medicineId',
    type: Number,
    description: 'Identificador del medicamento asociado a la prescripción.',
    example: 5,
    })
    @IsNumber()
    medicineId: number;


    @ApiProperty({
    name: 'details',
    type: [CreatePrescriptionDetailDto],
    description: 'Lista de detalles específicos de la prescripción (dosis, horario, etc).',
    example: [
        { dosage: '500mg', frequency: 'Cada 8 horas', route: 'Oral' }
    ],
    })
    @IsArray()
    @ValidateNested({each: true})
    @Type(() => CreatePrescriptionDetailDto)
    details: CreatePrescriptionDetailDto[];
    
}
