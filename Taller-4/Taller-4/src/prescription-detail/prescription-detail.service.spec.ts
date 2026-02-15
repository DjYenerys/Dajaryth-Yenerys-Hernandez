import { Prescription } from "../prescription/prescription.entity";
import { Repository, UpdateResult } from "typeorm";
import { PrescriptionDetail } from "./prescription-detail.entity";
import { PrescriptionDetailService } from "./prescription-detail.service";
import { Medicine } from "../medicine/medicine.entity";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { CreatePrescriptionDetailDto } from "./dto/create-prescription-detail.dto";
import { UpdatePrescriptionDetailsDto } from "./dto/update-prescription-details.dto";
import { NotFoundException } from "@nestjs/common"; // Se añade para manejar errores

/**
 * Servicio de negocio para la gestión de los detalles de prescripción
 * Se encarga de la lógica CRUD y de la correcta manipulación de las relaicones
 * con las entidades de Medicina y prescripción usando TypeORM
 */

// 1. Definir un tipo de Mock para el Repositorio de TypeORM
type MockRepository<T = any> = {
    [K in keyof Repository<T>]?: jest.Mock;
};

// 2. Función para crear mocks del repositorio
const createMockRepository = <T>(): MockRepository<T> => ({
    findOneBy: jest.fn(),
    find: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
});

/**
 * @fileoverview Pruebas unitarias para prescriptionDetailService.
 * Asegura el correcto funcionamiento de las operaciones CRUD y el manejo de las dependencias.
 */

describe('PrescriptionDetailService', ()=> {

    let service: PrescriptionDetailService;
    let detailRepository: MockRepository<PrescriptionDetail>;
    let medicineRepository: MockRepository<Medicine>;
    let prescriptionRepository: MockRepository<Prescription>;

    // Configuración del módulo de prueba
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
        detailRepository = module.get<MockRepository<PrescriptionDetail>>(getRepositoryToken(PrescriptionDetail));
        medicineRepository = module.get<MockRepository<Medicine>>(getRepositoryToken(Medicine));
        prescriptionRepository = module.get<MockRepository<Prescription>>(getRepositoryToken(Prescription));
    });

    it('el servicio debe estar definido', () => {
        expect(service).toBeDefined();
    });

// Pruebas para CREATE
    describe('create', ()=>{
        const createDto: CreatePrescriptionDetailDto = {
            dose: '1 pill', 
            duration: 7, 
            instrucitons: 'After meals',
            prescriptionId: 1,
            medicineId: 5,
        };
        const mockPrescription = { id: 1 } as Prescription;
        const mockMedicine = { id: 5 } as Medicine;
        const mockNewDetail = { 
            id: 10,
            dose: createDto.dose, 
            duration: createDto.duration,
            instrucitons: createDto.instrucitons,
            prescription: mockPrescription,
            medicine: mockMedicine,
        } as PrescriptionDetail;

        beforeEach(()=>{
            // Configurar mocks para que se ejecuten correctamente
            prescriptionRepository.findOneBy?.mockResolvedValue(mockPrescription);
            medicineRepository.findOneBy?.mockResolvedValue(mockMedicine);
            detailRepository.create?.mockReturnValue(mockNewDetail);
            detailRepository.save?.mockResolvedValue(mockNewDetail);
        });

        /**
         * @summary Verifica el flujo exitoso de creación de un detalle.
         * Asegura que se llamó a detailRepository.create con los campos del DTO
         * y que se llamó a detailRepository.save con las entidades de relación completas y el nuevo ID.
         */
        
        it('debe crear y guardar un detalle de prescripción correctamente', async() =>{
            const result = await service.create(createDto);

            // Verificar que se buscaron las relaciones
            expect(prescriptionRepository.findOneBy).toHaveBeenCalledWith({id: createDto.prescriptionId});
            expect(medicineRepository.findOneBy).toHaveBeenCalledWith({id: createDto.medicineId});
            
            // Verificar que se creó la entidad con las relaciones
            expect(detailRepository.create).toHaveBeenCalledWith(expect.objectContaining({
                dose: createDto.dose,
                duration: createDto.duration,
                instrucitons: createDto.instrucitons,
            }));
            
            // Verificar que se guardó
            expect(detailRepository.save).toHaveBeenCalledWith(expect.objectContaining({
                dose: createDto.dose,
                duration: createDto.duration,
                instrucitons: createDto.instrucitons,
                prescription: mockPrescription,
                medicine: mockMedicine,
            }));
            expect(result).toEqual(mockNewDetail);
        });

        /**
         * @summary Prueba el manejo de error si la prescripción no existe.
         * Se espera que el servicio lance un Error genériso con el mensaje específico.
         */

        it('debe lanzar un error si la prescripción no es encontrada', async() =>{
            prescriptionRepository.findOneBy?.mockResolvedValue(null); // Prescripción no existe

            await expect(service.create(createDto)).rejects.toThrow(Error);
            await expect(service.create(createDto)).rejects.toThrow('Prescription not found');
        });

        it('debe lanzar un error si la medicina no es encontrada', async() =>{
            medicineRepository.findOneBy?.mockResolvedValue(null); // Medicina no existe

            await expect(service.create(createDto)).rejects.toThrow(Error);
            await expect(service.create(createDto)).rejects.toThrow('Medicine not found');
        });
    });
    
