import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentController } from './appointment.controller';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Appointment } from './appointment.entity';
import { NotFoundException, BadRequestException } from '@nestjs/common';

// Mocks de datos de ejemplo
const mockAppointment: Appointment = { 
    id: 1, 
    date: new Date(), 
    status: 'scheduled', 
    reason: 'Control', 
    notes: 'ok', 
    doctor: { id: 2 } as any, 
    patient: { id: 4 } as any, 
    office: { id: 1 } as any,
    prescription: [],
    invoice: null as any,
};
const createDto: CreateAppointmentDto = {
    date: new Date().toISOString() as any,
    reason: 'Control',
    doctorId: 2,
    patientId: 4,
    officeId: 1,
    status: 'scheduled'
};
const updateDto: Partial  <UpdateAppointmentDto> = {
    date: new Date().toISOString() as any,
    status: 'completed',
} as UpdateAppointmentDto; // Usamos PartialType, solo enviamos campos a actualizar

// Mock del servicio de citas
const mockAppointmentService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
};

describe('AppointmentController', () => {
    let controller: AppointmentController;
    let service: AppointmentService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
        controllers: [AppointmentController],
        providers: [
            {
            provide: AppointmentService,
            useValue: mockAppointmentService,
            },
        ],
    }).compile();

    controller = module.get<AppointmentController>(AppointmentController);
    service = module.get<AppointmentService>(AppointmentService);
    });

    it('debe estar definido', () => {
        expect(controller).toBeDefined();
    });

    //PRUEBAS CREATE

    describe('create', () => {
        it('debe crear una cita y devolverla (Caso de Éxito)', async () => {
            mockAppointmentService.create.mockResolvedValue(mockAppointment);

            const result = await controller.create(createDto);

            // Verificación de llamadas
            expect(service.create).toHaveBeenCalledWith(createDto);
            // Verificación del resultado
            expect(result).toEqual(mockAppointment);
        });

        // Error: Doctor o Paciente no encontrado (404)
        it('debe lanzar NotFoundException si Doctor o Paciente no existe', async () => {
            // Simular el error que lanza el servicio:
            mockAppointmentService.create.mockRejectedValue(new NotFoundException('Doctor or patient not found'));

            // Esperar que la llamada al controlador lance la excepción de NestJS
            await expect(controller.create(createDto)).rejects.toThrow(NotFoundException);
            expect(service.create).toHaveBeenCalledWith(createDto); // Verifica que se intentó llamar al servicio
        });
    
        // Error: Oficina no encontrada (404)
        it('debe lanzar NotFoundException si la Oficina no existe', async () => {
               // Simular el error que lanza el servicio:
            mockAppointmentService.create.mockRejectedValue(new NotFoundException('Office not found'));

            // Esperar que la llamada al controlador lance la excepción de NestJS
            await expect(controller.create(createDto)).rejects.toThrow(NotFoundException);
            expect(service.create).toHaveBeenCalledWith(createDto); 
        });

        // Error: Otro error inesperado (BadRequest/500)
        it('debe lanzar BadRequestException para otros errores del servicio', async () => {
            // Simular un error genérico (o un error de validación)
            mockAppointmentService.create.mockRejectedValue(new BadRequestException('Invalid date format'));

            // El controlador debería atraparlo y convertirlo a 400 Bad Request
            await expect(controller.create(createDto)).rejects.toThrow(BadRequestException);
            expect(service.create).toHaveBeenCalledWith(createDto); 
        });
});

  //Pruebas del metodo findOne get

    describe('findOne', () => {
        it('debe retornar una cita por ID (Caso de Éxito)', async () => {
            mockAppointmentService.findOne.mockResolvedValue(mockAppointment);

            const result = await controller.findOne('1'); // Parametro es string
            expect(service.findOne).toHaveBeenCalledWith(1); // El servicio recibe number
            expect(result).toEqual(mockAppointment);
        });

        it('debe lanzar NotFoundException si la cita no existe', async () => {
            mockAppointmentService.findOne.mockReturnValue(
                Promise.reject(new NotFoundException('Appointment not found'))
            );

            await expect(controller.findOne('999')).rejects.toThrow(NotFoundException);
            expect(service.findOne).toHaveBeenCalledWith(999);
        });
    });

  //Pruebaqs del metodo findAll GET

    describe('findAll', () => {
        it('debe retornar un array de citas', async () => {
            const mockAppointments = [mockAppointment];
            mockAppointmentService.findAll.mockResolvedValue(mockAppointments);

            const result = await controller.findAll();

            expect(service.findAll).toHaveBeenCalled();
            expect(result).toEqual(mockAppointments);
        });
    });

  // Pruebas del metodo update path

    describe('update', () => {
        it('debe actualizar una cita y retornar el resultado', async () => {
            const updatedAppointment = { ...mockAppointment, status: 'completed' };
            mockAppointmentService.update.mockResolvedValue(updatedAppointment);

            const result = await controller.update('1', updateDto);

            expect(service.update).toHaveBeenCalledWith(1, updateDto);
            expect(result).toEqual(updatedAppointment);
        });

    });

  //Prueba del metodo remove delete

    describe('remove', () => {
        it('debe eliminar una cita y retornar el resultado de la eliminación', async () => {
            const deleteResult = { affected: 1 };
            mockAppointmentService.remove.mockResolvedValue(deleteResult);

            const result = await controller.remove('1');

            expect(service.remove).toHaveBeenCalledWith(1);
            expect(result).toEqual(deleteResult);
        });
    });

});
