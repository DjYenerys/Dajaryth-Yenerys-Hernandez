import { PartialType } from "Taller-4/src/auth/node_modules/@nestjs/mapped-types";
import { CreatePrescriptionDetailDto } from "./create-prescription-detail.dto";
import { IsInt, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";


// Update Prescription Detail DTO
export class UpdatePrescriptionDetailsDto extends PartialType(CreatePrescriptionDetailDto) {


    @ApiProperty({
    name: 'dose',
    required: false,
    type: String,
    description: 'Nueva dosis del medicamento (si se desea actualizar).',
    example: '2 tabletas cada 12 horas',
    })
    @IsString()
    @IsNotEmpty()
    dose: string;


    @ApiProperty({
    name: 'duration',
    required: false,
    type: Number,
    description: 'Nueva duración del tratamiento en días.',
    example: 10,
    })
    @IsInt()
    @IsNotEmpty()
    duration: number;


    @ApiProperty({
    name: 'instructions',
    required: false,
    type: String,
    description: 'Nuevas instrucciones o recomendaciones.',
    example: 'Tomar con abundante agua',
    })
    @IsString()
    @IsNotEmpty()
    instrucitons: string;       

}