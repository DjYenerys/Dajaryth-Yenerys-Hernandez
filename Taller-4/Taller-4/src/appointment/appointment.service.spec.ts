import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentService } from '../../src/appointment/appointment.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from '../appointment/appointment.entity';
import { Doctor } from '../doctor/doctor.entity';
import { Patient } from '../patient/patient.entity';
import { Office } from '../office/office.entity';
import { CreateAppointmentDto } from '../appointment/dto/create-appointment.dto';
import { UpdateAppointmentDto } from '../appointment/dto/update-appointment.dto';

// Datos Simulados Mock : Modulos Doctor - Patient - Office 
const mockDoctor = { id: 2, name: 'Dra. Yeneris' };
const mockPatient = { id: 4, name: 'Yeimi Rodriguez' };
const mockOffice = { id_consultorio: 1, num_consultorio: 101 }; // Usar id_consultorio
const createDto: CreateAppointmentDto = {
    // el as any  = confia en el proceso
    date: new Date().toISOString() as any,
    reason: 'Control Medico',
    doctorId: 2,
    patientId: 4,
    officeId: 1,
    status: 'scheduled'
};
const mockAppointment: Appointment = {
    id: 1,
    date: new Date(createDto.date),
    // ! expresar que el dato no es nullo aunque parezca 
    status: createDto.status!,
    reason: createDto.reason!,
    notes: 'ok',
    doctor: mockDoctor as any,
    patient: mockPatient as any,
    office: mockOffice as any,
    prescription: [],   
    invoice: null as any,
};

// MOCK Appointment
const mockAppointmentRepository = {
    create: jest.fn(),
    save: jest.fn(entity => Promise.resolve({ ...mockAppointment, ...entity, id: 1 })),
    find: jest.fn(() => Promise.resolve([mockAppointment])),
    findOne: jest.fn(options => {
        if (options.where.id === 1) {
            return Promise.resolve(mockAppointment);
        }
        return Promise.resolve(undefined);
    }),
    update: jest.fn(),
    delete: jest.fn((id: number) => Promise.resolve({ affected: id === 1 ? 1 : 0 })),
};

// Doctor - relacion
const mockDoctorRepository = {
    findOneBy: jest.fn((options: { id: number }) => {
        return options.id === 2 ? Promise.resolve(mockDoctor) : Promise.resolve(undefined);
    }),
};

// Patient - relacion
const mockPatientRepository = {
    findOneBy: jest.fn((options: { id: number }) => {
        return options.id === 4 ? Promise.resolve(mockPatient) : Promise.resolve(undefined);
    }),
};

// Office - relacion
const mockOfficeRepository = {
    findOneBy: jest.fn((options: { id_consultorio: number }) => {
        return options.id_consultorio === 1 ? Promise.resolve(mockOffice) : Promise.resolve(undefined);
    }),
};


