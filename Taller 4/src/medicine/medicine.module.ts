import { Module } from '@nestjs/common';
import { MedicineService } from './medicine.service';
import { MedicineController } from './medicine.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Medicine } from './medicine.entity';
import { Prescription } from 'src/prescription/prescription.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Medicine, Prescription])],
  controllers: [MedicineController],
  providers: [MedicineService],
})
export class MedicineModule {}
