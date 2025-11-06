import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Medicine } from './medicine.entity';
import { Repository } from 'typeorm';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { UpdateMedicineDto } from './dto/update-medicine.dto';

@Injectable()
export class MedicineService {
    constructor(
        @InjectRepository(Medicine)
        private readonly medicineRepository: Repository<Medicine>,
    ) {}

    // Create a medicine with the correct relations
    create(medicineDto: CreateMedicineDto) {
        const medicine = this.medicineRepository.create(medicineDto);
        return this.medicineRepository.save(medicine);
    }

    // Find all medicines with relations prescription and details
    findAll() {
        return this.medicineRepository.find();
    }

    // Find one medicine with relations id
    findOne(id: number) {
        return this.medicineRepository.findOne({where: {id}});
    }

    // Update medicine with correct relations
    async update(id: number, medicineDto: UpdateMedicineDto) {
        await this.medicineRepository.update(id, medicineDto);
        return this.findOne(id);
    }

    // Delete medicine by id
    remove(id: number) {
        return this.medicineRepository.delete(id);
    }
}

