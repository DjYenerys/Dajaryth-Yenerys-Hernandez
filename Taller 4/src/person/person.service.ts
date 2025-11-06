import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Person, Role } from './person.entity';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';


@Injectable()
export class PersonService {
    constructor(
        @InjectRepository(Person)
        private readonly personRepository: Repository<Person>
    ) {}

    // funcion creacion persona 
    async create(createPersonDto: CreatePersonDto): Promise<Person>{
        const newPerson = this.personRepository.create(createPersonDto);
        // el save permite que se active el beforeInsert antes de que un usuario se cree se activa el hashing
        return this.personRepository.save(newPerson);
    }


    async findOneByEmail(email: string, includePassword = false): Promise<Person | null> {
    const findOptions = {
        where: { email },
        select: includePassword ? ['id', 'name', 'email', 'role', 'password'] : ['id', 'name', 'email', 'role'],
    } as any;
    
    return this.personRepository.findOne(findOptions);
    }

    // Find all persons with relations doctor and patient
    findAll() {
        return this.personRepository.find();
    }

    findByrole(role: Role) {
        return this.personRepository.find({ where: { role } });
    }

    // Find one person with id
    findOne(id: number) {
        return this.personRepository.findOne({ where: { id } });
    }

    // Update person with correct relations
    async update(id: number, updatePersonDto: UpdatePersonDto) {
        await this.personRepository.update(id, updatePersonDto);
        return this.personRepository.findOne({ where: { id } });
    }

    // Delete person by id
    remove(id: number) {
        return this.personRepository.delete(id);
    }
}

