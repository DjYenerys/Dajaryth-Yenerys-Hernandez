import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './appointment.entity';
import { Doctor } from 'src/doctor/doctor.entity';
import { Patient } from 'src/patient/patient.entity';
import { Office } from 'src/office/office.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment, Doctor, Patient, Office])],
  controllers: [AppointmentController],
  providers: [AppointmentService],
})
export class AppointmentModule {}
