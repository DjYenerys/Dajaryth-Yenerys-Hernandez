import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString } from "class-validator";


// Create Prescription Detail DTO
export class CreatePrescriptionDetailDto {
    @ApiProperty({
    name: 'prescriptionId',
    required: true,
    type: Number,
    description: 'ID de la prescripción a la que pertenece este detalle.',
    example: 5,
    })
    
    @IsInt()
    @IsNotEmpty()
    prescriptionId: number;
    


    @ApiProperty({
    name: 'medicineId',
    required: true,
    type: Number,
    description: 'ID del medicamento asociado a la prescripción.',
    example: 12,
    })
    @IsInt()
    @IsNotEmpty()
    medicineId: number;


    @ApiProperty({
    name: 'dose',
    required: true,
    type: String,
    description: 'Dosis del medicamento (por ejemplo: "1 tableta cada 8 horas").',
    example: '1 tableta cada 8 horas',
    })
    @IsString()
    @IsNotEmpty()
    dose: string;


    @ApiProperty({
    name: 'duration',
    required: true,
    type: Number,
    description: 'Duración del tratamiento en días.',
    example: 7,
    })
    @IsInt()
    @IsNotEmpty()
    duration: number;


    @ApiProperty({
    name: 'instructions',
    required: true,
    type: String,
    description: 'Instrucciones o recomendaciones adicionales.',
    example: 'Tomar después de las comidas',
    })
    @IsString()
    @IsNotEmpty()
    instrucitons: string;
    
}