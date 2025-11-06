import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString, IsNotEmpty, Length } from "class-validator";

// Update Patient DTO
export class UpdatePatientDto {

    @ApiProperty({
    name: 'personId',
    required: true,
    type: Number,
    description: 'Identificador de la persona asociada al paciente.',
    example: 12,
    })
    @IsInt()
    @IsNotEmpty()
    personid: number;


    @ApiProperty({
    name: 'bloodType',
    required: true,
    type: String,
    description: 'Tipo de sangre actualizado del paciente.',
    example: 'A+',
    })
    @IsString()
    @IsNotEmpty()
    @Length(2, 10)
    bloodType?: string;


    @ApiProperty({
    name: 'insurance',
    required: true,
    type: String,
    description: 'Nueva aseguradora o actualización de la existente.',
    example: 'Nueva EPS',
    })
    @IsString()
    @IsNotEmpty()
    insurance?: string;


    @ApiProperty({
    name: 'medicalHistory',
    required: true,
    type: String,
    description: 'Actualización del historial médico del paciente.',
    example: 'Se agregó diagnóstico de hipertensión.',
    })
    @IsString()
    @IsNotEmpty()
    medicalHistory: string;
}