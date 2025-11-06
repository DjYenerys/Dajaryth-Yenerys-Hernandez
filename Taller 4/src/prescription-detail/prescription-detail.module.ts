import { Module } from '@nestjs/common';
import { PrescriptionDetailService } from './prescription-detail.service';
import { PrescriptionDetailController } from './prescription-detail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrescriptionDetail } from './prescription-detail.entity';
import { Medicine } from 'src/medicine/medicine.entity';
import { Prescription } from 'src/prescription/prescription.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PrescriptionDetail, Medicine, Prescription])],
  controllers: [PrescriptionDetailController],
  providers: [PrescriptionDetailService],
})
export class PrescriptionDetailModule {}
