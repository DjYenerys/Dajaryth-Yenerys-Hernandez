import { Test, TestingModule } from '@nestjs/testing';
import { MedicineService } from './medicine.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Medicine } from './medicine.entity';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { UpdateMedicineDto } from './dto/update-medicine.dto';
import { NotFoundException } from '@nestjs/common';

// Mocks datos
const createDto: CreateMedicineDto = { 
    name: 'Ibuprofeno', 
    type: 'Analgesico', 
    presentation: 'Tabletas',
    stock: 100,
    description: 'Se usa para reducir la fiebre y aliviar dolores menores.',
    price: '15'
};

const mockMedicine: Medicine = { 
    id: 1, 
    ...createDto,
    prescription: [],
} as any; 

const updateDto: UpdateMedicineDto = { 
    id: 1,
    name: 'Ibuprofeno',
    type: 'Analgesico',
    presentation: 'Crema',
    stock: 800, 
    description: 'Versión en crema para uso tópico.',
    price: '20', 
};

// Mock
const mockMedicineRepository = {
    create: jest.fn(dto => dto),
    save: jest.fn(entity => Promise.resolve({ id: 1, ...entity })),
    find: jest.fn(() => Promise.resolve([mockMedicine])),
    findOne: jest.fn(options => {
        const id = options.where.id;
        return id === 1 ? Promise.resolve(mockMedicine) : Promise.resolve(undefined);
    }),

    update: jest.fn((id, dto) => Promise.resolve({ affected: id === 1 ? 1 : 0 })),
    delete: jest.fn((id: number) => Promise.resolve({ affected: id === 1 ? 1 : 0 })),
};

describe('MedicineService', () => {
    let service: MedicineService;
    let repository: Repository<Medicine>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MedicineService,
                {
                    provide: getRepositoryToken(Medicine),
                    useValue: mockMedicineRepository,
                },
            ],
        }).compile();

        service = module.get<MedicineService>(MedicineService);
        repository = module.get<Repository<Medicine>>(getRepositoryToken(Medicine));
        
        jest.clearAllMocks();
    });

    it('Deberia estar definido el servicio', () => {
        expect(service).toBeDefined();
    });

    // CREATE
    describe('create', () => {
        it('Deberia crear y guardar un nuevo medicamento, retornando la entidad con ID', async () => {
            const result = await service.create(createDto);
            expect(repository.create).toHaveBeenCalledWith(createDto);
            expect(repository.save).toHaveBeenCalled();
            expect(result).toEqual({ id: 1, ...createDto });
        });
    });

    // FIND ALL
    describe('findAll', () => {
        it('Deberia retornar un array de todos los medicamentos', async () => {
            const result = await service.findAll();
            expect(repository.find).toHaveBeenCalledWith();
            expect(result).toEqual([mockMedicine]);
        });
    });

    // FIND ONE
    describe('findOne', () => {
        it('Deberia retornar el medicamento si existe el id', async () => {
            mockMedicineRepository.findOne.mockResolvedValueOnce(mockMedicine);
            const result = await service.findOne(1);
            expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
            expect(result).toEqual(mockMedicine);
        });

        it('Deberia lanzar Exception si el medicamento NO existe', async () => {
            mockMedicineRepository.findOne.mockResolvedValueOnce(undefined);
            await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
        });
    });

    // UPDATE
    describe('update', () => {
        it('Deberia actualizar el medicamento y retornar el objeto actualizado', async () => {
            const updatedResult = { ...mockMedicine, ...updateDto };
            mockMedicineRepository.findOne.mockResolvedValueOnce(updatedResult);
            mockMedicineRepository.update.mockResolvedValueOnce({ affected: 1 } as any);

            const result = await service.update(1, updateDto);

            expect(repository.update).toHaveBeenCalledWith(1, updateDto);
            expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
        });

        it('Deberia lanzar Exception si el medicamento a actualizar no existe', async () => {
            mockMedicineRepository.update.mockResolvedValueOnce({ affected: 0 } as any);
            await expect(service.update(999, updateDto)).rejects.toThrow(NotFoundException);
            expect(repository.findOne).not.toHaveBeenCalled();
        });
    });

    // REMOVE
    describe('remove', () => {
        it('Deberia eliminar el medicamento y retornar el resultado (affected: 1)', async () => {
            const deleteResult = { affected: 1 } as any;
            mockMedicineRepository.delete.mockResolvedValueOnce(deleteResult);

            const result = await service.remove(1);

            expect(repository.delete).toHaveBeenCalledWith(1);
        });

        it('Deberia lanzar NotFoundException si el medicamento a eliminar no existe', async () => {
            mockMedicineRepository.delete.mockResolvedValueOnce({ affected: 0 } as any); 
            await expect(service.remove(999)).rejects.toThrow(NotFoundException);
        });
    });
});
