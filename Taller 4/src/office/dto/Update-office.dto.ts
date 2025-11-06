import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsInt, IsPositive } from 'class-validator';
import { CreateOfficeDto } from './create-office.dto';
import { ApiProperty } from '@nestjs/swagger';

// Update Office DTO
export class UpdateOfficeDto extends PartialType(CreateOfficeDto) {

    @ApiProperty({
    name: 'num_consultorio',
    required: false,
    type: Number,
    description: 'Número actualizado del consultorio.',
    example: 210
    })
    @IsInt()
    @IsPositive()
    num_consultorio: number;


    @ApiProperty({
    name: 'piso',
    required: false,
    type: Number,
    description: 'Número de piso actualizado del consultorio.',
    example: 2
    })
    @IsInt()
    piso: number;


    @ApiProperty({
    name: 'disponible',
    required: false,
    type: Boolean,
    description: 'Indica si el consultorio permanece disponible o no.',
    example: false
    })
    @IsBoolean()
    disponible: boolean;
}