import { Test, TestingModule } from '@nestjs/testing';
import { InvoiceService } from './invoice.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Invoice } from './invoice.entity';
import { Appointment } from '../appointment/appointment.entity';
import { Patient } from '../patient/patient.entity';
import { Repository } from 'typeorm';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { Doctor } from '../doctor/doctor.entity';
import { Office } from '../office/office.entity';
import { Prescription } from '../prescription/prescription.entity';

// Mocks entidades relacionadas con cita

// Mock Appointment (Cita)
const mockAppointment: Appointment = {
    id: 4,
    date: new Date('2025-11-15'),
    reason: 'Chequeo general anual',
    notes: 'El paciente solicitó atención prioritaria por síntomas recientes.',
    status: 'scheduled',

    // Relaciones simuladas
    doctor: { id: 3 } as Doctor,
    patient: { id: 8 } as Patient,
    office: { id_consultorio: 5 } as Office,
    invoice: {} as Invoice, 
    prescription: [] as Prescription[],
};

// Mock Patient (Paciente)
const mockPatient: Patient = {
    id: 8,
    bloodType: 'O+',
    insurance: 'contributive',
    medicalHistory: 'Alergia a la penicilina, antecedentes de asma.',

    // Relaciones simuladas
    person: { id: 12, nombre: 'Pepito Pérez' } as any,
    appointments: [] as Appointment[],
    invoices: [] as Invoice[],
};

// mock Invoice (Cita)
const mockInvoice: Invoice = {
    id_factura: 1,
    fecha: new Date('2025-10-29'),
    total: 150000,
    metodo_pago: 'tarjeta',
    estado_pago: 'pendiente',
    propety_cita: mockAppointment,
    propety_patient: mockPatient,
} as Invoice;


describe('InvoiceService', () => {
    let service: InvoiceService;
    let invoiceRepository: Repository<Invoice>;
    let appointmentRepository: Repository<Appointment>;
    let patientRepository: Repository<Patient>;

  // Mock de Repositorios 
    const mockInvoiceRepository = {
        create: jest.fn().mockReturnValue(mockInvoice),
        save: jest.fn().mockResolvedValue(mockInvoice),
        find: jest.fn().mockResolvedValue([mockInvoice]),
        findOne: jest.fn().mockResolvedValue(mockInvoice),
        remove: jest.fn().mockResolvedValue(mockInvoice),
    };

    const mockAppointmentRepository = {
        findOne: jest.fn().mockResolvedValue(mockAppointment),
    };

    const mockPatientRepository = {
        findOne: jest.fn().mockResolvedValue(mockPatient),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
        providers: [
            InvoiceService,
            { provide: getRepositoryToken(Invoice), useValue: mockInvoiceRepository },
            { provide: getRepositoryToken(Appointment), useValue: mockAppointmentRepository },
            { provide: getRepositoryToken(Patient), useValue: mockPatientRepository },
        ],
        }).compile();

        service = module.get<InvoiceService>(InvoiceService);
        invoiceRepository = module.get(getRepositoryToken(Invoice));
        appointmentRepository = module.get(getRepositoryToken(Appointment));
        patientRepository = module.get(getRepositoryToken(Patient));
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    // CREATE
    describe('create', () => {
        it('Deberia crear una factura correctamente', async () => {
        const dto: CreateInvoiceDto = {
            total: 150000,
            metodo_pago: 'tarjeta',
            id_cita: 1,
            id_paciente: 2,
        };

        const result = await service.create(dto);
        expect(appointmentRepository.findOne).toHaveBeenCalledWith({ where: { id: dto.id_cita } });
        expect(patientRepository.findOne).toHaveBeenCalledWith({ where: { id: dto.id_paciente } });
        expect(invoiceRepository.create).toHaveBeenCalled();
        expect(invoiceRepository.save).toHaveBeenCalledWith(mockInvoice);
        expect(result).toEqual(mockInvoice);
        });

        it('Deberia dar error si no existe la cita', async () => {
        jest.spyOn(appointmentRepository, 'findOne').mockResolvedValueOnce(null);
        const dto: CreateInvoiceDto = {
            total: 1000,
            metodo_pago: 'efectivo',
            id_cita: 99,
            id_paciente: 2,
        };
        await expect(service.create(dto)).rejects.toThrow('Appointment not found');
        });

        it('Deberia dar error si no existe el paciente', async () => {
        jest.spyOn(patientRepository, 'findOne').mockResolvedValueOnce(null);
        const dto: CreateInvoiceDto = {
            total: 1000,
            metodo_pago: 'efectivo',
            id_cita: 1,
            id_paciente: 99,
        };
        await expect(service.create(dto)).rejects.toThrow('Patient not found');
        });
    });

    // FIND ALL
    describe('findAll', () => {
        it('Debería retornar todas las facturas con relaciones', async () => {
        const result = await service.findAll();
        expect(invoiceRepository.find).toHaveBeenCalledWith({
            relations: ['propety_cita', 'propety_patient'],
        });
        expect(result).toEqual([mockInvoice]);
        });
    });

    // FIND ONE
    describe('findOne', () => {
        it('Deberia retornar una factura por id', async () => {
        const result = await service.findOne(1);
        expect(invoiceRepository.findOne).toHaveBeenCalledWith({
            where: { id_factura: 1 },
            relations: ['propety_cita', 'propety_patient'],
        });
        expect(result).toEqual(mockInvoice);
        });

        it('Deberia dar error si la factura no existe', async () => {
        jest.spyOn(invoiceRepository, 'findOne').mockResolvedValueOnce(null);
        await expect(service.findOne(99)).rejects.toThrow('Invoice not found');
        });
    });

  // UPDATE
    describe('update', () => {
        it('Deberia actualizar correctamente una factura', async () => {
        const dto: UpdateInvoiceDto = {
            total: 200000,
            metodo_pago: 'efectivo',
            id_factura: 1,
        };

        const result = await service.update(1, dto);
        expect(invoiceRepository.save).toHaveBeenCalled();
        expect(result).toEqual(mockInvoice);
        });

        it('Deberia dar error si la cita no existe al actualizarla', async () => {
        jest.spyOn(appointmentRepository, 'findOne').mockResolvedValueOnce(null);
        const dto: UpdateInvoiceDto = {
            total: 200000,
            metodo_pago: 'efectivo',
            id_factura: 1,
            id_cita: 99,
        };
        await expect(service.update(1, dto)).rejects.toThrow('Appointment not found');
        });
    });

    // REMOVE
    describe('remove', () => {
        it('Deberia eliminar una factura correctamente', async () => {
        const result = await service.remove(1);
        expect(invoiceRepository.remove).toHaveBeenCalledWith(mockInvoice);
        expect(result).toEqual({ message: `Invoice with id 1 deleted successfully` });
        });
    });
});