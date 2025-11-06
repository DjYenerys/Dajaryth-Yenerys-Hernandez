import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { UpdateMedicineDto } from './dto/update-medicine.dto';
import { MedicineService } from './medicine.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('medicine')
export class MedicineController {
  constructor(private readonly medicineService: MedicineService) {}

  // ─── POST ───────────────────────────────────────────────
  //Create a new medicine
  //http:localhost:3000/medicine
  //The JSON Body must be in the format of the CreateMedicineDto

  @ApiOperation({
    summary: 'Crear un nuevo medicamento',
    description:'Permite registrar un nuevo medicamento en el sistema.'
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'El medicamento fue creado exitosamente.'
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Los datos proporcionados no cumplen con las validaciones requeridas.'
  })

  @Post()
  create(@Body() createMedicineDto: CreateMedicineDto) {
    return this.medicineService.create(createMedicineDto);
  } 

  // ─── GET ───────────────────────────────────────────────
  //Get all medicines
  //http:localhost:3000/medicine

  @ApiOperation({
    summary: 'Obtener todos los medicamentos',
    description: 'Devuelve la lista completa de medicamentos registrados en el sistema.'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de medicamentos obtenida correctamente.'
  })

  @Get()
  findAll() {
    return this.medicineService.findAll();
  }

  // ─── GET ───────────────────────────────────────────────
  //Get medicine by id
  //http:localhost:3000/medicine/1
  //The param id is the id of the medicine, is required

  @ApiOperation({
    summary: 'Obtener un medicamento por su ID',
    description:'Permite consultar la información detallada de un medicamento específico mediante su ID numérico.'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Medicamento encontrado exitosamente.'
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'No se encontró un medicamento con el ID especificado.'
  })

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.medicineService.findOne(+id);
  }

  // ─── PATCH ───────────────────────────────────────────────
  //Update an medicine
  //http:localhost:3000/medicine/1
  //The param id is the id of the medicine, is required for update

  @ApiOperation({
    summary: 'Actualizar un medicamento',
    description:'Actualiza la información de un medicamento existente.'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Medicamento actualizado correctamente.'
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'No se encontró el medicamento que se desea actualizar.'
  })

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMedicineDto: UpdateMedicineDto) {
    return this.medicineService.update(+id, updateMedicineDto);
  }

  // ─── DELETE ───────────────────────────────────────────────
  //Delete an medicine
  //http:localhost:3000/medicine/1
  //The param id is the id of the medicine, is required for delete

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar un medicamento',
    description:'Elimina un medicamento del sistema mediante su ID numérico.'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Medicamento eliminado correctamente.'
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'No se encontró el medicamento que se desea eliminar.'
  })

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.medicineService.remove(+id);
  }

}
