import { Controller, Patch, Get, Post, Body, Param, ParseIntPipe, Delete, HttpStatus } from '@nestjs/common';
import { OfficeService } from './office.service';
import { CreateOfficeDto } from './dto/create-office.dto';
import { UpdateOfficeDto } from './dto/Update-office.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('office')
export class OfficeController {
  constructor(private readonly officeService: OfficeService) {}

  // ─── POST ───────────────────────────────────────────────
  //Create a new office
  //http:localhost:3000/office
  //The JSON Body must be in the format of the CreateOfficeDto

  @ApiOperation({
    summary: 'Crear un nuevo consultorio',
    description:'Permite registrar un nuevo consultorio en el sistema.'
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'El consultorio fue creado exitosamente.'
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Los datos enviados no cumplen con las validaciones requeridas.'
  })

  @Post()
  create(@Body() dto: CreateOfficeDto) {
    return this.officeService.create(dto);
  }

  // ─── GET ───────────────────────────────────────────────
  //Get all offices
  //http:localhost:3000/office

  @ApiOperation({
    summary: 'Obtener todos los consultorios',
    description:'Devuelve la lista completa de consultorios registrados en el sistema hospitalario.'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de consultorios obtenida correctamente.'
  })

  @Get()
  findAll() {
    return this.officeService.findAll();
  }

  // ─── GET ───────────────────────────────────────────────
  //Get office by id
  //http:localhost:3000/office/1
  //The param id is the id of the office, is required

  @ApiOperation({
    summary: 'Obtener un consultorio por su ID',
    description:'Permite consultar la información de un consultorio específico mediante su ID numérico.'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Consultorio encontrado correctamente.'
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'No se encontró ningún consultorio con el ID proporcionado.'
  })

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.officeService.findOne(id);
  }

  // ─── PATCH ───────────────────────────────────────────────
  //Update an office
  //http:localhost:3000/office/1
  //The param id is the id of the office, is required for update

  @ApiOperation({
    summary: 'Actualizar un consultorio existente',
    description:'Actualiza la información de un consultorio específico.'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Consultorio actualizado exitosamente.'
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'No se encontró el consultorio que se desea actualizar.'
  })

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateOfficeDto,
  ) {
    return this.officeService.update(id, dto);
  }

  // ─── DELETE ───────────────────────────────────────────────
  //Delete an office
  //http:localhost:3000/office/1
  //The param id is the id of the office, is required for delete

  @ApiOperation({
    summary: 'Eliminar un consultorio',
    description:'Elimina un consultorio del sistema mediante su ID numérico.'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Consultorio eliminado correctamente.'
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'No se encontró el consultorio que se desea eliminar.'
  })
  
  @Delete(':id')
  remove(@Body('id', ParseIntPipe) id: number) {
    return this.officeService.remove(id);
  }

}
