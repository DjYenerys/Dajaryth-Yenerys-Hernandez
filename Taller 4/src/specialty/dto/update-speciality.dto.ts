import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString, Length } from "class-validator";


// Update Specialty DTO
export class UpdateSpecialtyDto {
    
    @ApiProperty({
    name: 'name',
    required: true,
    type: String,
    description: 'Nombre actualizado de la especialidad médica.',
    example: 'Cardiología Intervencionista',
    })
    @IsString()
    @Length(2, 100)
    name: string;


    @ApiPropertyOptional({
    name: 'description',
    required: false,
    type: String,
    description: 'Descripción actualizada de la especialidad médica.',
    example: 'Área especializada en procedimientos quirúrgicos cardíacos mínimamente invasivos.',
    })
    @IsString()
    @Length(2, 100)
    @IsOptional()
    description: string;

}