import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Doctor } from './doctor.entity';
import { Person } from 'src/person/person.entity';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { Specialty } from 'src/specialty/specialty.entity';

@Injectable()
export class DoctorService {
    constructor(
        @InjectRepository(Doctor) private readonly doctorRepository: Repository<Doctor>,
        @InjectRepository(Person) private readonly personRepository: Repository<Person>,
        @InjectRepository(Specialty) private readonly specialtyRepository: Repository<Specialty>,
) {}

    // Create a doctor with the correct relations
    async create (dto:CreateDoctorDto) {
        // Search for person
        const person = await this.personRepository.findOneBy({id: dto.personaId});
        if (!person) {
            throw new Error('Person not found');
        }
        // Search for specialty
        const specialty = await this.specialtyRepository.findOneBy({id_especialidad: dto.specialtyId});
        if (!specialty) {
            throw new Error('Specialty not found');
        }
        // Create doctor
        const doctor = this.doctorRepository.create({person, specialty, licenseNumber: dto.licenseNumber});
        return this.doctorRepository.save(doctor);
    }

    // Find all doctors with relations person
    findAll() {
        return this.doctorRepository.find({relations: ['person']});
    }

    // Find one doctor with relations person
    findOne(id: number) {
        return this.doctorRepository.findOne({where: {id}, relations: ['person']});
    }

    // Update doctor with correct relations
    async update(id: number, dto: UpdateDoctorDto) {
        // Verification of existence of doctor
        const doctor = await this.doctorRepository.findOne({
            where: { id },
            relations: ['person', 'specialty'],
        });

        // If Doctor not found
        if (!doctor) {
            throw new Error('Doctor not found');
        }

        // If send new personId, update relation
        if (dto.personaId) {
            const person = await this.personRepository.findOneBy({ id: dto.personaId });
            if (!person) throw new Error('Person not found');
            doctor.person = person;
        }

        // If send new specialtyId, update relation
        if (dto.specialtyId) {
            const specialty = await this.specialtyRepository.findOneBy({
            id_especialidad: dto.specialtyId,
            });
            if (!specialty) throw new Error('Specialty not found');
            doctor.specialty = specialty;
        }

        // Update simple fields
        if (dto.licenseNumber) {
            doctor.licenseNumber = dto.licenseNumber;
        }

        // Save changes
        return this.doctorRepository.save(doctor);
    }

    // Delete doctor by id
    remove(id: number) {
        return this.doctorRepository.delete(id);    
    }    

}