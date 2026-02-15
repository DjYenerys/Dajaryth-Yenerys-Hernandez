import { Test, TestingModule } from '@nestjs/testing';
import { OfficeController } from '../office/office.controller';
import { OfficeService } from '../office/office.service';
import { CreateOfficeDto } from '../office/dto/create-office.dto';

describe('Todas las funcionalidades de Office Controller de prueba', () => {
    // Instancia para usar el controlador de Office 
    let controller: OfficeController;
    
    // Se crea un mock - Simulacion con datos del servicio real 
    const mockOfficeService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    };

    // Se ejecuta antes de cada testing individual = config 
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
        controllers: [OfficeController],
        // error en prueba por que busca una base de datos real, por ello no importa el modulo porque se usa el mock 
        // imports: [OfficeModule],
        providers: [
            {
            provide: OfficeService,
            useValue: mockOfficeService,
            },
        ],
        }).compile();

        controller = module.get(OfficeController);
    });

    // Test del método CREATE 
    it('Debería llamar a officeService.create y devolver el consultorio creado', async () => {
        const createOfficeDto: CreateOfficeDto = {
            num_consultorio: 102,
            piso: 2,
            disponible: false,
        };
        
        // variable de una respuesta como resultado final y deseado
        const respuestaEsperada = { id_consultorio: 1, ...createOfficeDto }
        // Simular comportamiento del servicio
        mockOfficeService.create.mockResolvedValue(respuestaEsperada);

        // Llamar al método del Controller simulando una petición HTTP
        const result = await controller.create(createOfficeDto);

        // Verificación del Servicio: Aseguramos que el método del servicio fue llamado
        expect(mockOfficeService.create).toHaveBeenCalledWith(createOfficeDto);
        
        // Verificación del Resultado: Aseguramos que devuelve la respuesta esperada
        expect(result).toEqual(respuestaEsperada);
    });


    // Test del método FINDONE 
    it('Debería llamar a officeService.findOne con el ID correcto', async () => {
        const officeId = 5;
        
        const mockOfficeResponse = {id_consultorio: 3, num_consultorio: 321};
        mockOfficeService.findOne.mockResolvedValue(mockOfficeResponse);

        const result = await controller.findOne(officeId);

        // Verificación del Servicio: El Controller debe pasar el ID al Service
        expect(mockOfficeService.findOne).toHaveBeenCalledWith(officeId);
        // verificacion de result 
        expect(result).toEqual(mockOfficeResponse)
    });

    // Test del método UPDATE 
    it('debería llamar a officeService.update con el ID y DTO correctos', async () => {
        const officeId = 3;

        const updateDto = {num_consultorio: 2, piso: 3, disponible: true };
        // comportamiento del mock 
        mockOfficeService.update.mockResolvedValue(updateDto);                     

        const result = await controller.update(officeId, updateDto);

        // Verificación del Servicio: El Controller debe pasar ambos parámetros
        expect(mockOfficeService.update).toHaveBeenCalledWith(officeId, updateDto);
        expect(result).toEqual(updateDto);
    });

    // test FindAll 
    it('Deberia llamar a OfficeService.findAll y devolver todos los consultorios en un array', async() =>{
        // respuesta simulada 
        const mockOfficeList = [
            {id_consultorio: 1, num_consultorio: 321, piso:2, disponible: true},
            {id_consultorio: 2, num_consultorio: 123, piso:5, disponible: false},
        ]
        // simular el compartimiento del servicio 
        mockOfficeService.findAll.mockResolvedValue(mockOfficeList);

        // variable de resultado 
        const result = await controller.findAll();

        // verificacion del servicio y del resultado 
        expect(mockOfficeService.findAll).toHaveBeenCalled();
        // que el resultado sea igual que el mock 
        expect(result).toEqual(mockOfficeList);
    });

    // test Remove
    it('Deberia llamar a Office.remove con el Id dado en el Body', async() => {
        // id a eliminar 
        const officeId = 1;
        // la respuesta del servicio con typeOrm es un object 'affected'
        const respuestaEsperada = {affected: 1};

        // comportamiento del servicio simulado 
        mockOfficeService.remove.mockResolvedValue(respuestaEsperada);

        // Llamar al método del Controller simulando que el cuerpo contiene { id: 42 }
        const result = await controller.remove(officeId);

        // Verificación del Servicio: 
        // Aseguramos que el Controller llama a service.remove() con el ID extraído (42)
        expect(mockOfficeService.remove).toHaveBeenCalledWith(officeId);
        
        // El resultado debe ser lo que devuelve el servicio (la respuesta de TypeORM)
        expect(result).toEqual(respuestaEsperada);
    })
});