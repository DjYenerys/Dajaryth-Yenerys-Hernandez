import { Test, TestingModule } from "@nestjs/testing";
import { OfficeService } from "./office.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Office } from "./office.entity";
import { CreateOfficeDto } from "./dto/create-office.dto";

const mockOffice = {
    create: jest.fn((dto) => ({ id_consultorio: 1, ...dto })),
    save: jest.fn((office) => Promise.resolve(office)),
    find: jest.fn(),
    findOne: jest.fn((options) => {
        if (options.where.id_consultorio === 1) {
            return Promise.resolve({
                id_consultorio: 1,
                num_consultorio: 101,
                piso: 1,
                disponible: true,
            });
        } else {
            return Promise.resolve(undefined);
        }
    }),
    delete: jest.fn((id: number) => Promise.resolve({ affected: id === 1 ? 1 : 0 })),
};

describe('Todas las Pruebas de funcionalidad en Office Service', () => {
    let service: OfficeService;
    let repositoryOffice: Repository<Office>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OfficeService,
                { provide: getRepositoryToken(Office), useValue: mockOffice },
            ],
        }).compile();

        service = module.get<OfficeService>(OfficeService);
        repositoryOffice = module.get(getRepositoryToken(Office));

        jest.clearAllMocks();
    });

    it('Debería estar definido', () => {
        expect(service).toBeDefined();
    });

    it('Debería crear un consultorio y devolverlo con un ID', async () => {
        const createOfficeDto: CreateOfficeDto = {
            num_consultorio: 101,
            piso: 1,
            disponible: true,
        };

        const resultado = await service.create(createOfficeDto);

        expect(repositoryOffice.create).toHaveBeenCalledWith(createOfficeDto);
        expect(repositoryOffice.save).toHaveBeenCalled();
        expect(resultado).toEqual({ id_consultorio: 1, ...createOfficeDto });
    });

    it('Debería encontrar un consultorio por el ID', async () => {
        const officeId = 1;
        const resultado = await service.findOne(officeId);

        expect(repositoryOffice.findOne).toHaveBeenCalledWith({
            where: { id_consultorio: officeId },
            relations: ['property_cita'],
        });

        expect(resultado.id_consultorio).toEqual(officeId);
        expect(resultado.num_consultorio).toEqual(101);
        expect(resultado.disponible).toEqual(true);
    });

    it('Debería lanzar un error si el consultorio NO EXISTE', async () => {
        mockOffice.findOne.mockResolvedValueOnce(undefined);
        await expect(service.findOne(999)).rejects.toThrow('Office not found');
    });

    it('Debería eliminar un consultorio por el ID', async () => {
        const resultado = await service.remove(1);
        expect(repositoryOffice.delete).toHaveBeenCalledWith(1);
        expect(resultado.affected).toBe(1);
    });

    it('Debería actualizar un consultorio por ID y devolver el registro modificado', async () => {
        const officeId = 1;
        const officeUpdate = { num_consultorio: 105, piso: 5, disponible: false };

        const existOffice = { id_consultorio: 1, num_consultorio: 101, piso: 1, disponible: true };
        mockOffice.findOne.mockResolvedValue(existOffice);
        const updatedOffice = { ...existOffice, ...officeUpdate };
        mockOffice.save.mockResolvedValue(updatedOffice);

        const result = await service.update(officeId, officeUpdate);

        expect(repositoryOffice.findOne).toHaveBeenCalledWith({
            where: { id_consultorio: officeId },
            relations: ['property_cita'],
        });
        expect(repositoryOffice.save).toHaveBeenCalledWith(
            expect.objectContaining({
                id_consultorio: 1,
                piso: 5,
                disponible: false,
            }),
        );
        expect(result).toEqual(updatedOffice);
    });

    it('Debería lanzar un error al intentar actualizar un consultorio que no existe', async () => {
        mockOffice.findOne.mockResolvedValue(undefined);
        await expect(service.update(999, { piso: 1 } as any)).rejects.toThrow('Office not found');
        expect(repositoryOffice.save).not.toHaveBeenCalled();
    });
});
