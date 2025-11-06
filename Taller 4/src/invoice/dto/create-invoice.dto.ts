import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsDateString, IsNumber, IsString, IsOptional } from "class-validator";

// Create Invoice DTO
export class CreateInvoiceDto {

    @ApiPropertyOptional({
    name: 'fecha',
    required: false,
    type: String,
    description:'Fecha en la que se genera la factura. Si no se proporciona, se autogenera en la base de datos.',
    example: '2025-10-29',
    })
    @IsDateString()
    @IsOptional() // porque el valor se autogenera en la BD
    fecha?: Date;


    @ApiProperty({
    name: 'total',
    required: true,
    type: Number,
    description: 'Monto total de la factura. Debe ser un número positivo.',
    example: 150000,
    })
    @IsNumber()
    total: number;


    @ApiProperty({
    name: 'metodo_pago',
    required: true,
    type: String,
    description:'Método de pago utilizado. Puede ser "efectivo", "tarjeta", "transferencia", etc.',
    example: 'tarjeta',
    })
    @IsString()
    metodo_pago: string;


    @ApiPropertyOptional({
    name: 'estado_pago',
    required: false,
    type: String,
    description:'Estado actual del pago. Puede ser "pendiente", "pagado" o "cancelado".',
    example: 'pendiente',
    })
    @IsString()
    @IsOptional()
    estado_pago?: string;


    @ApiProperty({
    name: 'id_paciente',
    required: true,
    type: Number,
    description:'Identificador del paciente al que pertenece la factura. Debe existir en el sistema.',
    example: 8,
    })
    @IsNumber()
    id_paciente: number;


    @ApiProperty({
    name: 'id_cita',
    required: true,
    type: Number,
    description:'Identificador de la cita asociada a la factura. Debe existir en el sistema.',
    example: 4,
    })
    @IsNumber()
    id_cita: number;
}
