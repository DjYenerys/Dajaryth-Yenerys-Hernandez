import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus } from '@nestjs/common';
import { InvoiceController } from './invoice.controller';
import { InvoiceService } from './invoice.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { Invoice } from './invoice.entity';

/**
 * Test de las acciones de la entidad Invoice.
 * Acciones como crear, retornar, actualizar y eliminar.
 */

// 1. Definición de Mocks para el Servicio de Facturas
const mockInvoiceService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
};

// 2. Definición de Datos Mock
const mockAppointment = { id: 1, date: new Date() };
const mockPatient = { id: 4, name: 'Juan Pérez' };

const expectedInvoice: Invoice = {
    id_factura: 1,
    fecha: new Date(),
    total: 100,
    metodo_pago: 'transferencia',
    estado_pago: 'pendiente',
    propety_cita: mockAppointment as any,
    propety_patient: mockPatient as any,
} as Invoice;

const createDto: CreateInvoiceDto = {
    total: 100,
    metodo_pago: 'transferencia',
    estado_pago: 'pendiente',
    id_cita: 1,
    id_paciente: 4,
};

describe('InvoiceController', () => {
    let controller: InvoiceController;
    let service: InvoiceService;

    beforeEach(async () => {
        // Configuración del módulo de prueba
        const module: TestingModule = await Test.createTestingModule({
            controllers: [InvoiceController],
            providers: [
                {
                    provide: InvoiceService,
                    useValue: mockInvoiceService, // Usamos el mock
                },
            ],
        }).compile();

        controller = module.get<InvoiceController>(InvoiceController);
        service = module.get<InvoiceService>(InvoiceService);

        // Limpiar las llamadas antes de cada test
        jest.clearAllMocks();
    });

    it('✅ debe estar definido', () => {
        expect(controller).toBeDefined();
    });

    // --- PRUEBA DEL MÉTODO POST (create) ---
    describe('create', () => {
        it('debe crear una factura y retornar el objeto creado', async () => {
            mockInvoiceService.create.mockResolvedValue(expectedInvoice);

            const result = await controller.create(createDto);

            // Verificación: El controlador llama al servicio con el DTO
            expect(service.create).toHaveBeenCalledWith(createDto);
            // Verificación: El resultado es la factura esperada
            expect(result).toEqual(expectedInvoice);
        });
    });

    // --- PRUEBA DEL MÉTODO GET ALL (findAll) ---
    describe('findAll', () => {
        it('debe retornar un arreglo de facturas', async () => {
            const invoices = [expectedInvoice, { ...expectedInvoice, id_factura: 2 }];
            mockInvoiceService.findAll.mockResolvedValue(invoices);

            const result = await controller.findAll();

            // Verificación
            expect(service.findAll).toHaveBeenCalled();
            expect(result).toEqual(invoices);
        });
    });

    // --- PRUEBA DEL MÉTODO GET ONE (findOne) ---
    describe('findOne', () => {
        const id = '1';

        it('debe retornar una factura si el ID existe', async () => {
            mockInvoiceService.findOne.mockResolvedValue(expectedInvoice);

            const result = await controller.findOne(id);

            // Verificación: El controlador convierte el string 'id' a número (+id)
            expect(service.findOne).toHaveBeenCalledWith(+id); 
            expect(result).toEqual(expectedInvoice);
        });
        
        it('debe manejar la excepción si la factura no existe', async () => {
            const notFoundId = '999';
            // Simular un error, ya que tu servicio lanza 'Invoice not found'
            mockInvoiceService.findOne.mockRejectedValue(new Error('Invoice not found')); 

            // El controlador debería permitir que la excepción se propague o usar un interceptor para HTTP 404.
            // Para el test del controlador, solo verificamos que la promesa es rechazada (toThrow).
            await expect(controller.findOne(notFoundId)).rejects.toThrow('Invoice not found');
        });
    });

    // --- PRUEBA DEL MÉTODO PATCH (update) ---
    describe('update', () => {
        it('debe actualizar una factura y retornar la versión actualizada', async () => {
            const id = '1';
            const updateDto: UpdateInvoiceDto = { total: 250 } as UpdateInvoiceDto;
            const updatedInvoice = { ...expectedInvoice, total: 250 };

            mockInvoiceService.update.mockResolvedValue(updatedInvoice);

            const result = await controller.update(id, updateDto);

            // Verificación: El controlador llama al servicio con el ID como número
            expect(service.update).toHaveBeenCalledWith(+id, updateDto);
            expect(result).toEqual(updatedInvoice);
        });
    });

    // --- PRUEBA DEL MÉTODO DELETE (remove) ---
    describe('remove', () => {
        it('debe eliminar una factura y retornar el resultado de TypeORM (afectado: 1)', async () => {
            const id = '1';
            const deleteResult = { affected: 1 } as any;

            mockInvoiceService.remove.mockResolvedValue(deleteResult);

            const result = await controller.remove(id);

            // Verificación: El controlador llama al servicio con el ID como número
            expect(service.remove).toHaveBeenCalledWith(+id);
            expect(result).toEqual(deleteResult);
        });
    });
});