import { Module } from 'Taller-4/src/auth/node_modules/@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './appointment.entity';
import { Doctor } from '../doctor/doctor.entity';
import { Patient } from '../patient/patient.entity';
import { Office } from '../office/office.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment, Doctor, Patient, Office])],
  controllers: [AppointmentController],
  providers: [AppointmentService],
})
export class AppointmentModule {}
