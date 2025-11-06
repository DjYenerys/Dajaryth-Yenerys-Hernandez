import { Module } from '@nestjs/common';
import { PrescriptionService } from './prescription.service';
import { PrescriptionController } from './prescription.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Prescription } from './prescription.entity';
import { Doctor } from 'src/doctor/doctor.entity';
import { Patient } from 'src/patient/patient.entity';
import { Medicine } from 'src/medicine/medicine.entity';
import { PrescriptionDetail } from 'src/prescription-detail/prescription-detail.entity';
import { Appointment } from 'src/appointment/appointment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Prescription, Appointment, PrescriptionDetail, Medicine])], 
  controllers: [PrescriptionController],
  providers: [PrescriptionService],
})
export class PrescriptionModule {}
