import { PartialType } from '@nestjs/mapped-types';
import { CreateInvoiceDto } from './create-invoice.dto';
import { IsNumber, IsString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// Update Invoice DTO
export class UpdateInvoiceDto extends PartialType(CreateInvoiceDto) {

    @ApiProperty({
    name: 'total',
    required: true,
    type: Number,
    description: 'Monto total actualizado de la factura.',
    example: 180000,
    })

    @IsNumber()
    total: number;

    @ApiProperty({
    name: 'metodo_pago',
    required: true,
    type: String,
    description: 'Nuevo método de pago utilizado.',
    example: 'transferencia',
    })

    @IsString()
    metodo_pago: string;

    @ApiPropertyOptional({
    name: 'estado_pago',
    required: false,
    type: String,
    description:'Estado de pago actualizado. Puede ser "pendiente", "pagado" o "cancelado".',
    example: 'pagado',
    })
    
    @IsString()
    @IsOptional()
    estado_pago?: string;   

    @ApiProperty({
    name: 'id_factura',
    required: true,
    type: Number,
    description: 'Identificador único de la factura que se actualiza.',
    example: 10,
    })

    @IsNumber()
    id_factura: number;
}
