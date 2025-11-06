import { PartialType } from '@nestjs/mapped-types';
import { CreatePrescriptionDto } from './create-prescription.dto';
import  { IsInt, IsString } from "class-validator";
import { ApiPropertyOptional } from '@nestjs/swagger';

// Update Prescription DTO
export class UpdatePrescriptionDto extends PartialType(CreatePrescriptionDto) {

    @ApiPropertyOptional({
    name: 'id',
    type: Number,
    description: 'Identificador único de la prescripción a actualizar.',
    example: 1,
    })
    @IsInt()
    id: number;

    
    @ApiPropertyOptional({
    name: 'observations',
    type: String,
    description: 'Nuevas observaciones o instrucciones médicas.',
    example: 'Aumentar la dosis a 2 tabletas diarias.',
    })
    
    @IsString()
    observations: string;


    @ApiPropertyOptional({
    name: 'quantity',
    type: Number,
    description: 'Cantidad actualizada del medicamento.',
    example: 5,
    })
    @IsInt()
    quantity: number;


    @ApiPropertyOptional({
    name: 'duration',
    type: Number,
    description: 'Duración actualizada del tratamiento en días.',
    example: 10,
    })
    @IsInt()
    duration: number;


    @ApiPropertyOptional({
    name: 'appointmentId',
    type: Number,
    description: 'Nuevo ID de la cita médica asociada, si aplica.',
    example: 14,
    })
    @IsInt()
    appointmentId: number;


}
