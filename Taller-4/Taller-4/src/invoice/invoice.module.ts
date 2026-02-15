import { Module } from 'Taller-4/src/auth/node_modules/@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceController } from './invoice.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invoice } from './invoice.entity';
import { Appointment } from '../appointment/appointment.entity';
import { Patient } from '../patient/patient.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Invoice, Appointment, Patient])],
  controllers: [InvoiceController],
  providers: [InvoiceService],
})
export class InvoiceModule {}
