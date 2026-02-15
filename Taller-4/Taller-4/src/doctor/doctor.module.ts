import { Module } from 'Taller-4/src/auth/node_modules/@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from '../person/person.entity';
import { Doctor } from './doctor.entity';
import { Specialty } from '../specialty/specialty.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Doctor, Person, Specialty])],
  controllers: [DoctorController],
  providers: [DoctorService],
})
export class DoctorModule {}
