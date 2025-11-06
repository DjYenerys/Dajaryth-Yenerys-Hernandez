import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  // ─── POST ───────────────────────────────────────────────
  //Create a new invoice
  //http:localhost:3000/invoice
  //The JSON Body must be in the format of the CreateInvoiceDto

  @ApiOperation({
    summary: 'Crear una nueva factura',
    description:'Registra una nueva factura en el sistema.'
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Factura creada exitosamente.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Los datos proporcionados son inválidos o incompletos.',
  })

  @Post()
  create(@Body() createInvoiceDto: CreateInvoiceDto) {
    return this.invoiceService.create(createInvoiceDto);
  }

  // ─── GET ───────────────────────────────────────────────
  //Get all invoices
  //http:localhost:3000/invoice

  @ApiOperation({
    summary: 'Obtener todas las facturas',
    description:'Devuelve una lista de todas las facturas registradas en el sistema, incluyendo su total, método de pago y estado de pago.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Listado de facturas obtenido correctamente.',
  })

  @Get()
  findAll() {
    return this.invoiceService.findAll();
  }

  // ─── GET ───────────────────────────────────────────────
  //Get invoice by id
  //http:localhost:3000/invoice/1
  //The param id is the id of the invoice, is required

  @ApiOperation({
    summary: 'Obtener una factura por su ID',
    description:'Permite obtener los detalles de una factura específica utilizando su identificador único.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID de la factura a consultar.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Factura encontrada exitosamente.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'No se encontró ninguna factura con el ID especificado.',
  })

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.invoiceService.findOne(+id);
  }

  // ─── PATCH ───────────────────────────────────────────────
  // Update invoice
  // http:localhost:3000/invoice/1
  // The param id is the id of the invoice, is required for update

  @ApiOperation({
    summary: 'Actualizar una factura existente',
    description:'Permite modificar los datos de una factura existente.'
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID de la factura que se desea actualizar.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Factura actualizada exitosamente.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Los datos enviados son inválidos o incompletos.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'No se encontró ninguna factura con el ID especificado.',
  })

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInvoiceDto: UpdateInvoiceDto) {
    return this.invoiceService.update(+id, updateInvoiceDto);
  }

  // ─── DELETE ───────────────────────────────────────────────
  // Delete invoice
  // http:localhost:3000/invoice/1
  // The param id is the id of the invoice, is required for delete

  @ApiOperation({
    summary: 'Eliminar una factura',
    description:'Elimina permanentemente una factura del sistema. Esta acción no se puede deshacer.'
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID de la factura a eliminar.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Factura eliminada exitosamente.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'No se encontró ninguna factura con el ID especificado.',
  })

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.invoiceService.remove(+id);
  }
}
