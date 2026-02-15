
import { PersonService } from "./person.service";
import { Person, Role } from "./person.entity";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { CreatePersonDto } from "./dto/create-person.dto";
import { UpdatePersonDto } from "./dto/update-person.dto";
import { Repository, UpdateResult, ObjectLiteral } from "typeorm";

// Tipo genérico para mockear repositorios de la entidad Person
type MockRepository<PersonEntity extends ObjectLiteral = any> = {
    [K in keyof Repository<PersonEntity>]?: jest.Mock;
};



// Función para crear mocks
const createMockRepository = <Entity extends ObjectLiteral>(): MockRepository<Entity> => ({
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
    find: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
});

describe('PersonService', () => {
    let service: PersonService;
    let personRepository: MockRepository<Person>;

    beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
        providers: [
        PersonService,
        {
            provide: getRepositoryToken(Person),
            useValue: createMockRepository<Person>(),
        },
        ],
    }).compile();

    service = module.get<PersonService>(PersonService);
    personRepository = module.get<MockRepository<Person>>(getRepositoryToken(Person));
    });

    it('el servicio debe estar definido', () => {
    expect(service).toBeDefined();
    });

  // ─── CREATE ───────────────────────────────────────────────
    describe('create', () => {
    it('debe crear y guardar una persona correctamente', async () => {
        const dto: CreatePersonDto = {
        name: 'Ana',
        lastname: 'Pérez',
        document: '123456789',
        phone: '3001234567',
        email: 'ana@example.com',
        password: 'securePass123',
        gender: 'female',
        birthDate: new Date('1995-05-15'),
        role: Role.Patient,
        };

        const mockPerson = { id: 1, ...dto } as unknown as Person;
        personRepository.create?.mockReturnValue(mockPerson);
        personRepository.save?.mockResolvedValue(mockPerson);

        const result = await service.create(dto);

        expect(personRepository.create).toHaveBeenCalledWith(dto);
        expect(personRepository.save).toHaveBeenCalledWith(mockPerson);
        expect(result).toEqual(mockPerson);
    });
    });

  // ─── FIND ONE BY EMAIL ────────────────────────────────────
    describe('findOneByEmail', () => {
    it('debe retornar persona sin contraseña', async () => {
        const email = 'ana@example.com';
        const mockPerson = { id: 1, name: 'Ana', email, role: Role.Patient };
        personRepository.findOne?.mockResolvedValue(mockPerson);

        const result = await service.findOneByEmail(email);

        expect(personRepository.findOne).toHaveBeenCalledWith({
        where: { email },
        select: ['id', 'name', 'email', 'role'],
        });
        expect(result).toEqual(mockPerson);
    });

    it('debe retornar persona con contraseña si se solicita', async () => {
        const email = 'ana@example.com';
        const mockPerson = { id: 1, name: 'Ana', email, role: Role.Patient, password: 'hashed' };
        personRepository.findOne?.mockResolvedValue(mockPerson);

        const result = await service.findOneByEmail(email, true);

        expect(personRepository.findOne).toHaveBeenCalledWith({
        where: { email },
        select: ['id', 'name', 'email', 'role', 'password'],
        });
        expect(result).toEqual(mockPerson);
    });
    });

  // ─── FIND ALL ─────────────────────────────────────────────
    describe('findAll', () => {
    it('debe retornar todas las personas', async () => {
        const mockList = [{ id: 1 }, { id: 2 }];
        personRepository.find?.mockResolvedValue(mockList);

        const result = await service.findAll();

        expect(personRepository.find).toHaveBeenCalled();
        expect(result).toEqual(mockList);
    });
    });

  // ─── FIND BY ROLE ─────────────────────────────────────────
    describe('findByrole', () => {
    it('debe retornar personas por rol', async () => {
        const role = Role.Doctor;
        const mockDoctors = [{ id: 1, role }];
        personRepository.find?.mockResolvedValue(mockDoctors);

        const result = await service.findByrole(role);

        expect(personRepository.find).toHaveBeenCalledWith({ where: { role } });
        expect(result).toEqual(mockDoctors);
    });
    });

  // ─── FIND ONE ─────────────────────────────────────────────
    describe('findOne', () => {
    it('debe retornar una persona por ID', async () => {
        const mockPerson = { id: 3 };
        personRepository.findOne?.mockResolvedValue(mockPerson);

        const result = await service.findOne(3);

        expect(personRepository.findOne).toHaveBeenCalledWith({ where: { id: 3 } });
        expect(result).toEqual(mockPerson);
    });

    it('debe retornar null si no encuentra la persona', async () => {
        personRepository.findOne?.mockResolvedValue(null);

        const result = await service.findOne(999);

        expect(result).toBeNull();
    });
    });


  // ─── UPDATE ───────────────────────────────────────────────
    describe('update', () => {
    const id = 4;
    const updateDto: UpdatePersonDto = {
        phone: '3019876543',
        name: "",
        lastname: "",
        document: "",
        birthDate: new Date('1990-01-01'),
        email: "",
        role: Role.Doctor,
        gender: ""
    };
    const updatedPerson = { id, ...updateDto } as unknown as Person;

    it('debe actualizar y retornar la persona actualizada', async () => {
        personRepository.update?.mockResolvedValue({ affected: 1 } as UpdateResult);
        personRepository.findOne?.mockResolvedValue(updatedPerson);

        const result = await service.update(id, updateDto);

        expect(personRepository.update).toHaveBeenCalledWith(id, updateDto);
        expect(personRepository.findOne).toHaveBeenCalledWith({ where: { id } });
        expect(result).toEqual(updatedPerson);
    });

    it('debe retornar null si no encuentra la persona después de actualizar', async () => {
        personRepository.update?.mockResolvedValue({ affected: 1 } as UpdateResult);
        personRepository.findOne?.mockResolvedValue(null);

        const result = await service.update(999, updateDto);

        expect(result).toBeNull();
    });
    });

  // ─── REMOVE ───────────────────────────────────────────────
    describe('remove', () => {
    it('debe eliminar una persona por ID', async () => {
        const id = 5;
        const deleteResult = { affected: 1 };
        personRepository.delete?.mockResolvedValue(deleteResult);

        const result = await service.remove(id);

        expect(personRepository.delete).toHaveBeenCalledWith(id);
        expect(result).toEqual(deleteResult);
    });
    });
});