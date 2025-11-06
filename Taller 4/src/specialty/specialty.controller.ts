import { Body, Controller, Get, Patch, Post, Delete, Param, ParseIntPipe, HttpStatus } from '@nestjs/common';
import { SpecialtyService } from './specialty.service';
import { CreateSpecialtyDto } from './dto/create-specialty.dto';
import { UpdateSpecialtyDto } from './dto/update-speciality.dto';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('specialty')
export class SpecialtyController {
  constructor(private readonly specialtyService: SpecialtyService) {}

  // ─── POST ───────────────────────────────────────────────
  //Create a new specialty
  //http:localhost:3000/specialty
  //The JSON Body must be in the format of the CreateSpecialtyDto

  @ApiOperation({
    summary: 'Crear una nueva especialidad',
    description: 'Crea una especialidad médica en el sistema utilizando los datos enviados en el cuerpo de la solicitud.'
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'La especialidad fue creada exitosamente.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Los datos enviados son inválidos o incompletos.',
  })

  @Post()
  create(@Body()dto: CreateSpecialtyDto) {
    return this.specialtyService.create(dto);
  }

  // ─── GET ───────────────────────────────────────────────
  //Get all specialties
  //http:localhost:3000/specialty

  @ApiOperation({
    summary: 'Obtener todas las especialidades',
    description: 'Devuelve una lista con todas las especialidades médicas registradas en el sistema.'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista obtenida exitosamente.',
  })
  @Get()
  findAll() {
    return this.specialtyService.findAll();
  }

  // ─── GET ───────────────────────────────────────────────
  //Get specialty by id
  //http:localhost:3000/specialty/1
  //The param id is the id of the specialty, is required

  @ApiOperation({
    summary: 'Obtener una especialidad por ID',
    description: 'Busca y devuelve la información de una especialidad médica específica utilizando su identificador único.'
  })
  @ApiParam({
    name: 'id',
    required: true,
    type: Number,
    description: 'Identificador único de la especialidad a consultar.',
    example: 1,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Especialidad encontrada exitosamente.'
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'No se encontró una especialidad con el ID proporcionado.'
  })

  @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
      return this.specialtyService.findOne(id);
    }

  // ─── PATCH ───────────────────────────────────────────────
  //Update an specialty
  //http:localhost:3000/specialty/1
  //The param id is the id of the specialty, is required for update

  @ApiOperation({
    summary: 'Actualizar una especialidad',
    description: 'Permite modificar los datos de una especialidad existente identificada por su ID.'
  })
  @ApiParam({
    name: 'id',
    required: true,
    type: Number,
    description: 'Identificador de la especialidad que se desea actualizar.',
    example: 1,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'La especialidad fue actualizada exitosamente.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'No se encontró la especialidad con el ID proporcionado.'
  })

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateSpecialtyDto,
  ) {
    return this.specialtyService.update(id, dto);
  }

  // ─── DELETE ───────────────────────────────────────────────
  //Delete an specialty
  //http:localhost:3000/specialty/1
  //The param id is the id of the specialty, is required for delete

  @ApiOperation({
    summary: 'Eliminar una especialidad',
    description: 'Elimina una especialidad del sistema utilizando su identificador único.'
  })
  @ApiParam({
    name: 'id',
    required: true,
    type: Number,
    description: 'Identificador de la especialidad que se desea eliminar.',
    example: 1,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'La especialidad fue eliminada exitosamente.'
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'No se encontró la especialidad con el ID proporcionado.'
  })

  @Delete(':id')
  delete(@Body('id') id: number) {
    return this.specialtyService.delete(+id);
  }
}
