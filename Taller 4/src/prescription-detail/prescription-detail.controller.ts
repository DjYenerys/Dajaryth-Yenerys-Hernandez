import { Body, Controller, Get, Inject, Patch, Post, Param, Delete, HttpStatus } from '@nestjs/common';
import { CreatePrescriptionDetailDto } from './dto/create-prescription-detail.dto';
import { PrescriptionDetailService } from './prescription-detail.service';
import { UpdatePrescriptionDetailsDto } from './dto/update-prescription-details.dto';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';


@Controller('prescription-detail')
export class PrescriptionDetailController {
    constructor(private readonly detailRepository: PrescriptionDetailService){}

    // ─── POST ───────────────────────────────────────────────
    //Create a new prescription detail
    //http:localhost:3000/prescription-detail
    // table relation between prescription and medicine, parameters id of prescription and medicine

    @ApiOperation({
    summary: 'Crear un nuevo detalle de prescripción',
    description:'Crea un nuevo registro en la tabla de detalles de prescripción, que relaciona una receta con un medicamento.',
    })
    @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Detalle de prescripción creado exitosamente.',
    })
    @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Los datos enviados no son válidos.',
    })

    @Post()
    create(@Body() createPrescriptionDetailDto: CreatePrescriptionDetailDto) {
        return this.detailRepository.create(createPrescriptionDetailDto);
    }

    // ─── GET ───────────────────────────────────────────────
    //Get all prescription details
    //http:localhost:3000/prescription-detail

    @ApiOperation({
    summary: 'Obtener todos los detalles de prescripción',
    description: 'Devuelve una lista con todos los registros de detalles de prescripción almacenados.',
    })
    @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de detalles de prescripción obtenida correctamente.',
    })

    @Get()
    findAll() {
        return this.detailRepository.findAll();
    }

    // ─── GET ───────────────────────────────────────────────
    //Get prescription detail by id
    //http:localhost:3000/prescription-detail/1
    //The param id is the id of the prescription detail, is required

    @ApiOperation({
    summary: 'Obtener un detalle de prescripción por ID',
    description: 'Busca y devuelve un detalle de prescripción utilizando su ID único.',
    })
    @ApiParam({
    name: 'id',
    required: true,
    type: Number,
    description: 'ID del detalle de prescripción que se desea consultar',
    example: 1,
    })
    @ApiResponse({
    status: HttpStatus.OK,
    description: 'Detalle de prescripción encontrado.',
    })
    @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'No se encontró el detalle de prescripción con el ID especificado.',
    })

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.detailRepository.findOne(id);
    }

    // ─── PATCH ───────────────────────────────────────────────
    // Update prescription detail by id
    // http:localhost:3000/prescription-detail/1
    // The param id is the id of the prescription detail, is required for update

    @ApiOperation({
    summary: 'Actualizar un detalle de prescripción',
    description:'Actualiza los datos de un detalle de prescripción existente mediante su ID.'
    })
    @ApiParam({
    name: 'id',
    required: true,
    type: Number,
    description: 'ID del detalle de prescripción que se desea actualizar',
    example: 1,
    })
    @ApiResponse({
    status: HttpStatus.OK,
    description: 'Detalle de prescripción actualizado correctamente.',
    })
    @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'No se encontró el detalle de prescripción con el ID especificado.',
    })

    @Patch(':id')
    update(@Param('id') id: number, @Body() updatePrescriptionDetailsDto: UpdatePrescriptionDetailsDto) {
        return this.detailRepository.update(id, updatePrescriptionDetailsDto);
    }

    // ─── DELETE ───────────────────────────────────────────────
    // Delete prescription detail by id
    // http:localhost:3000/prescription-detail/1
    // The param id is the id of the prescription detail, is required for delete

    @ApiOperation({
    summary: 'Eliminar un detalle de prescripción',
    description:'Elimina un detalle de prescripción existente utilizando su ID único.'
    })
    @ApiParam({
    name: 'id',
    required: true,
    type: Number,
    description: 'ID del detalle de prescripción que se desea eliminar',
    example: 1,
    })
    @ApiResponse({
    status: HttpStatus.OK,
    description: 'Detalle de prescripción eliminado correctamente.',
    })
    @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'No se encontró el detalle de prescripción con el ID especificado.',
    })

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.detailRepository.remove(id);
    }

}


