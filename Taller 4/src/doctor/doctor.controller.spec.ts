import { Test, TestingModule } from '@nestjs/testing';
import { DoctorController } from './doctor.controller';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { NotFoundException, BadRequestException } from '@nestjs/common';

//  Mocks de datos 
const mockDoctor = {
  id: 1,
  licenseNumber: 'LIC123',
  person: { id: 1, name: 'John Doe' },
  specialty: { id_especialidad: 2, nombre: 'Cardiología' },
};

const createDto: CreateDoctorDto = {
  personaId: 1,
  specialtyId: 2,
  licenseNumber: 'LIC123',
};

const updateDto = { licenseNumber: 'NEW999' } as UpdateDoctorDto;

// Mock del servicio 
const mockDoctorService = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

describe('DoctorController', () => {
  let controller: DoctorController;
  let service: DoctorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DoctorController],
      providers: [
        {
          provide: DoctorService,
          useValue: mockDoctorService,
        },
      ],
    }).compile();

    controller = module.get<DoctorController>(DoctorController);
    service = module.get<DoctorService>(DoctorService);
  });

  it('debe estar definido', () => {
    expect(controller).toBeDefined();
  });

  //  PRUEBAS CREATE 
  describe('create', () => {
    it('debe crear un doctor y devolverlo (Caso de Éxito)', async () => {
      mockDoctorService.create.mockResolvedValue(mockDoctor);

      const result = await controller.create(createDto);
      expect(service.create).toHaveBeenCalledWith(createDto);
      expect(result).toEqual(mockDoctor);
    });

    it('debe lanzar NotFoundException si la persona no existe', async () => {
      mockDoctorService.create.mockRejectedValue(
        new NotFoundException('Person not found'),
      );
      await expect(controller.create(createDto)).rejects.toThrow(
        NotFoundException,
      );
      expect(service.create).toHaveBeenCalledWith(createDto);
    });

    it('debe lanzar BadRequestException para errores genéricos', async () => {
      mockDoctorService.create.mockRejectedValue(
        new BadRequestException('Invalid data'),
      );
      await expect(controller.create(createDto)).rejects.toThrow(
        BadRequestException,
      );
      expect(service.create).toHaveBeenCalledWith(createDto);
    });
  });

  //  PRUEBAS FINDALL 
  describe('findAll', () => {
    it('debe retornar una lista de doctores', async () => {
      mockDoctorService.findAll.mockResolvedValue([mockDoctor]);
      const result = await controller.findAll();
      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual([mockDoctor]);
    });
  });

  //  PRUEBAS FINDONE 
  describe('findOne', () => {
    it('debe retornar un doctor por ID', async () => {
      mockDoctorService.findOne.mockResolvedValue(mockDoctor);
      const result = await controller.findOne(1);
      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockDoctor);
    });

    it('debe lanzar NotFoundException si no existe', async () => {
      mockDoctorService.findOne.mockRejectedValue(
        new NotFoundException('Doctor not found'),
      );
      await expect(controller.findOne(999)).rejects.toThrow(NotFoundException);
      expect(service.findOne).toHaveBeenCalledWith(999);
    });
  });

  //  PRUEBAS UPDATE 
  describe('update', () => {
    it('debe actualizar un doctor y retornar el resultado', async () => {
      const updatedDoctor = { ...mockDoctor, licenseNumber: 'NEW999' };
      mockDoctorService.update.mockResolvedValue(updatedDoctor);

      const result = await controller.update(1, updateDto);
      expect(service.update).toHaveBeenCalledWith(1, updateDto);
      expect(result).toEqual(updatedDoctor);
    });

    it('debe lanzar NotFoundException si el doctor no existe', async () => {
      mockDoctorService.update.mockRejectedValue(
        new NotFoundException('Doctor not found'),
      );
      await expect(controller.update(999, updateDto)).rejects.toThrow(
        NotFoundException,
      );
      expect(service.update).toHaveBeenCalledWith(999, updateDto);
    });
  });

  //  PRUEBAS REMOVE 
  describe('remove', () => {
    it('debe eliminar un doctor y retornar el resultado', async () => {
      const deleteResult = { affected: 1 };
      mockDoctorService.remove.mockResolvedValue(deleteResult);
      const result = await controller.remove(1);
      expect(service.remove).toHaveBeenCalledWith(1);
      expect(result).toEqual(deleteResult);
    });
  });
});
