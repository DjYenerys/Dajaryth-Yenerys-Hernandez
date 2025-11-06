import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { PrescriptionService } from './prescription.service';
import { CreatePrescriptionDto } from './dto/create-prescription.dto';
import { UpdatePrescriptionDto } from './dto/update-prescription.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('prescription')
export class PrescriptionController {
  constructor(private readonly prescriptionService: PrescriptionService) {}

  // ─── POST ───────────────────────────────────────────────
  //Create a new prescription
  //http:localhost:3000/prescription
  //The JSON Body must be in the format of the CreatePrescriptionDto

  @ApiOperation({ 
    summary: 'Crear una nueva prescripción', 
    description: 'Registra una nueva prescripción médica en el sistema, incluyendo los detalles del medicamento, cantidad, duración y observaciones.' 
  })
  @ApiResponse({ 
    status: HttpStatus.CREATED, 
    description: 'Prescripción creada exitosamente.' 
  })
  @ApiResponse({ 
    status: HttpStatus.BAD_REQUEST, 
    
    description: 'Datos inválidos o incompletos.' })

  @Post()
  create(@Body() createPrescriptionDto: CreatePrescriptionDto) {
    return this.prescriptionService.create(createPrescriptionDto);
  }

  // ─── GET ───────────────────────────────────────────────
  //Get all prescriptions
  //http:localhost:3000/prescription

  @ApiOperation({ 
    summary: 'Obtener todas las prescripciones', 
    description: 'Devuelve un listado completo de todas las prescripciones médicas registradas en el sistema.' 
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Lista de prescripciones obtenida correctamente.' 
  })

  @Get()
  findAll() {
    return this.prescriptionService.findAll();
  }

  // ─── GET ───────────────────────────────────────────────
  //Get prescription by id
  //http:localhost:3000/prescription/1
  //The param id is the id of the prescription, is required

  @ApiOperation({ 
    summary: 'Obtener una prescripción por ID', 
    description: 'Obtiene la información detallada de una prescripción médica específica mediante su identificador único.' 
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Prescripción encontrada exitosamente.' 
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'No se encontró la prescripción con el ID especificado.' 
  })

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.prescriptionService.findOne(+id);
  }

  // ─── PATCH ───────────────────────────────────────────────
  //Update an prescription
  //http:localhost:3000/prescription/1
  //The param id is the id of the prescription, is required for update

  @ApiOperation({ 
    summary: 'Actualizar una prescripción', 
    description: 'Permite modificar los datos de una prescripción médica existente, como observaciones, cantidad o duración.' 
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Prescripción actualizada correctamente.' 
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'No se encontró la prescripción para actualizar.' })

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePrescriptionDto: UpdatePrescriptionDto) {
    return this.prescriptionService.update(+id, updatePrescriptionDto);
  }

  // ─── DELETE ───────────────────────────────────────────────
  //Delete an prescription
  //http:localhost:3000/prescription/1
  //The param id is the id of the prescription, is required for delete

  @ApiOperation({ 
    summary: 'Eliminar una prescripción', 
    description: 'Elimina del sistema la prescripción médica asociada al ID proporcionado.' 
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Prescripción eliminada exitosamente.' 
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'No se encontró la prescripción para eliminar.' 
  })

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.prescriptionService.remove(+id);
  }
}
