import { Controller, Post, Body, Get, Param, Patch, Delete, HttpStatus } from '@nestjs/common';
import { Patient } from './patient.entity';
import { CreatePatientDto } from './dto/create-patient.dto';
import { PatientService } from './patient.service';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}
  
  // ─── POST ───────────────────────────────────────────────
  //Create a new patient
  //http:localhost:3000/patient
  //The JSON Body must be in the format of the CreatePatientDto

  @ApiOperation({ 
    summary: 'Crear un nuevo paciente', 
    description: 'Registra un nuevo paciente en el sistema hospitalario con su historial médico, tipo de sangre y aseguradora.' 
  })
  @ApiResponse({ 
    status: HttpStatus.CREATED, 
    description: 'Paciente creado exitosamente.', 
  })
  @ApiResponse({ 
    status: HttpStatus.BAD_REQUEST, 
    description: 'Datos inválidos. Verifique la información enviada.' 
  })

  @Post()
  create(@Body() patientDto: CreatePatientDto) {
    return this.patientService.createPatient(patientDto);
  }

  // ─── GET ───────────────────────────────────────────────
  //Get all patients
  //http:localhost:3000/patient

  @ApiOperation({ 
    summary: 'Obtener todos los pacientes', 
    description: 'Devuelve una lista completa de todos los pacientes registrados en el sistema.' 
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Lista de pacientes obtenida correctamente.', 
  })

  @Get()
  findAll() {
    return this.patientService.findAll();
  }

  // ─── GET ───────────────────────────────────────────────
  //Get patient by id
  //http:localhost:3000/patient/1
  //The param id is the id of the patient, is required

  @ApiOperation({ 
    summary: 'Obtener un paciente por su ID', 
    description: 'Permite obtener la información detallada de un paciente específico mediante su identificador único.' 
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Paciente encontrado exitosamente.', 
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'No se encontró un paciente con el ID especificado.' 
  })

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.patientService.findOne(+id);
  }

  // ─── PATCH ───────────────────────────────────────────────
  //Update an patient
  //http:localhost:3000/patient/1
  //The param id is the id of the patient, is required for update

  @ApiOperation({ 
    summary: 'Actualizar información de un paciente', 
    description: 'Permite modificar los datos de un paciente existente, como su tipo de sangre, historial médico o aseguradora.' 
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Paciente actualizado correctamente.', 
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'No se encontró el paciente para actualizar.' 
  })

  @Patch(':id')
  update(@Param('id') id: number, @Body() patientDto: UpdatePatientDto) {
    return this.patientService.update(+id, patientDto);
  }

  // ─── DELETE ───────────────────────────────────────────────
  // Delete a patient
  // http:localhost:3000/patient/1
  // The param id is the id of the patient, is required for delete

  @ApiOperation({ 
    summary: 'Eliminar un paciente', 
    description: 'Elimina definitivamente del sistema al paciente con el ID proporcionado.' 
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Paciente eliminado exitosamente.' })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'No se encontró el paciente para eliminar.' 
  })

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.patientService.remove(+id);
  }
}
