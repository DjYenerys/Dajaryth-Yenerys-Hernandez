import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString, Length } from "class-validator";

// Create Specialty DTO
export class CreateSpecialtyDto{
    
    @ApiProperty({
    name: 'name',
    required: true,
    type: String,
    description: 'Nombre de la especialidad médica. Debe contener entre 2 y 100 caracteres.',
    example: 'Cardiología'
    })
    @IsString()
    @Length(2, 100)
    name: string;


    @ApiPropertyOptional({
    name: 'descripcion',
    required: false,
    type: String,
    description: 'Descripción breve de la especialidad médica. Campo opcional.',
    example: 'Especialidad médica que se encarga del estudio, diagnóstico y tratamiento del corazón.',
    })
    @IsString()
    @Length(2, 100)
    @IsOptional()
    descripcion: string;

}