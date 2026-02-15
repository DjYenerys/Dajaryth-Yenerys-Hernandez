import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsPositive } from 'class-validator';

// Create Office DTO
export class CreateOfficeDto {

    @ApiProperty({
    name: 'num_consultorio',
    required: true,
    type: Number,
    description: 'Número identificador del consultorio dentro del hospital.',
    example: 305
    })
    @IsInt()
    @IsPositive()
    num_consultorio: number;


    @ApiProperty({
    name: 'piso',
    required: true,
    type: Number,
    description: 'Número del piso en el que se encuentra el consultorio.',
    example: 3
    })
    @IsInt()
    piso: number;


    @ApiProperty({
    name: 'disponible',
    required: true,
    type: Boolean,
    description: 'Indica si el consultorio está disponible para asignación o no.',
    example: true
    })
    @IsBoolean()
    disponible: boolean;
}
