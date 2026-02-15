import { PartialType } from "Taller-4/src/auth/node_modules/@nestjs/mapped-types";
import { CreateDoctorDto } from "./create-doctor.dto";
import { IsString } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";


export class UpdateDoctorDto extends PartialType(CreateDoctorDto) { 
    
    // Update licenseNumber of Doctor

    @ApiPropertyOptional({
    name: 'licenseNumber',
    required: false,
    type: String,
    description:'Número de licencia médica actualizado del doctor. Solo debe enviarse si se desea modificar.',
    example: 'MD-123456-UPDATED',
    })

    @IsString()
    licenseNumber: string;

}