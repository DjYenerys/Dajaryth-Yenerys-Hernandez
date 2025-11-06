import { Test, TestingModule } from '@nestjs/testing';
import { SpecialtyService } from './specialty.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Specialty } from './specialty.entity';
import { CreateSpecialtyDto } from './dto/create-specialty.dto';
import { UpdateSpecialtyDto } from './dto/update-speciality.dto'; // Asegúrate que el nombre del archivo es 'update-speciality.dto.ts'

// 1. Definición del Mock Repository
// Usamos 'id_especialidad' ya que es la clave primaria de la entidad Specialty.
const mockSpecialtyRepository = {
    create: jest.fn(dto => dto), 
    save: jest.fn(specialty => Promise.resolve({ id_especialidad: 1, ...specialty })),
    find: jest.fn(() => Promise.resolve([
        { id_especialidad: 1, name: 'Cardiología' },
    ])),
    findOne: jest.fn(), // Mockeado por separado para casos de éxito/error
    delete: jest.fn(), 
};

describe('SpecialtyService', () => {
    let service: SpecialtyService;
    let repository: Repository<Specialty>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
        providers: [
            SpecialtyService,
            {
            provide: getRepositoryToken(Specialty),
            useValue: mockSpecialtyRepository,
            },
        ],
        }).compile();

    service = module.get<SpecialtyService>(SpecialtyService);
    repository = module.get<Repository<Specialty>>(getRepositoryToken(Specialty));
    
    jest.clearAllMocks();
    });

    it('debe estar definido', () => {
        expect(service).toBeDefined();
    });

  // PRUEBA: create
    describe('create', () => {
        it('debe crear y guardar una nueva especialidad', async () => {
            const createDto: CreateSpecialtyDto = { name: 'Odontología', descripcion: 'Cuidado dental' };
            const expectedResult = { id_especialidad: 1, ...createDto };

            mockSpecialtyRepository.save.mockResolvedValue(expectedResult); 

            const result = await service.create(createDto);

            expect(repository.create).toHaveBeenCalledWith(createDto);
            expect(repository.save).toHaveBeenCalled();
            expect(result).toEqual(expectedResult);
        });
    });

    // PRUEBA: findAll
    describe('findAll', () => {
        it('debe retornar un array de especialidades con la relación propety_doctor', async () => {
            const specialties = [{ id_especialidad: 1, name: 'Cirugía', description: 'Cirugí exitosa',  propety_doctor: [] }] as Specialty[];
            mockSpecialtyRepository.find.mockResolvedValue(specialties);

            const result = await service.findAll();

            // Verifica que se piden las relaciones para Doctor
            expect(repository.find).toHaveBeenCalledWith({ relations: ['propety_doctor'] });
            expect(result).toEqual(specialties);
        });
    });

    // PRUEBA: findOne
    describe('findOne', () => {
        const id = 5;
        const specialty = { id_especialidad: id, name: 'Pediatría' } as Specialty;

        it('debe retornar una especialidad por su ID', async () => {
            mockSpecialtyRepository.findOne.mockResolvedValue(specialty);

            const result = await service.findOne(id);

            expect(repository.findOne).toHaveBeenCalledWith({ where: { id_especialidad: id } }); 
            expect(result).toEqual(specialty);
        });

        it('debe lanzar un error si la especialidad no es encontrada', async () => {
            mockSpecialtyRepository.findOne.mockResolvedValue(null);

            // Verifica que el servicio lanza el Error
            await expect(service.findOne(id)).rejects.toThrow('Specialty not found');
        });
    });

    // PRUEBA: update
    describe('update', () => {
        const id = 6;
        const updateDto: UpdateSpecialtyDto = { description: 'Descripción nueva', name: 'Ginecología' };
        const existingSpecialty = { id_especialidad: id, name: 'Ginecología', description: 'Vieja descripción' } as Specialty;
        const updatedSpecialty = { id_especialidad: id, name: 'Ginecología', description: 'Descripción nueva' } as Specialty;
    
    it('debe actualizar la especialidad y retornar el objeto actualizado', async () => {
        // 1. Simula que encuentra la entidad existente
        mockSpecialtyRepository.findOne.mockResolvedValue(existingSpecialty);
        // 2. Simula que guarda el resultado (la entidad actualizada)
        mockSpecialtyRepository.save.mockResolvedValue(updatedSpecialty);

        const result = await service.update(id, updateDto);

        expect(repository.findOne).toHaveBeenCalledWith({ where: { id_especialidad: id } });
        // Verifica que se pasan las propiedades actualizadas al repositorio.save
        expect(repository.save).toHaveBeenCalledWith(expect.objectContaining({ 
            name: updateDto.name, 
            description: updateDto.description 
        }));
        expect(result).toEqual(updatedSpecialty);
    });

    it('debe lanzar un error si la especialidad a actualizar no es encontrada', async () => {
        mockSpecialtyRepository.findOne.mockResolvedValue(null);

        await expect(service.update(id, updateDto)).rejects.toThrow('Specialty not found');
    });
});

    // PRUEBA: delete
    describe('delete', () => {
        const id = 7;
        const specialty = { id_especialidad: id, name: 'Oftalmología' } as Specialty;
        const deleteResult = { affected: 1 };
    
        it('debe eliminar la especialidad y retornar el resultado de la eliminación', async () => {
            // 1. Simula que encuentra la entidad existente (para verificar la existencia)
            mockSpecialtyRepository.findOne.mockResolvedValue(specialty);
            // 2. Simula que la eliminación es exitosa
            mockSpecialtyRepository.delete.mockResolvedValue(deleteResult);

            const result = await service.delete(id);

            expect(repository.findOne).toHaveBeenCalledWith({ where: { id_especialidad: id } });
            expect(repository.delete).toHaveBeenCalledWith(id); 
            expect(result).toEqual(deleteResult);
        });

        it('debe lanzar un error si la especialidad a eliminar no es encontrada', async () => {
            mockSpecialtyRepository.findOne.mockResolvedValue(null);

        await expect(service.delete(id)).rejects.toThrow('Specialty not found');
        });
    });
});