// Pruebas para FIND ALL
    describe('findAll', ()=> {

        /**
         * @summary Prueba de retorno, debe retornar una lista de los datos de prescripción
         */
        it('debe retornar un array de detalles de prescripción con sus relaciones', async()=> {
            const MockDetails = [{id: 1}, {id: 2}] as PrescriptionDetail[];
            
            detailRepository.find?.mockResolvedValue(MockDetails);

            const result = await service.findAll();

            // Debe llamar a find con las relaciones necesarias
            expect(detailRepository.find).toHaveBeenCalledWith({
                relations:['prescription', 'medicine'],
            });
            expect(result).toEqual(MockDetails);
        });
    });

// Pruebas para FIND ONE
    describe('findOne', ()=> {
        it('debe retornar un detalle por ID', async()=> {
            const MockDetail = {id: 1} as PrescriptionDetail;
            detailRepository.findOneBy?.mockResolvedValue(MockDetail);

            const result = await service.findOne(1);

            expect(detailRepository.findOneBy).toHaveBeenCalledWith({id: 1});
            expect(result).toEqual(MockDetail);
        });

        it('debe retornar null si no encuentra el detalle', async()=> {
            detailRepository.findOneBy?.mockResolvedValue(null);

            const result = await service.findOne(999);

            expect(result).toBeNull();
        });
    });

// Pruebas para UPDATE
    describe('update', ()=> {
        const id = 1;
        const updateDto: UpdatePrescriptionDetailsDto = {dose: '2 pills', duration: 10, instrucitons: 'Updated instructions'};
        const updatedDetail = { id: id, ...updateDto } as PrescriptionDetail;
        
        it('debe actualizar el detalle y retornar el objeto actualizado', async() => {
            
            // Simular el resultado de la actualización
            detailRepository.update?.mockResolvedValue({affected: 1} as UpdateResult);
            // Simular la llamada a findOne que el servicio hace después de actualizar
            detailRepository.findOneBy?.mockResolvedValue(updatedDetail); 

            const result = await service.update(id, updateDto);

            // Verificar que se llamó a update
            expect(detailRepository.update).toHaveBeenCalledWith(id, updateDto);
            // Verificar que se llamó a findOne después de actualizar
            expect(detailRepository.findOneBy).toHaveBeenCalledWith({id});
            // Verificar el resultado
            expect(result).toEqual(updatedDetail);
        });

        it('debe retornar null si el detalle no existe (si findOneBy retorna null)', async() => {
            detailRepository.update?.mockResolvedValue({affected: 1} as UpdateResult);
            detailRepository.findOneBy?.mockResolvedValue(null); // findOne retorna null

            const result = await service.update(999, updateDto);

            expect(result).toBeNull();
        });
    });

// Pruebas para REMOVE
    describe('remove', ()=> {
        it('debe llamar a detailRepository.delete con el ID correcto', async()=> {
            const id = 5;
            const deleteResult = { affected: 1 } as any;

            detailRepository.delete?.mockResolvedValue(deleteResult);

            const result = await service.remove(id);

            expect(detailRepository.delete).toHaveBeenCalledWith(id);
            expect(result).toEqual(deleteResult);
        });
    });
});