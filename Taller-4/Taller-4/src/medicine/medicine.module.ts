import { Module } from 'Taller-4/src/auth/node_modules/@nestjs/common';
import { MedicineService } from './medicine.service';
import { MedicineController } from './medicine.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Medicine } from './medicine.entity';
import { Prescription } from '../prescription/prescription.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Medicine, Prescription])],
  controllers: [MedicineController],
  providers: [MedicineService],
})
export class MedicineModule {}
