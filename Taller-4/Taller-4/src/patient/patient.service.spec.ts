import { Test, TestingModule } from '@nestjs/testing';
import { PatientService } from './patient.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from './patient.entity';
import { Person } from '../person/person.entity';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';

// Mocks de Datos y Entidades person y patient ya que son relacion para una autorizacion
const mockPerson = { id: 1, name: 'Laura Diaz' } as Person;
const mockPatientEntity: Patient = { 
    id: 1, 
    bloodType: 'O+', 
    insurance: 'contributive', 
    medicalHistory: 'I have a fever',
    person: mockPerson,
    appointments: [],
    invoices: [],
};

// Mocks 
const mockPatientRepository = {
    create: jest.fn(    ),
    save: jest.fn().mockResolvedValue(mockPatientEntity),
    find: jest.fn().mockResolvedValue([mockPatientEntity]),
    findOne: jest.fn(options => {
        // Simulación para findOne(1)
        if (options.where.id === 1) {
        return Promise.resolve(mockPatientEntity);
        }
        return Promise.resolve(undefined);
    }),
    update: jest.fn(),
    delete: jest.fn().mockResolvedValue({ affected: 1 }),
};

const mockPersonRepository = {
    // Simula que encuentra la persona si el ID es 2, de lo contrario devuelve undefined
    findOneBy: jest.fn((options: { id: number }) => {
        if (options.id === 1) { 
            return Promise.resolve(mockPerson);
        }
        return Promise.resolve(undefined);
    }),
};

describe('Pruebas unitarias de PatientService', () => {
    let service: PatientService;
    let patientRepository: Repository<Patient>;
    let personRepository: Repository<Person>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
        providers: [
            PatientService,
            { provide: getRepositoryToken(Patient), useValue: mockPatientRepository },
            { provide: getRepositoryToken(Person), useValue: mockPersonRepository },
        ],
        }).compile();

        service = module.get<PatientService>(PatientService);
        patientRepository = module.get<Repository<Patient>>(getRepositoryToken(Patient));
        personRepository = module.get<Repository<Person>>(getRepositoryToken(Person));
        jest.clearAllMocks();
    });

    it('Debe estar definido el servicio', () => {
        expect(service).toBeDefined();
    });


    // Test CREATE

    it(' Debe crear el paciente si la persona (personId: 1) existe', async () => {
        const createDto: CreatePatientDto = { personId: 1, bloodType: 'B+', insurance: 'subsidized', medicalHistory: 'None' };
        
        const result = await service.createPatient(createDto);

        // Verificación de llamadas
        expect(personRepository.findOneBy).toHaveBeenCalledWith({ id: createDto.personId });
        expect(patientRepository.create).toHaveBeenCalledWith({
            person: mockPerson, 
            insurance: createDto.insurance,
            bloodType: createDto.bloodType,
            medicalHistory: createDto.medicalHistory
        });
        expect(patientRepository.save).toHaveBeenCalled();
        
        // Verificación del Resultado
        expect(result.id).toBe(1);
        expect(result.person).toEqual(mockPerson);
    });
    
    it('Debe lanzar un Error si la persona (personId: 999) NO existe', async () => {
        const createDto: CreatePatientDto = { personId: 999, bloodType: 'O-', insurance: 'free', medicalHistory: 'Alergias' };
        
        await expect(service.createPatient(createDto)).rejects.toThrow('Person not found');
        
        // Verifica que NO se llamó a la creación del paciente
        expect(patientRepository.create).not.toHaveBeenCalled();
        expect(patientRepository.save).not.toHaveBeenCalled();
    });

    // Tests CRUD 
    it('findAll : Debe devolver todos los pacientes con la relación person', async () => {
        const result = await service.findAll();

        expect(patientRepository.find).toHaveBeenCalledWith({ relations: ['person'] }); 
        expect(result).toEqual([mockPatientEntity]);
    });
    
    it('findOne: Debe encontrar un paciente por ID (1)', async () => {
        const result = await service.findOne(1);
        expect(patientRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 }, relations: ['person'] });
        expect(result).toEqual(mockPatientEntity);
    });
    
    it('findOne: Debe devolver undefined si el paciente (999) no existe', async () => {
        const result = await service.findOne(999);
        expect(result).toBeUndefined();
    });

    it('update: Debe actualizar el paciente con el DTO y devolver el resultado de findOne', async () => {
        const updateDto: UpdatePatientDto = { 
            personid: 2, bloodType: 'B-', insurance: 'contributive', medicalHistory: 'Change of history' 
        };
        
        // Configurar findOne (llamado después del update) para devolver el objeto modificado
        const expectedResult = { ...mockPatientEntity, ...updateDto, id: 1 };
        mockPatientRepository.findOne.mockResolvedValue(expectedResult);

        const result = await service.update(1, updateDto);

        // Verificación de llamadas
        expect(patientRepository.update).toHaveBeenCalledWith(1, updateDto);
        expect(patientRepository.findOne).toHaveBeenCalledWith({
            where: {id: 1},
            relations: ['person']
        }); 
        
        // Verificación del resultado Afirmar que el resultado no es null o undefined antes de acceder a las propiedades
        expect(result).toBeDefined(); 
        expect(result).not.toBeNull();

        // verificacion del resultado
        expect(result!.medicalHistory).toBe('Change of history');
    });

    it('remove: Debe eliminar un paciente por ID y reportar 1 fila afectada', async () => {
        const result = await service.remove(1);

        expect(patientRepository.delete).toHaveBeenCalledWith(1);
        expect(result.affected).toBe(1); 
    });
});