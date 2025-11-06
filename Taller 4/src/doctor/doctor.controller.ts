import { Controller, Post, Body, Get, Param, Patch, Delete, HttpStatus } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}


  // ─── POST ───────────────────────────────────────────────
  //Create a new doctor
  //http:localhost:3000/doctor
  //The JSON Body must be in the format of the CreateDoctorDto

  @ApiOperation({
    summary: 'Registrar un nuevo doctor',
    description:
      'Crea un nuevo registro de doctor en el sistema. ' +
      'Debe asociarse a una persona existente (`personaId`) y una especialidad (`specialtyId`). ' +
      'El número de licencia médica (`licenseNumber`) es obligatorio.',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Doctor registrado exitosamente.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Datos inválidos o incompletos en la solicitud.',
  })

  @Post()
  create(@Body() dto: CreateDoctorDto) {
    return this.doctorService.create(dto);
  }

  // ─── GET ───────────────────────────────────────────────
  //Get all doctors
  //http:localhost:3000/doctor  

  @ApiOperation({
    summary: 'Obtener todos los doctores',
    description:
      'Devuelve una lista completa de doctores registrados en el sistema, ' +
      'incluyendo su número de licencia y la especialidad a la que pertenecen.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Listado de doctores obtenido correctamente.',
  })

  @Get()
  findAll() {
    return this.doctorService.findAll();
  }

  // ─── GET ───────────────────────────────────────────────
  //Get doctor by id
  //http:localhost:3000/doctor/1
  //The param id is the id of the doctor, is required

  @ApiOperation({
    summary: 'Obtener un doctor por su ID',
    description:
      'Permite obtener los detalles de un doctor específico, incluyendo ' +
      'su número de licencia, especialidad y persona asociada.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID del doctor a consultar.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Doctor encontrado exitosamente.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'No se encontró ningún doctor con el ID proporcionado.',
  })

  @Get(':id')
  findOne(@Param(('id')) id: number) {
    return this.doctorService.findOne(+id);
  }

  // ─── PATCH ───────────────────────────────────────────────
  //Update an doctor
  //http:localhost:3000/doctor/1
  //The param id is the id of the doctor, is required for update

  @ApiOperation({
    summary: 'Actualizar un doctor existente',
    description:
      'Permite actualizar los datos de un doctor específico. ' +
      'Puede modificarse su número de licencia, especialidad o persona asociada.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID del doctor que se desea actualizar.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Doctor actualizado exitosamente.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Datos inválidos o incompletos en la solicitud.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'No se encontró ningún doctor con el ID especificado.',
  })

  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: UpdateDoctorDto) {
    return this.doctorService.update(+id, dto);
  }

  // ─── DELETE ───────────────────────────────────────────────
  //Delete an doctor
  //http:localhost:3000/doctor/1
  //The param id is the id of the doctor, is required for delete
  
  @ApiOperation({
    summary: 'Eliminar un doctor',
    description:
      'Elimina el registro de un doctor del sistema utilizando su ID. ' +
      'Esta acción no se puede deshacer.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID del doctor a eliminar.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Doctor eliminado exitosamente.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'No se encontró ningún doctor con el ID especificado.',
  })
  
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.doctorService.remove(+id);
  }
}
