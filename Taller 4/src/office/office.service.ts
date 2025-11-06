import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Office } from './office.entity';
import { CreateOfficeDto } from './dto/create-office.dto';
import { UpdateOfficeDto } from './dto/Update-office.dto';

@Injectable()
export class OfficeService {

    constructor(
        @InjectRepository(Office)
        private readonly officeRepository: Repository<Office>,
    ) {}

    // Create an office with the correct relations
    async create(createOfficeDto: CreateOfficeDto) {
        const office = this.officeRepository.create(createOfficeDto);
        return this.officeRepository.save(office);
    }

    // Find all offices with relations appointment
    findAll() {
        return this.officeRepository.find( {relations: ['property_cita']});
    }

    // Find one office with relations appointment or by id
    async findOne(id: number) {
        const office = await this.officeRepository.findOne({where: {id_consultorio: id}, relations: ['property_cita']});
        // If office not found
        if (!office) throw new Error('Office not found');
        return office;
    }

    // Update office with correct relations
    async update(id: number, updateOfficeDto: UpdateOfficeDto) {
        // Verification of existence of office
        const office = await this.findOne(id);
        // If send new num_consultorio, update relation
        Object.assign(office, updateOfficeDto);
        return this.officeRepository.save(office);
    }   

    // Delete office by id
    remove(id: number) {
        return this.officeRepository.delete(id);
    }
}
