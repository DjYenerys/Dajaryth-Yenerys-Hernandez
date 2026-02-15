import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Crear autenticación',
    description: 'Crea una nueva entidad de autenticación. Generalmente utilizada para registrar credenciales iniciales o pruebas.'
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Autenticación creada correctamente.'
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Datos inválidos en la solicitud.'
  })

  @Post()
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }


    @ApiOperation({
    summary: 'Obtener todas las autenticaciones',
    description: 'Devuelve la lista completa de registros de autenticación almacenados en la base de datos.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de autenticaciones obtenida correctamente.',
  })

  @Get()
  findAll() {
    return this.authService.findAll();
  }


  @ApiOperation({
    summary: 'Obtener autenticación por ID',
    description: 'Obtiene una autenticación específica mediante su identificador único.',
  })
  @ApiParam({
    name: 'id',
    required: true,
    type: Number,
    description: 'ID único de la autenticación a consultar.',
    example: 1,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Autenticación obtenida correctamente.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'No se encontró la autenticación con el ID especificado.',
  })

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }


  @ApiOperation({
    summary: 'Actualizar autenticación',
    description: 'Actualiza los datos de una autenticación existente mediante su ID.',
  })
  @ApiParam({
    name: 'id',
    required: true,
    type: Number,
    description: 'ID único de la autenticación que se desea actualizar.',
    example: 1,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Autenticación actualizada correctamente.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Datos inválidos o incompletos para actualizar la autenticación.',
  })

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }


  @ApiOperation({
    summary: 'Eliminar autenticación',
    description: 'Elimina una autenticación existente mediante su ID.',
  })
  @ApiParam({
    name: 'id',
    required: true,
    type: Number,
    description: 'ID único de la autenticación que se desea eliminar.',
    example: 1,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Autenticación eliminada correctamente.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'No se encontró la autenticación a eliminar.',
  })

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