describe('Test unitarios de AppointmentService', () => {
    let service: AppointmentService;
    let appoinmentRepository: Repository<Appointment>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                // Dependencies para el servicio 
                AppointmentService,
                { provide: getRepositoryToken(Appointment), useValue: mockAppointmentRepository },
                { provide: getRepositoryToken(Doctor), useValue: mockDoctorRepository },
                { provide: getRepositoryToken(Patient), useValue: mockPatientRepository },
                { provide: getRepositoryToken(Office), useValue: mockOfficeRepository },
            ],
        }).compile();

        service = module.get<AppointmentService>(AppointmentService);
        appoinmentRepository = module.get<Repository<Appointment>>(getRepositoryToken(Appointment));
        // limpia el historial valores registrados y las llamadas de los mocks  por cada it
        jest.clearAllMocks();
    });

    it('Debe estar definido el servicio', () => {
        expect(service).toBeDefined();
    });

    // Test CREATE 
    describe('create', () => {
        it('Deberia crear la cita si Doctor, Paciente y Oficina existen', async () => {
            const result = await service.create(createDto);

            // Verificación de llamadas a repositorios de cada una de las entidades
            expect(mockDoctorRepository.findOneBy).toHaveBeenCalledWith({ id: createDto.doctorId });
            expect(mockPatientRepository.findOneBy).toHaveBeenCalledWith({ id: createDto.patientId });
            expect(mockOfficeRepository.findOneBy).toHaveBeenCalledWith({ id_consultorio: createDto.officeId });
            expect(appoinmentRepository.save).toHaveBeenCalled();

            // Verificación del resultado
            expect(result.id).toBe(1); // solo se reciba uno dato
            //verifica las relaciones 
            expect(result.doctor.id).toBe(createDto.doctorId);
            expect(result.patient.id).toBe(createDto.patientId); 
            expect(result.office.id_consultorio).toBe(createDto.officeId);
        });

        // errores de falta de existencia 

        it('Deberia lanzar un Error si el Doctor NO existe', async () => {
            // Sobrescribir el mock del Doctor para este test
            mockDoctorRepository.findOneBy.mockResolvedValueOnce(undefined); 

            await expect(service.create(createDto)).rejects.toThrow('Doctor or patient not found');
            
            expect(mockPatientRepository.findOneBy).toHaveBeenCalled(); // Se busca el paciente
            expect(appoinmentRepository.save).not.toHaveBeenCalled();
        });
        
        it('Debetia lanzar un Error si el Paciente NO existe', async () => {
            // Sobrescribir el mock del Paciente para este test
            mockPatientRepository.findOneBy.mockResolvedValueOnce(undefined); 

            await expect(service.create(createDto)).rejects.toThrow('Doctor or patient not found');
            
            expect(mockDoctorRepository.findOneBy).toHaveBeenCalled(); // Se busca el doctor
            expect(appoinmentRepository.save).not.toHaveBeenCalled();
        });

        it('Deberia lanzar un Error si la Oficina NO existe', async () => {
            // Aseguramos que Doctor y Paciente existan (mocks por defecto)
            // Sobrescribir el mock de Office para este test
            mockOfficeRepository.findOneBy.mockResolvedValueOnce(undefined); 

            await expect(service.create(createDto)).rejects.toThrow('Office not found');
            
            expect(mockDoctorRepository.findOneBy).toHaveBeenCalled();
            expect(mockPatientRepository.findOneBy).toHaveBeenCalled();
            expect(appoinmentRepository.save).not.toHaveBeenCalled();
        });
    });

    // Tests CRUD 
    it('findAll: Deberia devolver todas las citas con las relaciones doctor y patient', async () => {
        const result = await service.findAll();

        expect(appoinmentRepository.find).toHaveBeenCalledWith({ relations: ['doctor', 'patient'] });
        expect(result).toEqual([mockAppointment]);
    });

    it('findOne: Deberia encontrar una cita por ID (1)', async () => {
        const result = await service.findOne(1);
        
        expect(appoinmentRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 }, relations: ['doctor', 'patient'] });
        expect(result).toEqual(mockAppointment);
    });
    
    it('findOne: Deberia devolver undefined si la cita (999) no existe', async () => {
        const result = await service.findOne(999);
        expect(result).toBeUndefined();
    });

    it('update: Deberia actualizar la cita y devolver el resultado de findOne', async () => {
        const updateDto: UpdateAppointmentDto = { status: 'completed' };

        // Simulacion de findOne devuelve el objeto modificado
        const expectedResult = { ...mockAppointment, status: 'completed' };
        mockAppointmentRepository.findOne.mockResolvedValue(expectedResult);

        const result = await service.update(1, updateDto);

        expect(appoinmentRepository.update).toHaveBeenCalledWith(1, updateDto);
        expect(appoinmentRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 }, relations: ['doctor', 'patient'] });

        // resultado
        expect(result!.status).toBe('completed');
    });

    it('remove: Deberia eliminar una cita por ID y reportar 1 fila afectada', async () => {
        const result = await service.remove(1);

        expect(appoinmentRepository.delete).toHaveBeenCalledWith(1);
        expect(result.affected).toBe(1);
    });
});