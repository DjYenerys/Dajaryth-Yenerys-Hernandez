import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString, Length, Min } from "class-validator";


// Create Medicine DTO
export class CreateMedicineDto {

    @ApiProperty({
    name: 'name',
    required: true,
    type: String,
    description: 'Nombre del medicamento.',
    example: 'Paracetamol 500mg'
    })
    @IsString()
    @Length(2, 100)
    name: string;


    @ApiProperty({
    name: 'type',
    required: true,
    type: String,
    description: 'Tipo de medicamento (tableta, jarabe, cápsula, etc.).',
    example: 'Tableta'
    })
    @IsString()
    @Length(2, 50)
    type: string;


    @ApiProperty({
    name: 'presentation',
    required: true,
    type: String,
    description: 'Presentación del medicamento.',
    example: 'Caja de 10 unidades'
    })
    @IsString()
    @Length(2, 50)
    presentation: string;


    @ApiProperty({
    name: 'stock',
    required: true,
    type: Number,
    description: 'Cantidad disponible en inventario.',
    example: 150
    })
    @IsInt()
    @Min(0)
    stock: number;


    @ApiPropertyOptional({
    name: 'description',
    required: false,
    type: String,
    description: 'Descripción breve del medicamento.',
    example: 'Analgésico y antipirético de venta libre.'
    })
    @IsString()
    @Length(2, 50)
    @IsOptional()
    description: string;


    @ApiProperty({
    name: 'price',
    required: true,
    type: Number,
    description: 'Precio unitario del medicamento.',
    example: 3500
    })
    @IsInt()
    @Min(0)
    price: string;
}