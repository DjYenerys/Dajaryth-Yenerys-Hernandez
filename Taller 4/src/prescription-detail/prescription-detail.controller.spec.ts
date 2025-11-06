import { Test, TestingModule } from '@nestjs/testing';
import { PrescriptionDetailController } from './prescription-detail.controller';
import { PrescriptionDetailService } from './prescription-detail.service';
import { CreatePrescriptionDetailDto } from './dto/create-prescription-detail.dto';
import { UpdatePrescriptionDetailsDto } from './dto/update-prescription-details.dto';

// Definir un mock básico para el servicio
const mockPrescriptionDetailService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
};



describe('PrescriptionDetailController', () => {

    let controller: PrescriptionDetailController;
    let service: PrescriptionDetailService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
        controllers: [PrescriptionDetailController],
        providers: [
            {
            provide: PrescriptionDetailService,
            useValue: mockPrescriptionDetailService, // Usamos nuestro mock
            },
        ],
    }).compile();

    controller = module.get<PrescriptionDetailController>(PrescriptionDetailController);
    service = module.get<PrescriptionDetailService>(PrescriptionDetailService);
});

    it('el controlador debe estar definido', () => {
        expect(controller).toBeDefined();
    });

  // -----------------------------------------------------------------
  // Prueba del método POST (create)
  // -----------------------------------------------------------------
describe('create', () => {
    it('debe llamar al servicio.create con el DTO correcto', async () => {
    const createDto: CreatePrescriptionDetailDto & { prescriptionId: number, medicineId: number } = {
        dose: '1 pill',
        duration: 7,
        instrucitons: 'After meals',
        prescriptionId: 1,
        medicineId: 5,
    };
    // Mockear el valor de retorno del servicio para simular la creación exitosa
    mockPrescriptionDetailService.create.mockResolvedValue(createDto);

    await controller.create(createDto);

    // 1. Verificar que el servicio fue llamado
    expect(service.create).toHaveBeenCalled();
    // 2. Verificar que fue llamado con los datos del body (DTO)
    expect(service.create).toHaveBeenCalledWith(createDto);
    });
});

  // Prueba del método GET (findAll)
describe('findAll', () => {
    it('debe llamar al servicio.findAll y retornar un array', async () => {
        const mockResult = [{ id: 1 }, { id: 2 }] as any;
        mockPrescriptionDetailService.findAll.mockResolvedValue(mockResult);

        const result = await controller.findAll();

        // 1. Verificar que el servicio fue llamado
        expect(service.findAll).toHaveBeenCalled();
        // 2. Verificar que se retornó el resultado del servicio
        expect(result).toEqual(mockResult);
    });
});

  // Prueba del método GET (findOne)
describe('findOne', () => {
    it('debe llamar al servicio.findOne con el ID correcto', async () => {
        const id = 10;
        const mockResult = { id: 10 } as any;
        mockPrescriptionDetailService.findOne.mockResolvedValue(mockResult);

        const result = await controller.findOne(id);

        // 1. Verificar que el servicio fue llamado con el ID
        expect(service.findOne).toHaveBeenCalledWith(10);
        // 2. Verificar que se retorna el resultado
        expect(result).toEqual(mockResult);
    });
});

  // Prueba del método PATCH (update)

describe('update', () => {
    it('debe llamar al servicio.update con el ID y el DTO correctos', async () => {
        const id = 1;
        const updateDto: any = { dose: '2 pills' };
        const updatedDetail = { id: 1, dose: '2 pills' } as any;

        mockPrescriptionDetailService.update.mockResolvedValue(updatedDetail);

        const result = await controller.update(id, updateDto as UpdatePrescriptionDetailsDto);

        expect(service.update).toHaveBeenCalledWith(id, expect.objectContaining(updateDto)); 
        expect(result).toEqual(updatedDetail);
    });
});


  // Prueba del método DELETE (remove)

describe('remove', () => {
    it('debe llamar al servicio.remove con el ID correcto', async () => {
        const id = 5;
        mockPrescriptionDetailService.remove.mockResolvedValue({ affected: 1 });

        await controller.remove(id);

        // 1. Verificar que el servicio fue llamado con el ID
        expect(service.remove).toHaveBeenCalledWith(id);
        // No verificamos el retorno aquí, ya que el controller solo delega la llamada
        });
    });
});