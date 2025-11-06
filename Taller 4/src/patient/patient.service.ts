import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from './patient.entity';
import { Person } from '../person/person.entity';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';

@Injectable()
export class PatientService {
    constructor(
        @InjectRepository(Patient)
        private readonly patientRepository: Repository<Patient>,
        @InjectRepository(Person)
        private readonly personRepository: Repository<Person>,
    ) {}

    // Create a patient with the correct relations
    async createPatient(Patientdto: CreatePatientDto) {
        // Search person by id
        const person = await this.personRepository.findOneBy({id: Patientdto.personId});
        
        if (!person) {
            throw new Error('Person not found');
        }
        // Create patient
        const patient = this.patientRepository.create({
            person,
            insurance: Patientdto.insurance,
            bloodType: Patientdto.bloodType,
            medicalHistory: Patientdto.medicalHistory
        });
        return this.patientRepository.save(patient);
    }   

    // Find all patients with relations person
    findAll() {
        return this.patientRepository.find({relations: ['person']});
    }

    // Find one patient with relations person
    findOne(id: number) {
        return this.patientRepository.findOne({where: {id}, relations: ['person']});
    }

    // Update patient with correct relations
    async update(id: number, Patientdto: UpdatePatientDto) {
        await this.patientRepository.update(id, Patientdto);
        return this.findOne(id);
    }

    // Delete patient by id
    remove(id: number) {
        return this.patientRepository.delete(id);
    }

}

