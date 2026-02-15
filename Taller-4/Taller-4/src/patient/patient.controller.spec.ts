import { Test, TestingModule } from "@nestjs/testing";
import { PatientController } from "./patient.controller";
import { PatientService } from "./patient.service";
import { CreatePatientDto } from "./dto/create-patient.dto";
import { UpdatePatientDto } from "./dto/update-patient.dto";


// Mock básico del servicio
const mockPatientService = {
    createPatient: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
};

describe('PatientController', () => {
    let controller: PatientController;
    let service: PatientService;

    beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
        controllers: [PatientController],
        providers: [
        {
            provide: PatientService,
            useValue: mockPatientService,
        },
        ],
    }).compile();

    controller = module.get<PatientController>(PatientController);
    service = module.get<PatientService>(PatientService);
    });

    it('el controlador debe estar definido', () => {
    expect(controller).toBeDefined();
    });

  // ─── POST ───────────────────────────────────────────────
    describe('create', () => {
    it('debe llamar al servicio.createPatient con el DTO correcto', async () => {
        const createDto: CreatePatientDto = {
        name: 'Ana',
        lastname: 'Pérez',
        document: '123456789',
        phone: '3001234567',
        email: 'ana@example.com',
        password: 'securePass123',
        gender: 'female',
        birthDate: new Date('1995-05-15'),
        };

        const expectedResult = { id: 1, ...createDto };
        mockPatientService.createPatient.mockResolvedValue(expectedResult);

        const result = await controller.create(createDto);

        expect(service.createPatient).toHaveBeenCalledWith(createDto);
        expect(result).toEqual(expectedResult);
    });
    });

  // ─── GET ALL ───────────────────────────────────────────────
    describe('findAll', () => {
    it('debe retornar todos los pacientes', async () => {
        const mockResult = [{ id: 1 }, { id: 2 }];
        mockPatientService.findAll.mockResolvedValue(mockResult);

        const result = await controller.findAll();

        expect(service.findAll).toHaveBeenCalled();
        expect(result).toEqual(mockResult);
    });
    });

  // ─── GET ONE ───────────────────────────────────────────────
    describe('findOne', () => {
    it('debe retornar un paciente por ID', async () => {
        const id = 10;
        const mockResult = { id: 10 };
        mockPatientService.findOne.mockResolvedValue(mockResult);

        const result = await controller.findOne(id);

        expect(service.findOne).toHaveBeenCalledWith(id);
        expect(result).toEqual(mockResult);
    });
    });

  // ─── PATCH ───────────────────────────────────────────────
    describe('update', () => {
    it('debe actualizar un paciente con el ID y DTO correctos', async () => {
        const id = 3;
        const updateDto: UpdatePatientDto = { phone: '3019876543' };
        const updatedPatient = { id, ...updateDto };

        mockPatientService.update.mockResolvedValue(updatedPatient);

        const result = await controller.update(id, updateDto);

        expect(service.update).toHaveBeenCalledWith(id, updateDto);
        expect(result).toEqual(updatedPatient);
    });
    });

  // ─── DELETE ───────────────────────────────────────────────
    describe('remove', () => {
    it('debe eliminar un paciente por ID', async () => {
        const id = 7;
        mockPatientService.remove.mockResolvedValue({ affected: 1 });

        const result = await controller.remove(id);

        expect(service.remove).toHaveBeenCalledWith(id);
        expect(result).toEqual({ affected: 1 });
    });
    });
});
