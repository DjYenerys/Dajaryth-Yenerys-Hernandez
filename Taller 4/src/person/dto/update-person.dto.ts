import { IsDateString, IsEmail, IsOptional, IsString, Length } from "class-validator";
import { CreatePersonDto } from "./create-person.dto";
import { PartialType } from "@nestjs/mapped-types";
import { Role } from "../person.entity";
import { ApiPropertyOptional } from "@nestjs/swagger";



// Update Person DTO
export class UpdatePersonDto extends PartialType(CreatePersonDto) {

    @ApiPropertyOptional({
    name: 'name',
    type: String,
    description: 'Nombre actualizado de la persona.',
    example: 'Sofía Carolina',
    })
    @IsString()
    @Length(2, 100)
    name: string;


    @ApiPropertyOptional({
    name: 'lastname',
    type: String,
    description: 'Apellido actualizado de la persona.',
    example: 'Ramírez López',
    })
    @IsString()
    @Length(2, 100)
    lastname: string;


@ApiPropertyOptional({
    name: 'document',
    type: String,
    description: 'Nuevo número de documento de identidad.',
    example: '1025487963',
    })
    @IsString()
    document: string;


    @ApiPropertyOptional({
    name: 'birthDate',
    type: String,
    description: 'Nueva fecha de nacimiento en formato ISO.',
    example: '1991-03-22',
    })
    @IsDateString()
    birthDate: Date;


    @ApiPropertyOptional({
    name: 'email',
    type: String,
    description: 'Correo electrónico actualizado.',
    example: 'sofia.ramirez.updated@example.com',
    })
    @IsEmail()
    email: string;


    @ApiPropertyOptional({
    name: 'phone',
    type: String,
    description: 'Teléfono de contacto actualizado.',
    example: '+57 320 658 4732',
    })
    @IsString()
    @Length(2, 100)
    phone: string;


    @ApiPropertyOptional({
    name: 'role',
    type: String,
    description: 'Rol actualizado de la persona.',
    example: Role.Patient,
    })
    @IsString()
    role: Role;


    @ApiPropertyOptional({
    name: 'gender',
    type: String,
    description: 'Género actualizado de la persona.',
    example: 'Femenino',
    })
    @IsString()
    @IsOptional()
    gender: string;

}