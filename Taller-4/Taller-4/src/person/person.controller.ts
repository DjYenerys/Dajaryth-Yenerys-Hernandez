import { Controller, Post, Body, Get, Param, Patch, Delete, HttpStatus } from '@nestjs/common';
import { PersonService } from './person.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { Person, Role } from './person.entity';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';


@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  // ─── POST ───────────────────────────────────────────────
  //Create a new person
  //http:localhost:3000/person
  //The JSON Body must be in the format of the CreatePersonDto

  @ApiOperation({ 
    summary: 'Crear una nueva persona', 
    description: 'Registra una nueva persona en el sistema hospitalario, incluyendo su información básica, rol y credenciales de acceso.' 
  })
  @ApiResponse({ 
    status: HttpStatus.CREATED, 
    description: 'Persona creada exitosamente.', 
  })
  @ApiResponse({ 
    status: HttpStatus.BAD_REQUEST, 
    description: 'Datos inválidos. Verifique la información enviada.' 
  })

  @Post()
  create(@Body() dto: CreatePersonDto): Promise<Person> {
    return this.personService.create(dto);
  }

  // ─── GET ───────────────────────────────────────────────
  //Get all persons
  //http:localhost:3000/person

  @ApiOperation({ 
    summary: 'Obtener todas las personas', 
    description: 'Devuelve una lista completa de todas las personas registradas en el sistema, incluyendo doctores, pacientes y personal administrativo.' 
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Lista de personas obtenida correctamente.', 
  })

  @Get()
  findAll() {
    return this.personService.findAll();
  }

  // ─── GET ───────────────────────────────────────────────
  //Get person by id
  //http:localhost:3000/person/1
  //The param id is the id of the person, is required

  @ApiOperation({ 
    summary: 'Obtener una persona por su ID', 
    description: 'Permite obtener la información detallada de una persona específica mediante su identificador único.' 
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Persona encontrada exitosamente.', 
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'No se encontró una persona con el ID especificado.' 
  })

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.personService.findOne(id);
  }

  
  // ─── GET ───────────────────────────────────────────────
  //Get person by role
  //http:localhost:3000/person/role/Doctor
  //The param role is the role of the person, is required

  @ApiOperation({ 
    summary: 'Obtener personas por rol', 
    description: 'Devuelve todas las personas que tienen un rol específico, como "Doctor", "Paciente" o "Administrador".' 
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Personas encontradas por rol.', 
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'No se encontraron personas con el rol especificado.' })

  @Get('role/:role')
  findByRole(@Param('role') role: Role) {
    return this.personService.findByrole(role);
  }

  // ─── PATCH ───────────────────────────────────────────────
  //Update an person
  //http:localhost:3000/person/1
  //The param id is the id of the person, is required for update

  @ApiOperation({ 
    summary: 'Actualizar información de una persona', 
    description: 'Permite modificar los datos personales o de rol de una persona registrada en el sistema.' 
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Persona actualizada correctamente.'
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'No se encontró la persona para actualizar.' 
  })

  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: UpdatePersonDto) {
    return this.personService.update(id, dto);
  }

  // ─── DELETE ───────────────────────────────────────────────
  //Delete an person
  //http:localhost:3000/person/1
  //The param id is the id of the person, is required for delete

  @ApiOperation({ 
    summary: 'Eliminar una persona', 
    description: 'Elimina permanentemente del sistema a la persona asociada al ID proporcionado.' 
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Persona eliminada exitosamente.' 
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'No se encontró la persona para eliminar.' 
  })

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.personService.remove(id);
  }
}
