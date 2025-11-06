import { Prescription } from "src/prescription/prescription.entity";
import { Repository, UpdateDescription } from "typeorm";
import { PrescriptionDetail } from "./prescription-detail.entity";
import { PrescriptionDetailService } from "./prescription-detail.service";
import { Medicine } from "src/medicine/medicine.entity";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { CreatePrescriptionDetailDto } from "./dto/create-prescription-detail.dto";
import { UpdatePrescriptionDetailsDto } from "./dto/update-prescription-details.dto";

type MockRepository<T = any> = {
    [K in keyof Repository<T>]?: jest.Mock;
};
const createMockRepository = <T>(): MockRepository<T> => ({
    findOneBy: jest.fn(),
    find: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update:jest.fn(),
    delete: jest.fn(),
});

describe('PrescriptionDetailService', ()=>{
    let service: PrescriptionDetailService;
    let detailRepository: MockRepository<PrescriptionDetail>;
    let medicineRepository: MockRepository<Medicine>;
    let prescriptionRepository: MockRepository<Prescription>;

    beforeEach(async ()=> {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PrescriptionDetailService,
                {
                    provide: getRepositoryToken(PrescriptionDetail),
                    useValue: createMockRepository<PrescriptionDetail>(),
                },
                {
                    provide: getRepositoryToken(Medicine),
                    useValue: createMockRepository<Medicine>(),
                },
                {
                    provide: getRepositoryToken(Prescription),
                    useValue: createMockRepository<Prescription>(),
                },
            ],
        }).compile();

        service = module.get<PrescriptionDetailService>(PrescriptionDetailService);

        detailRepository = module.get<MockRepository<Prescription>>(
            getRepositoryToken(PrescriptionDetail),
        );
        medicineRepository = module.get<MockRepository<Medicine>>(
            getRepositoryToken(Medicine),
        );
        prescriptionRepository = module.get<MockRepository<Prescription>>(
            getRepositoryToken(Prescription),
        );
    });
    it('el servicio debe estar definido', () =>{
        expect(service).toBeDefined();
    });

    describe('create', () =>{
        const createDto: CreatePrescriptionDetailDto & {prescriptionId?: number; medicineId: number;} = {
            dose: '1 pill',
            duration: 7,
            instrucitons: 'After meals',
            prescriptionId: 1,
            medicineId: 5,
        };
        const mockPrescription = {id: 1} as Prescription;
        const mockMedicine = {id: 5} as Medicine;
        const MockDetail = 
        {id: 10, 
            ...createDto, 
            medicine: mockMedicine, 
            prescription: mockPrescription, 
        } as PrescriptionDetail;

        it('debe crear un detalle y establecer las relaciones correctamente', async ()=>{
            detailRepository.create?.mockReturnValue(MockDetail);
            prescriptionRepository.findOneBy?.mockResolvedValue(mockPrescription);
            medicineRepository.findOneBy?.mockResolvedValue(mockMedicine);
            detailRepository.save?.mockResolvedValue(MockDetail);

            const result = await service.create(createDto);

            expect(detailRepository.create).toHaveBeenCalled();
            expect(prescriptionRepository.findOneBy).toHaveBeenCalledWith({id: createDto.prescriptionId});
            expect(medicineRepository.findOneBy).toHaveBeenCalledWith({id: createDto.medicineId});
            expect(detailRepository.save).toHaveBeenCalledWith(
                expect.objectContaining({
                    duration: createDto.duration,
                    instrucitons: createDto.instrucitons,
                    dose: createDto.dose,

                    id: MockDetail.id,
                    prescriptionId: createDto.prescriptionId,
                    medicineId: createDto.medicineId,
                    
                })
            );
            expect(result).toEqual(MockDetail);
        });

        it('debe lanzar un error si la prescripción no es correcta', async () => {
            prescriptionRepository.findOneBy?.mockResolvedValue(undefined);

            await expect(service.create(createDto)).rejects.toThrow(
                'Prescription not found',
            );
        });
        it('Debe lanzar un error si la medicina no es correcta', async () => { 
            detailRepository.create?.mockReturnValue({} as Prescription);
            prescriptionRepository.findOneBy?.mockResolvedValue(mockPrescription);
            medicineRepository.findOneBy?.mockResolvedValue(undefined);

            await expect(service.create(createDto)).rejects.toThrow(
                'Medicine not found',
            );

        });
    });

    describe('findAll', ()=>{
        it('debe retornar una array y solicitar las relaciones', async ()=>{
            const MockDetails = [{id: 1}, {id: 2}] as PrescriptionDetail[];
            detailRepository.find?.mockResolvedValue(MockDetails);

            const result =await service.findAll();

            expect(detailRepository.find).toHaveBeenCalledWith({
                relations: ['prescription', 'medicine'],
            });
            expect(result).toEqual(MockDetails);
        });
    });
    //Pruebas de findOne
    describe('findOne', ()=>{
        it('debe retornar un detalle por ID', async()=>{
            const MockDetail = {id: 1} as PrescriptionDetail;
            detailRepository.findOneBy?.mockResolvedValue(MockDetail);

            const result = await service.findOne(1);

            expect(detailRepository.findOneBy).toHaveBeenCalledWith({id: 1});
            expect(result).toEqual(MockDetail);
        });
    });

    //Pruebas para update

    describe('update', ()=> {
        it('debe actualizar el detalle y retornar el objeto actualizado', async() =>{
            const updateDto = {dose: '2 pills'} as UpdatePrescriptionDetailsDto;
            const updatedDetail = {
                id: 1,
                dose: '2 pills',
                duration: 7,
                instrucitons:'After meals',
                medicine: {id: 5} as Medicine,
                prescription: {id: 1} as Prescription, 
            } as PrescriptionDetail;

            detailRepository.update?.mockResolvedValue({affected: 1} as any);

            detailRepository.findOneBy?.mockResolvedValue(updatedDetail);

            const result = await service.update(1, updateDto);

            expect(detailRepository.update).toHaveBeenCalledWith(1, updateDto);
            expect(result).toEqual(updatedDetail);
        });
    });
})