import { Test, TestingModule } from '@nestjs/testing';
import { MedicineController } from './medicine.controller';
import { MedicineService } from './medicine.service';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { UpdateMedicineDto } from './dto/update-medicine.dto';
import { Medicine } from './medicine.entity'; // Asegúrate de que esta ruta sea correcta

// 1. Se define el Mock Service
const mockMedicineService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
};

describe('MedicineController', () => {
    let controller: MedicineController;
    let service: MedicineService; 

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [MedicineController],
        providers: [
            {
                provide: MedicineService, 
                useValue: mockMedicineService,
            },
        ],
        }).compile();

        controller = module.get<MedicineController>(MedicineController);
        service = module.get<MedicineService>(MedicineService);
    
        jest.clearAllMocks();
    });

    it('debe estar definido', () => {
    expect(controller).toBeDefined();
    });

    // PRUEBA del método POST (create)
    describe('create', () => {
        it('debe llamar al servicio.create con el DTO correcto y devolver el medicamento creado', async () => {
            const createDto: CreateMedicineDto = { name: 'Ibuprofeno', unit: 'mg', dose: 600, presentation: 'Tabletas' } as any;
            const createdMedicine: Medicine = { id: 1, ...createDto } as any;

            mockMedicineService.create.mockResolvedValue(createdMedicine);

            const result = await controller.create(createDto);

            expect(service.create).toHaveBeenCalledWith(createDto);
            expect(result).toEqual(createdMedicine);
        });
    
    });

    // PRUEBA del método GET (findAll)
    describe('findAll', () => {
        it('debe llamar al servicio.findAll y retornar un array de medicamentos', async () => {
            const medicineArray: Medicine[] = [{ id: 1, name: 'Ibuprofeno', unit: 'mg', dose: 600, presentation: 'Tabletas' }] as any;

            mockMedicineService.findAll.mockResolvedValue(medicineArray);

            const result = await controller.findAll();

            expect(service.findAll).toHaveBeenCalled();
            expect(result).toEqual(medicineArray);
        });
    });

    // PRUEBA del método GET (findOne)
    describe('findOne', () => {
        it('debe llamar al servicio.findOne con el ID convertido a number', async () => {
            // Pasamos '1' (string) para cumplir con la firma del controlador
            const id = '1'; 
            const medicine: Medicine = { id: 1, name: 'Paracetamol', unit: 'mg', dose: 500, presentation: 'Tabletas' } as any;

            mockMedicineService.findOne.mockResolvedValue(medicine);

            const result = await controller.findOne(id);

            // El controlador hace la conversión interna (+id) antes de llamar al servicio
            expect(service.findOne).toHaveBeenCalledWith(1); 
            expect(result).toEqual(medicine);
        });
    });

  // PRUEBA del método PATCH (update)
    describe('update', () => {
        it('debe llamar al servicio.update con el ID convertido a number y el DTO correcto', async () => {
            const id = '1'; 
            const updateDto: UpdateMedicineDto = { dose: 1000 } as any;
            const updatedMedicine: Medicine = { id: 1, name: 'Ibuprofeno', dose: 1000 } as any;

            mockMedicineService.update.mockResolvedValue(updatedMedicine);

            const result = await controller.update(id, updateDto);

            // El controlador convierte el string a number antes de llamar al servicio
            expect(service.update).toHaveBeenCalledWith(1, updateDto); 
            expect(result).toEqual(updatedMedicine);
        });
    });

  // PRUEBA del método DELETE (remove)
    describe('remove', () => {
        it('debe llamar al servicio.remove con el ID convertido a number', async () => {
            // Pasamos '1' (string) para cumplir con la firma del controlador
            const id = '1'; 
            const removeResult: any = { affected: 1 }; // Representa el resultado de TypeORM

            mockMedicineService.remove.mockResolvedValue(removeResult);

            const result = await controller.remove(id);

            // El controlador convierte el string a number antes de llamar al servicio
            expect(service.remove).toHaveBeenCalledWith(1);
            expect(result).toEqual(removeResult);
        });
    });
});