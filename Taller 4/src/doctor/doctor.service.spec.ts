import { Test, TestingModule } from '@nestjs/testing';
import { DoctorService } from './doctor.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Doctor } from './doctor.entity';
import { Person } from 'src/person/person.entity';
import { Specialty } from 'src/specialty/specialty.entity';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

describe('DoctorService', () => {
  let service: DoctorService;
  let doctorRepo: Repository<Doctor>;
  let personRepo: Repository<Person>;
  let specialtyRepo: Repository<Specialty>;

  const mockDoctorRepo = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    findOneBy: jest.fn(),
    delete: jest.fn(),
  };

  const mockPersonRepo = {
    findOneBy: jest.fn(),
  };

  const mockSpecialtyRepo = {
    findOneBy: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DoctorService,
        { provide: getRepositoryToken(Doctor), useValue: mockDoctorRepo },
        { provide: getRepositoryToken(Person), useValue: mockPersonRepo },
        { provide: getRepositoryToken(Specialty), useValue: mockSpecialtyRepo },
      ],
    }).compile();

    service = module.get<DoctorService>(DoctorService);
    doctorRepo = module.get(getRepositoryToken(Doctor));
    personRepo = module.get(getRepositoryToken(Person));
    specialtyRepo = module.get(getRepositoryToken(Specialty));
  });

  afterEach(() => jest.clearAllMocks());

  //  PRUEBAS CREATE 
  describe('create', () => {
    it('debe crear un doctor exitosamente', async () => {
      const dto: CreateDoctorDto = {
        personaId: 1,
        specialtyId: 2,
        licenseNumber: 'LIC999',
      };
      const person = { id: 1 };
      const specialty = { id_especialidad: 2 };
      const doctor = { id: 1, licenseNumber: 'LIC999' };

      mockPersonRepo.findOneBy.mockResolvedValue(person);
      mockSpecialtyRepo.findOneBy.mockResolvedValue(specialty);
      mockDoctorRepo.create.mockReturnValue(doctor);
      mockDoctorRepo.save.mockResolvedValue(doctor);

      const result = await service.create(dto);

      expect(personRepo.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(specialtyRepo.findOneBy).toHaveBeenCalledWith({
        id_especialidad: 2,
      });
      expect(doctorRepo.create).toHaveBeenCalledWith({
        person,
        specialty,
        licenseNumber: 'LIC999',
      });
      expect(result).toEqual(doctor);
    });

    it('debe lanzar error si no encuentra la persona', async () => {
      const dto: CreateDoctorDto = {
        personaId: 1,
        specialtyId: 2,
        licenseNumber: 'LIC999',
      };
      mockPersonRepo.findOneBy.mockResolvedValue(null);
      await expect(service.create(dto)).rejects.toThrow('Person not found');
    });

    it('debe lanzar error si no encuentra la especialidad', async () => {
      const dto: CreateDoctorDto = {
        personaId: 1,
        specialtyId: 2,
        licenseNumber: 'LIC999',
      };
      mockPersonRepo.findOneBy.mockResolvedValue({ id: 1 });
      mockSpecialtyRepo.findOneBy.mockResolvedValue(null);
      await expect(service.create(dto)).rejects.toThrow('Specialty not found');
    });
  });

  //  PRUEBAS FINDALL 
  describe('findAll', () => {
    it('debe retornar todos los doctores', async () => {
      const mockDoctors = [{ id: 1 }, { id: 2 }];
      mockDoctorRepo.find.mockResolvedValue(mockDoctors);
      const result = await service.findAll();
      expect(doctorRepo.find).toHaveBeenCalledWith({ relations: ['person'] });
      expect(result).toEqual(mockDoctors);
    });
  });

  //  PRUEBAS FINDONE 
  describe('findOne', () => {
    it('debe retornar un doctor por ID', async () => {
      const mockDoctor = { id: 1 };
      mockDoctorRepo.findOne.mockResolvedValue(mockDoctor);
      const result = await service.findOne(1);
      expect(doctorRepo.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: ['person'],
      });
      expect(result).toEqual(mockDoctor);
    });
  });

  //  PRUEBAS UPDATE 
  describe('update', () => {
    it('debe actualizar un doctor exitosamente', async () => {
      const dto: UpdateDoctorDto = {
        licenseNumber: 'NEW999',
        personaId: 1,
        specialtyId: 2,
      };
      const doctor = {
        id: 1,
        licenseNumber: 'OLD123',
        person: {},
        specialty: {},
      };
      const person = { id: 1 };
      const specialty = { id_especialidad: 2 };

      mockDoctorRepo.findOne.mockResolvedValue(doctor);
      mockPersonRepo.findOneBy.mockResolvedValue(person);
      mockSpecialtyRepo.findOneBy.mockResolvedValue(specialty);
      mockDoctorRepo.save.mockResolvedValue({
        ...doctor,
        licenseNumber: 'NEW999',
      });

      const result = await service.update(1, dto);

      expect(doctorRepo.save).toHaveBeenCalled();
      expect(result.licenseNumber).toBe('NEW999');
    });

    it('debe lanzar error si el doctor no existe', async () => {
      mockDoctorRepo.findOne.mockResolvedValue(null);
      await expect(
        service.update(1, { licenseNumber: 'NEW999' } as UpdateDoctorDto),
      ).rejects.toThrow('Doctor not found');
    });
  });

  //  PRUEBAS REMOVE 
  describe('remove', () => {
    it('debe eliminar un doctor por ID', async () => {
      const resultMock = { affected: 1 };
      mockDoctorRepo.delete.mockResolvedValue(resultMock);
      const result = await service.remove(1);
      expect(doctorRepo.delete).toHaveBeenCalledWith(1);
      expect(result).toEqual(resultMock);
    });
  });
});
