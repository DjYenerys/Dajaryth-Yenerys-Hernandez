import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString, Length } from "class-validator";


// Create Doctor DTO
export class CreateDoctorDto {

    // Create PersonIf 

    @ApiProperty({
    name: 'personaId',
    required: true,
    type: Number,
    description:'Identificador de la persona asociada al doctor. Debe existir previamente en el sistema.',
    example: 12,
    })

    @IsInt()
    personaId: number;

    // Create SpecialtyId

    @ApiProperty({
    name: 'specialtyId',
    required: true,
    type: Number,
    description:'Identificador de la especialidad médica del doctor. Debe corresponder a una especialidad válida.',
    example: 3,
    })

    @IsInt()
    specialtyId: number;

    // Create LicenseNumber
    // Is required, length between 2 and 100

    @ApiProperty({
    name: 'licenseNumber',
    required: true,
    type: String,
    description:'Número de licencia médica del doctor. Debe tener entre 2 y 100 caracteres y ser único en el sistema.',
    example: 'MD-987654',
    })

    @IsString()
    @Length(2, 100)
    licenseNumber: string;
}