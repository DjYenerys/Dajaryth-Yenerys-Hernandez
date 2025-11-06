import { IsDateString, IsEmail, IsEnum, IsOptional, IsString, Length } from "class-validator";
import { Role } from "../person.entity";
import { Type } from "class-transformer";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreatePersonDto {

    @ApiProperty({
    name: 'name',
    required: true,
    type: String,
    description: 'Nombre de la persona.',
    example: 'Sofía',
    })
    @IsString()
    @Length(2, 100)
    name: string;


    @ApiProperty({
    name: 'lastname',
    required: true,
    type: String,
    description: 'Apellido de la persona.',
    example: 'Ramírez',
    })
    @IsString()
    @Length(2, 100)
    lastname: string;


    @ApiProperty({
    name: 'document',
    required: true,
    type: String,
    description: 'Número de documento de identidad de la persona.',
    example: '1025487963',
    })
    @IsString()
    document: string;


    @ApiProperty({
    name: 'birthDate',
    required: true,
    type: String,
    description: 'Fecha de nacimiento de la persona en formato ISO.',
    example: '1990-07-14',
    })
    @Type(() => Date)
    @IsDateString()
    birthDate: Date;

    @ApiProperty({
    name: 'phone',
    required: true,
    type: String,
    description: 'Número de teléfono de contacto de la persona.',
    example: '+57 315 482 9375',
    })
    @IsString()
    @Length(2, 100)
    phone: string;


    @ApiProperty({
    name: 'email',
    required: true,
    type: String,
    description: 'Correo electrónico de la persona.',
    example: 'sofia.ramirez@example.com',
    })
    @IsEmail()
    email: string;


    // validaciones contraseña 
    @ApiProperty({
    name: 'password',
    required: true,
    type: String,
    description: 'Contraseña de acceso al sistema. Debe tener entre 8 y 50 caracteres.',
    example: 'Segura123!',
    })
    @IsString({ message: 'La contraseña debe tener caracteres validos' })
    @Length(8, 50, {
        message: 'La contraseña debe tener entre 8 y 50 caracteres'
    })
    password: string;


    @ApiProperty({
    name: 'role',
    required: true,
    enum: Role,
    description: 'Rol de la persona dentro del sistema (Paciente, Doctor, Administrador, etc).',
    example: Role.Doctor,
    })
    @IsEnum(Role, { message: 'El rol debe ser existente' })
    role: Role;


    @ApiPropertyOptional({
    name: 'gender',
    required: false,
    type: String,
    description: 'Género de la persona.',
    example: 'Femenino',
    })
    @IsString()
    @IsOptional()
    gender: string;

}