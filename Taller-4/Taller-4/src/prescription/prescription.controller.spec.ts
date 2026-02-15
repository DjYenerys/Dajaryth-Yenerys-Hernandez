import { Test, TestingModule } from '@nestjs/testing';
import { PrescriptionController } from '../prescription/prescription.controller';
import { PrescriptionService } from '../prescription/prescription.service';
import { CreatePrescriptionDto } from '../prescription/dto/create-prescription.dto';
import { UpdatePrescriptionDto } from '../prescription/dto/update-prescription.dto';
import { Prescription } from '../prescription/prescription.entity';
import { HttpStatus } from '@nestjs/common'; 

// 1. Definir un Mock para el Servicio
// Esto simula todas las funciones del servicio para el controlador.
const mockPrescriptionService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
};

describe('PrescriptionController', () => {
    let controller: PrescriptionController;
    let service: PrescriptionService;

    beforeEach(async () => {
        // Configuración del módulo de prueba
        const module: TestingModule = await Test.createTestingModule({
        controllers: [PrescriptionController],
        providers: [
            {
                provide: PrescriptionService,
                useValue: mockPrescriptionService, // Usamos el mock en lugar del servicio real
            },
        ],
    }).compile();

    controller = module.get<PrescriptionController>(PrescriptionController);
    service = module.get<PrescriptionService>(PrescriptionService);

    // Limpiar las llamadas a los mocks antes de cada prueba
    jest.clearAllMocks();
    });

    it('el controlador debe estar definido', () => {
        expect(controller).toBeDefined();
    });

  // PRUEBA DEL MÉTODO POST (create)

    describe('create', () => {
        it('debe crear una prescripción y retornar el objeto creado', async () => {
        
        // 1. Datos de entrada (DTO)
        const testDate = new Date();
        const dateString = testDate.toISOString();
        const createDto: CreatePrescriptionDto = {
            date: dateString as any,
            observations: 'Tomar con alimentos',
            quantity: 10,
            duration: 5,
            appointmentId: 1, 
            medicineId: 1,    
            details: [], 
        };

        // 2. Mock de Objetos de Relación Mínimos (para cumplir con la Entidad)
        // La entidad Prescription necesita los objetos completos, no solo los IDs
        const mockAppointment = { id: 1 } as any;
        const mockMedicine = { id: 1 } as any;
        
        // 3. Resultado esperado (Entidad Prescription)
        const expectedResult: Prescription = { 
            id: 1, 
            date: testDate,
            observations: createDto.observations,
            quantity: createDto.quantity,
            duration: createDto.duration, 
            appointment: mockAppointment, 
            medicine: mockMedicine,
            details: createDto.details,
        } as Prescription; 
        
        // 4. Configurar el mock para que retorne el resultado esperado
        mockPrescriptionService.create.mockResolvedValue(expectedResult);

        // 5. Ejecutar y verificar
        const result = await controller.create(createDto);

        expect(service.create).toHaveBeenCalledWith(createDto);
        expect(result).toEqual(expectedResult);
        });
    });

  // PRUEBA DEL MÉTODO GET (findAll)

    describe('findAll', () => {
        it('debe retornar un arreglo de todas las prescripciones', async () => {
        const mockPrescriptions = [{ id: 1, observations: 'A' }, { id: 2, observations: 'B' }] as Prescription[];
        mockPrescriptionService.findAll.mockResolvedValue(mockPrescriptions);

        const result = await controller.findAll();

        expect(service.findAll).toHaveBeenCalled();
        expect(result).toEqual(mockPrescriptions);
        });
    });

    // PRUEBA DEL MÉTODO GET (findOne)

    describe('findOne', () => {
        it('debe retornar una prescripción por ID', async () => {
            const id = '5';
            const mockPrescription = { id: 5, observations: 'Solo en la mañana' } as Prescription;

            mockPrescriptionService.findOne.mockResolvedValue(mockPrescription);

            const result = await controller.findOne(id);

            // Verifica que se llamó con el ID convertido a número
            expect(service.findOne).toHaveBeenCalledWith(5); 
            expect(result).toEqual(mockPrescription);
        });

        it('debe retornar null o lanzar un error si no se encuentra el ID (depende del servicio)', async () => {
            const id = '999';
            mockPrescriptionService.findOne.mockResolvedValue(null);

            const result = await controller.findOne(id);

            expect(service.findOne).toHaveBeenCalledWith(999);
            expect(result).toBeNull();
        });
    });
  // PRUEBA DEL MÉTODO PATCH (update)

    describe('update', () => {
        it('debe actualizar una prescripción y retornar la versión actualizada', async () => {
            const id = '1';
            const updateDto: UpdatePrescriptionDto = { quantity: 15 } as UpdatePrescriptionDto;
            const updatedPrescription = { id: 1, quantity: 15, observations: 'Original' } as Prescription;

            mockPrescriptionService.update.mockResolvedValue(updatedPrescription);

            const result = await controller.update(id, updateDto);

            expect(service.update).toHaveBeenCalledWith(1, updateDto);
            expect(result).toEqual(updatedPrescription);
        });
    });

  // PRUEBA DEL MÉTODO DELETE (remove)

    describe('remove', () => {
        it('debe eliminar una prescripción y retornar el resultado de TypeORM', async () => {
            const id = '2';
            const deleteResult = { affected: 1 } as any;

            mockPrescriptionService.remove.mockResolvedValue(deleteResult);

            const result = await controller.remove(id);

            expect(service.remove).toHaveBeenCalledWith(2);
            expect(result).toEqual(deleteResult);
        });
    });
});