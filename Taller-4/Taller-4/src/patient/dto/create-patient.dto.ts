import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString, IsNotEmpty, Length } from "class-validator";


// Create Patient DTO
export class CreatePatientDto {

    @ApiProperty({
    name: 'personId',
    required: true,
    type: Number,
    description: 'Identificador único de la persona asociada al paciente.',
    example: 12,
    })
    @IsInt()
    @IsNotEmpty()
    personId: number;


    @ApiProperty({
    name: 'bloodType',
    required: true,
    type: String,
    description: 'Tipo de sangre del paciente.',
    example: 'O+',
    })
    @IsString()
    @IsNotEmpty()
    @Length(2, 10)
    bloodType?: string;


    @ApiProperty({
    name: 'insurance',
    required: true,
    type: String,
    description: 'Nombre de la compañía aseguradora del paciente.',
    example: 'Sura EPS',
    })
    @IsString()
    @IsNotEmpty()
    insurance?: string;


    @ApiProperty({
    name: 'medicalHistory',
    required: true,
    type: String,
    description: 'Historial médico relevante del paciente.',
    example: 'Alergia a la penicilina, antecedentes de asma.',
    })
    @IsString()
    @IsNotEmpty()
    medicalHistory: string;

}