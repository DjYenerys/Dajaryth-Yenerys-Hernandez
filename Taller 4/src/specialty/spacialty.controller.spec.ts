import { Test, TestingModule } from '@nestjs/testing';
import { SpecialtyController } from './specialty.controller';
import { SpecialtyService } from './specialty.service';
import { CreateSpecialtyDto } from './dto/create-specialty.dto';
import { UpdateSpecialtyDto } from './dto/update-speciality.dto';
import { Specialty } from './specialty.entity';

// 1. Definición del Mock Service
// La clave de la entidad es 'id_especialidad'
const mockSpecialtyService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
}

describe('SpecialtyController', () => {
    let controller: SpecialtyController;
    let service: SpecialtyService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [SpecialtyController],
            providers: [
                {
                    provide: SpecialtyService,
                    useValue: mockSpecialtyService,
                },
            ],
        }).compile();

        controller = module.get<SpecialtyController>(SpecialtyController);
        service = module.get<SpecialtyService>(SpecialtyService);

        jest.clearAllMocks(); //para limpiar el mock
    });

    it('debe estar definido', () => {
        expect(controller).toBeDefined();
    });

  // PRUEBA: create
    describe('create', () => {
        it('debe llamar a service.create con el DTO correcto y retornar la especialidad creada', async () => {
            const createDto: CreateSpecialtyDto = { name: 'Cardiología', descripcion: 'Tratamiento del corazón' };
            const createdSpecialty: Specialty = { id_especialidad: 1, ...createDto } as any;

            mockSpecialtyService.create.mockResolvedValue(createdSpecialty);

            const result = await controller.create(createDto);

            expect(service.create).toHaveBeenCalledWith(createDto);
            expect(result).toEqual(createdSpecialty);
        });
    });

    // PRUEBA: findAll
    describe('findAll', () => {
        it('debe llamar a service.findAll y retornar un array de especialidades', async () => {
            const specialtyArray: Specialty[] = [{ id_especialidad: 1, name: 'Pediatría' }] as any;

            mockSpecialtyService.findAll.mockResolvedValue(specialtyArray);

            const result = await controller.findAll();

            expect(service.findAll).toHaveBeenCalled();
            expect(result).toEqual(specialtyArray);
        });
    });

    // PRUEBA: findOne
    describe('findOne', () => {
    // Nota: El controlador usa @Param('id', ParseIntPipe) lo que garantiza que 'id' es number
        it('debe llamar a service.findOne con el ID numérico', async () => {
            const id = 2;
            const specialty: Specialty = { id_especialidad: id, name: 'Neurología' } as any;

            mockSpecialtyService.findOne.mockResolvedValue(specialty);

            const result = await controller.findOne(id);

            expect(service.findOne).toHaveBeenCalledWith(id); 
            expect(result).toEqual(specialty);
        });
    });

    // PRUEBA: update
    describe('update', () => {
        it('debe llamar a service.update con el ID y el DTO correctos', async () => {
            const id = 3;
            const updateDto = { description: 'Nueva descripción' } as UpdateSpecialtyDto;
            const updatedSpecialty: Specialty = { id_especialidad: id, name: 'Ortopedia', description: 'Nueva descripción' } as any;

            mockSpecialtyService.update.mockResolvedValue(updatedSpecialty);

            const result = await controller.update(id, updateDto);

            expect(service.update).toHaveBeenCalledWith(id, updateDto); 
            expect(result).toEqual(updatedSpecialty);
        });
    });

    // PRUEBA: remove
    describe('delete', () => {
        // El controlador llama al método 'delete' en el servicio, según el código de 'specialty.controller.ts'
        it('debe llamar a service.delete con el ID numérico', async () => {
            const id = 4;
            const deleteResult: any = { affected: 1 }; 
            mockSpecialtyService.delete.mockResolvedValue(deleteResult);

            const result = await controller.delete(id);
            expect(service.delete).toHaveBeenCalledWith(id);
            expect(result).toEqual(deleteResult);
        });
    });
});