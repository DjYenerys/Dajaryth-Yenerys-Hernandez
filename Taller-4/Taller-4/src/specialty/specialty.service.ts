import { InjectRepository } from "@nestjs/typeorm";
import { Specialty } from "./specialty.entity";
import { Repository } from "typeorm";
import { CreateSpecialtyDto } from "./dto/create-specialty.dto";
import { UpdateSpecialtyDto } from "./dto/update-speciality.dto";


export class SpecialtyService {
    constructor(
        @InjectRepository(Specialty)
        private readonly specialtyRepository: Repository<Specialty>,
    ) {}

    // Create a specialty with the correct relations
    async create(dtospecialty: CreateSpecialtyDto){
        const specialty = this.specialtyRepository.create(dtospecialty);
        return  this.specialtyRepository.save(specialty);
    }

    // Find all specialties with relations doctor
    findAll(){
        return this.specialtyRepository.find({relations: ['propety_doctor']});
    }

    // Find one specialty with relations doctor
    async findOne(id: number) {

        // Find the specialty
        const specialty = await this.specialtyRepository.findOne({
            where: { id_especialidad: id }
        });
        if (!specialty) throw new Error('Specialty not found');
        return specialty;
    }
    
    // Update specialty with correct relations
    async update(id: number, dtospecialty: UpdateSpecialtyDto){
        const specialty = await this.specialtyRepository.findOne({where: {id_especialidad: id}});
        if (!specialty) {
            throw new Error('Specialty not found');
        }
        specialty.name = dtospecialty.name;
        specialty.description = dtospecialty.description;
        return this.specialtyRepository.save(specialty);
    }

    // Delete specialty by id
    async delete(id: number){
        const specialty = await this.specialtyRepository.findOne({where: {id_especialidad: id}});
        if (!specialty) {
            throw new Error('Specialty not found');
        }
        return this.specialtyRepository.delete(id);
    }
}
