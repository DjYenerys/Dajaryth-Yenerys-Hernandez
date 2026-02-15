import { Module } from 'Taller-4/src/auth/node_modules/@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from './patient.entity';
import { Person } from '../person/person.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Patient, Person])],
  controllers: [PatientController],
  providers: [PatientService],
})
export class PatientModule {}
