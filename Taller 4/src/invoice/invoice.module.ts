import { Module } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceController } from './invoice.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invoice } from './invoice.entity';
import { Appointment } from 'src/appointment/appointment.entity';
import { Patient } from 'src/patient/patient.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Invoice, Appointment, Patient])],
  controllers: [InvoiceController],
  providers: [InvoiceService],
})
export class InvoiceModule {}
