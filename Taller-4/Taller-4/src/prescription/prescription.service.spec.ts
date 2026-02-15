import { Test, TestingModule } from '@nestjs/testing';
import { PrescriptionService } from '../prescription/prescription.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Prescription } from '../prescription/prescription.entity';
import { Appointment } from '../appointment/appointment.entity'; 
import { Medicine } from '../medicine/medicine.entity'; 
import { PrescriptionDetail } from '../prescription-detail/prescription-detail.entity'; 
import { Repository } from 'typeorm';
import { CreatePrescriptionDto } from '../prescription/dto/create-prescription.dto';
import { UpdatePrescriptionDto } from '../prescription/dto/update-prescription.dto';

// 1. Mocks de Repositorios de TypeORM
const mockRepository = () => ({
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
});

// Definimos los tipos de los mocks
type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const mockPrescriptionRepository: MockRepository<Prescription> = mockRepository();
const mockAppointmentRepository: MockRepository<Appointment> = mockRepository();
const mockMedicineRepository: MockRepository<Medicine> = mockRepository();
const mockPrescriptionDetailRepository: MockRepository<PrescriptionDetail> = mockRepository();

// Definición de datos de prueba
const testDate = new Date();
const dateString = testDate.toISOString();

const createDto: CreatePrescriptionDto = {
    date: dateString as any,
    observations: 'Tomar 10 días',
    quantity: 10,
    duration: 10,
    appointmentId: 1,
    medicineId: 1,
    details: [],
};

const mockAppointment = { id: 1 } as Appointment;
const mockMedicine = { id: 1 } as Medicine;

const expectedPrescription: Prescription = {
    id: 1,
    date: testDate,
    observations: createDto.observations,
    quantity: createDto.quantity,
    duration: createDto.duration,
    appointment: mockAppointment,
    medicine: mockMedicine,
    details: [] as PrescriptionDetail[],
} as Prescription;


describe('PrescriptionService', () => {
    let service: PrescriptionService;
    let prescriptionRepository: MockRepository<Prescription>;
    let appointmentRepository: MockRepository<Appointment>;
    let medicineRepository: MockRepository<Medicine>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
        providers: [
            PrescriptionService,
            {
            provide: getRepositoryToken(Prescription),
            useValue: mockPrescriptionRepository,
            },
            {
            provide: getRepositoryToken(Appointment),
            useValue: mockAppointmentRepository,
            },
            {
            provide: getRepositoryToken(Medicine),
            useValue: mockMedicineRepository,
            },
            {
            provide: getRepositoryToken(PrescriptionDetail),
            useValue: mockPrescriptionDetailRepository,
            },
        ],
    }).compile();

        service = module.get<PrescriptionService>(PrescriptionService);
        prescriptionRepository = module.get(getRepositoryToken(Prescription));
        appointmentRepository = module.get(getRepositoryToken(Appointment));
        medicineRepository = module.get(getRepositoryToken(Medicine));
    });

    // Limpiar mocks después de cada prueba
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('debe estar definido', () => {
        expect(service).toBeDefined();
    });

    // --- PRUEBA DEL MÉTODO CREATE ---
    describe('create', () => {
        it(' debe crear y guardar una nueva prescripción con relaciones', async () => {
        // Configuración de Mocks
        appointmentRepository.findOne.mockResolvedValue(mockAppointment);
        medicineRepository.findOne.mockResolvedValue(mockMedicine);

        // ⭐️ CORRECCIÓN 1: Se elimina el typo y se simplifica el mock para devolver el objeto esperado.
        prescriptionRepository.create.mockReturnValue(expectedPrescription);

        prescriptionRepository.save.mockResolvedValue(expectedPrescription);

        // Ejecución
        const result = await service.create(createDto);

        // Verificación
        expect(appointmentRepository.findOne).toHaveBeenCalledWith({ where: { id: createDto.appointmentId } });
        expect(medicineRepository.findOne).toHaveBeenCalledWith({ where: { id: createDto.medicineId } });
        expect(prescriptionRepository.create).toHaveBeenCalledWith({
            // El servicio pasa el string del DTO a .create() de TypeORM.
            date: dateString, 
            observations: createDto.observations,
            quantity: createDto.quantity,
            duration: createDto.duration,
            appointment: mockAppointment,
            medicine: mockMedicine,
        });
        expect(prescriptionRepository.save).toHaveBeenCalled();
        expect(result).toEqual(expectedPrescription);
    });

    it('debe lanzar un error si la cita no existe', async () => {
        // Solo mockeamos el Appointment como nulo
        appointmentRepository.findOne.mockResolvedValue(null);
        // Ejecución y Verificación del error
        await expect(service.create(createDto)).rejects.toThrow('Appointment not found');
    });
});

    // --- PRUEBA DEL MÉTODO FIND ALL ---
    describe('findAll', () => {
        it('debe retornar un arreglo de prescripciones con relaciones', async () => {
            const prescriptions = [expectedPrescription, { ...expectedPrescription, id: 2 }];
            prescriptionRepository.find.mockResolvedValue(prescriptions);

            const result = await service.findAll();

            expect(prescriptionRepository.find).toHaveBeenCalledWith({
            relations: ['appointment', 'medicine'],
            });
            expect(result).toEqual(prescriptions);
        });
    });

    // --- PRUEBA DEL MÉTODO FIND ONE ---
    describe('findOne', () => {
        it('debe retornar una prescripción si el ID existe', async () => {
            prescriptionRepository.findOne.mockResolvedValue(expectedPrescription);
            const id = 1;

            const result = await service.findOne(id);

            expect(prescriptionRepository.findOne).toHaveBeenCalledWith({ 
                where: { id }, 
                relations: ['appointment', 'medicine'] 
            });
        expect(result).toEqual(expectedPrescription);
    });

    it(' debe retornar nulo si la prescripción no existe', async () => {
        prescriptionRepository.findOne.mockResolvedValue(null);
        const id = 999;

        const result = await service.findOne(id);

        expect(result).toBeNull();
    });
});

    // --- PRUEBA DEL MÉTODO UPDATE ---
    describe('update', () => {
        it('debe actualizar y retornar la prescripción actualizada', async () => {
            const id = 1;
            const updateDto: UpdatePrescriptionDto = { quantity: 5 };
            const updatedPrescription = { ...expectedPrescription, quantity: 5 };

            // 1. Simular la actualización exitosa (TypeORM update)
            prescriptionRepository.update.mockResolvedValue({ affected: 1 });

            // 2. Simular la obtención de la prescripción actualizada (findOne)
            prescriptionRepository.findOne.mockResolvedValue(updatedPrescription);

            const result = await service.update(id, updateDto);

            expect(prescriptionRepository.update).toHaveBeenCalledWith(id, updateDto);
            expect(prescriptionRepository.findOne).toHaveBeenCalledWith({ 
                where: { id }, 
                relations: ['appointment', 'medicine'] 
            });
            expect(result).toEqual(updatedPrescription);
        });
    });

    // --- PRUEBA DEL MÉTODO REMOVE ---
    // ⭐️ CORRECCIÓN 2: Se eliminó el código de servicio mal colocado y se corrigió la sintaxis.
    describe('remove', () => {
        it('debe eliminar la prescripción y retornar el resultado de TypeORM', async () => {
            const id = 1;
            const deleteResult = { affected: 1 };
            
            // Se mockea el resultado de la función .delete del repositorio
            prescriptionRepository.delete.mockResolvedValue(deleteResult);

            const result = await service.remove(id);

            expect(prescriptionRepository.delete).toHaveBeenCalledWith(id);
            expect(result).toEqual(deleteResult);
        });
    });
});