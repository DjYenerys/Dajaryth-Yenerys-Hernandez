import { IsInt, IsOptional, IsString, Length, Min } from "class-validator";
import { PartialType } from 'Taller-4/src/auth/node_modules/@nestjs/mapped-types';
import { CreateMedicineDto } from './create-medicine.dto';
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

// Update Medicine DTO
export class UpdateMedicineDto extends PartialType(CreateMedicineDto) {

    @ApiProperty({
    name: 'id',
    required: true,
    type: Number,
    description: 'Identificador único del medicamento que se desea actualizar.',
    example: 1
    })
    @IsInt()
    id: number;


    @ApiProperty({
    name: 'name',
    required: true,
    type: String,
    description: 'Nombre actualizado del medicamento.',
    example: 'Amoxicilina 500mg'
    })
    @IsString()
    @Length(2, 100)
    name: string;


    @ApiProperty({
    name: 'type',
    required: true,
    type: String,
    description: 'Tipo de medicamento (tableta, jarabe, cápsula, etc.).',
    example: 'Cápsula'
    })
    @IsString()
    @Length(2, 50)
    type: string;


    @ApiProperty({
    name: 'presentation',
    required: true,
    type: String,
    description: 'Presentación del medicamento.',
    example: 'Frasco de 100 ml'
    })
    @IsString()
    @Length(2, 50)
    presentation: string;


    @ApiProperty({
    name: 'stock',
    required: true,
    type: Number,
    description: 'Cantidad disponible en inventario del medicamento.',
    example: 80
    })
    @IsInt()
    @Min(0)
    stock: number;


    @ApiProperty({
    name: 'description',
    required: false,
    type: String,
    description: 'Descripción o detalles adicionales del medicamento.',
    example: 'Antibiótico de amplio espectro.'
    })
    @IsString()
    @Length(2, 50)
    @IsOptional()
    description: string;


    @ApiProperty({
    name: 'price',
    required: true,
    type: Number,
    description: 'Precio actual del medicamento en pesos colombianos.',
    example: 7800
    })
    @IsInt()
    @Min(0)
    price: string;
}