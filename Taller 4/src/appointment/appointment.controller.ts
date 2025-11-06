import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  // ─── POST ───────────────────────────────────────────────
  //Create a new appointment
  //http:localhost:3000/appointment
  //The JSON Body must be in the format of the CreateAppointmentDto
  
  @ApiOperation({
    summary: 'Crear una nueva cita médica',
    description:'Permite registrar una nueva cita médica asociando un paciente, un doctor y una oficina.'
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'La cita médica fue creada exitosamente.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Los datos enviados no cumplen con las validaciones requeridas.',
  })
  
  @Post()
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentService.create(createAppointmentDto);
  }

    // ─── GET ───────────────────────────────────────────────
    //Get all appointments
    //http:localhost:3000/appointment

    @ApiOperation({
    summary: 'Obtener todas las citas médicas',
    description:'Devuelve una lista de todas las citas médicas registradas en el sistema, incluyendo su fecha, estado y relaciones con paciente y doctor.'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Listado de citas médicas obtenido correctamente.',
  })

  @Get()
  findAll() {
    return this.appointmentService.findAll();
  }

   // ─── GET ───────────────────────────────────────────────
    //Get appointment by id
    //http:localhost:3000/appointment/1
    //The param id is the id of the appointment, is required

    @Get(':id')
  @ApiOperation({
    summary: 'Obtener una cita médica por su ID',
    description:'Busca una cita médica específica por su identificador único.'
  })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    description: 'Identificador único de la cita médica.',
    example: 1,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Cita médica encontrada exitosamente.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'No se encontró ninguna cita con el ID proporcionado.',
  })

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appointmentService.findOne(+id);
  }

  // ─── PATCH ───────────────────────────────────────────────
    //Update an appointment
    //http:localhost:3000/appointment/1
    //The param id is the id of the appointment, is required for update

    @ApiOperation({
    summary: 'Actualizar una cita médica existente',
    description:'Actualiza la información de una cita médica identificada por su ID.'
  })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    description: 'Identificador único de la cita médica a actualizar.',
    example: 1,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Cita médica actualizada correctamente.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'No se encontró ninguna cita con el ID especificado.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Los datos enviados son inválidos o incompletos.',
  })

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAppointmentDto: UpdateAppointmentDto) {
    return this.appointmentService.update(+id, updateAppointmentDto);
  }

  // ─── DELETE ───────────────────────────────────────────────
    //Delete an appointment
    //http:localhost:3000/appointment/1
    //The param id is the id of the appointment, is required for delete

    @ApiOperation({
    summary: 'Eliminar una cita médica',
    description:
      'Elimina del sistema una cita médica identificada por su ID.'
  })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    description: 'Identificador único de la cita médica a eliminar.',
    example: 1,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Cita médica eliminada correctamente.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'No se encontró ninguna cita con el ID especificado.',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appointmentService.remove(+id);
  }
}
