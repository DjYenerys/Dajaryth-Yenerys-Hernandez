import { Test, TestingModule } from '@nestjs/testing';
import { PersonController } from './person.controller';
import { PersonService } from './person.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { Role } from './person.entity';

// Mock básico del servicio
const mockPersonService = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  findByrole: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

describe('PersonController', () => {
    let controller: PersonController;
    let service: PersonService;

beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
        controllers: [PersonController],
        providers: [
        {
            provide: PersonService,
            useValue: mockPersonService,
        },
        ],
    }).compile();

    controller = module.get<PersonController>(PersonController);
    service = module.get<PersonService>(PersonService);
    });

    it('el controlador debe estar definido', () => {
    expect(controller).toBeDefined();
    });

  // ─── POST ───────────────────────────────────────────────
    describe('create', () => {
    it('debe llamar al servicio.create con el DTO correcto', async () => {
        const createDto: CreatePersonDto = {
        name: 'person-name',
        lastname: 'lastname',
        document: 'document',
        phone: 'phone',
        email: 'email',
        password: 'password',
        gender: 'gender',
        birthDate: new Date('1990-01-01'),
        role: Role.Doctor,
        };

        const expectedResult = { id: 1, ...createDto };
        mockPersonService.create.mockResolvedValue(expectedResult);

        const result = await controller.create(createDto);

        expect(service.create).toHaveBeenCalledWith(createDto);
        expect(result).toEqual(expectedResult);
    });
    });

  // ─── GET ALL ───────────────────────────────────────────────
    describe('findAll', () => {
    it('debe retornar todas las personas', async () => {
        const mockResult = [{ id: 1 }, { id: 2 }];
        mockPersonService.findAll.mockResolvedValue(mockResult);

        const result = await controller.findAll();

        expect(service.findAll).toHaveBeenCalled();
        expect(result).toEqual(mockResult);
    });
    });

  // ─── GET ONE ───────────────────────────────────────────────
    describe('findOne', () => {
    it('debe retornar una persona por ID', async () => {
        const id = 10;
        const mockResult = { id: 10 };
        mockPersonService.findOne.mockResolvedValue(mockResult);

        const result = await controller.findOne(id);

        expect(service.findOne).toHaveBeenCalledWith(id);
        expect(result).toEqual(mockResult);
    });
    });

  // ─── GET BY ROLE ───────────────────────────────────────────────
    describe('findByRole', () => {
    it('debe retornar personas por rol', async () => {
        const role = Role.Doctor;
        const mockResult = [{ id: 1, role }];
        mockPersonService.findByrole.mockResolvedValue(mockResult);

        const result = await controller.findByRole(role);

        expect(service.findByrole).toHaveBeenCalledWith(role);
        expect(result).toEqual(mockResult);
    });
    });

  // ─── PATCH ───────────────────────────────────────────────
    describe('update', () => {
    it('debe actualizar una persona con el ID y DTO correctos', async () => {
        const id = 3;
        const updateDto: UpdatePersonDto = {
            phone: '3019876543',
            name: '',
            lastname: '',
            document: '',
            birthDate: new Date('1990-01-01'),
            email: '',
            role: Role.Doctor,
            gender: ''
        };
        const updatedPerson = { id, ...updateDto };

        mockPersonService.update.mockResolvedValue(updatedPerson);

        const result = await controller.update(id, updateDto);

        expect(service.update).toHaveBeenCalledWith(id, updateDto);
        expect(result).toEqual(updatedPerson);
    });
    });

  // ─── DELETE ───────────────────────────────────────────────
    describe('remove', () => {
    it('debe eliminar una persona por ID', async () => {
        const id = 7;
        mockPersonService.remove.mockResolvedValue({ affected: 1 });

        const result = await controller.remove(id);

        expect(service.remove).toHaveBeenCalledWith(id);
        expect(result).toEqual({ affected: 1 });
    });
    });
});
