import { Injectable } from '@nestjs/common';
import { CreatePrescriptionDetailDto } from './dto/create-prescription-detail.dto';
import { UpdatePrescriptionDetailsDto } from './dto/update-prescription-details.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PrescriptionDetail } from './prescription-detail.entity';
import { Medicine } from 'src/medicine/medicine.entity';
import { Prescription } from 'src/prescription/prescription.entity';

/**
 * Servicio de negocio para la gestión de los detalles de prescripción.
 * Se encarga de la lógica CRUD y de la correcta manipulacion de las relaciones
 * con las entidades de Medicina y Prescripción usando TypeORM.
 */


@Injectable()
export class PrescriptionDetailService {
    constructor(
    @InjectRepository(PrescriptionDetail)
    private readonly detailRepository: Repository<PrescriptionDetail>,
    @InjectRepository(Medicine)
    private readonly medicineRepository: Repository<Medicine>,
    @InjectRepository(Prescription)
    private readonly prescriptionRepository: Repository<Prescription>,
) {}

    /**
     * 
     * @param dto El objeto de transferencia de datos con la información del detalle.
     * @returns El objeto PrescriptionDetail creado y guardado.
     * @throws {Error} Lanza un error si la prescripción ('Prescription not found') o
     * le madicina ('Medicina not foun') no son encontradas.
     */

    // Create a prescription detail with the correct relations
    async create (dto: CreatePrescriptionDetailDto & { prescriptionId?: number, medicineId: number }) {
        // Create the prescription detail with the correct relations
        const detail = this.detailRepository.create({
        dose: dto.dose,
        duration: dto.duration,
        instrucitons: dto.instrucitons,
        });
        // Search for prescription
        if (dto.prescriptionId) {
        const prescription = await this.prescriptionRepository.findOneBy({id: dto.prescriptionId});
        if (!prescription) {
            throw new Error('Prescription not found');
        }
        detail.prescription = prescription;
        }
        // Search for medicine
        const medicine = await this.medicineRepository.findOneBy({id: dto.medicineId});
        if (!medicine) {
        throw new Error('Medicine not found');
        }
        detail.medicine = medicine;
        return this.detailRepository.save(detail);
    }

    /**
     * 
     * @returns Una promesa que resuelve a un array de PrescriptionDetail con las relaciones
     * 'prescription' y 'medicine' cargadas.
     */

    // Find all prescription details with relations prescription and medicine
    async findAll () {
        return this.detailRepository.find({relations:['prescription', 'medicine']});
    }

    /**
     * Busca y retorna un  detalle de prescripción específico por su ID.
     * @param id el ID del detalle de prescripción que hay que buscas.
     * @returns Una promesa que resuelve al PrescriptionDetail encontrado o undefined si no existe.
     */

    // Find one prescription detail by id
    findOne(id: number) {
        return this.detailRepository.findOneBy({id});
    }

    /**
     * Actualiza un detalle de prescripción y retorna el objeto actualizado.
     * @param id El ID del detalle de prescripción a actualizar.
     * @param dto El DTO con los campos a nodificar (dose, duration, instrucitons, etc.).
     * @returns Una promesa que resuelve al PrescriptionDetail actualizado.
     */

    // Update prescription detail with correct relations
    async update(id: number, dto: UpdatePrescriptionDetailsDto) {
        await this.detailRepository.update(id, dto);
        return this.findOne(id);
    }

    /**
     * Elimina un detalle de prescripción por su ID.
     * @param id El ID del detalle de prescripcíón a eliminar.
     * @returns Una promesa que resulve al resultado de la operación de eliminación de TypeORM.
     */

    // Delete prescription detail by id
    remove(id: number) {
        return this.detailRepository.delete(id);
    }
}
