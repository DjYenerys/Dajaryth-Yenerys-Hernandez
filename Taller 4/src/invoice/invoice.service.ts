import { Injectable } from '@nestjs/common';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invoice } from './invoice.entity';
import { Appointment } from 'src/appointment/appointment.entity';
import { Patient } from 'src/patient/patient.entity';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
  ) {}

  // Create an invoice with the correct relations
  async create(dto: CreateInvoiceDto) {
    // Search for appointment
  const appointment = await this.appointmentRepository.findOne({
    where: { id: dto.id_cita },
  });
  if (!appointment) throw new Error('Appointment not found');
  // Search for patient
  const patient = await this.patientRepository.findOne({
    where: { id: dto.id_paciente },
  });
  if (!patient) throw new Error('Patient not found');

  // Crear la factura con las relaciones correctas
  const invoice = this.invoiceRepository.create({
    total: dto.total,
    metodo_pago: dto.metodo_pago,
    estado_pago: dto.estado_pago || 'Pendiente',
    propety_cita: appointment,
    propety_patient: patient,
  });

  return this.invoiceRepository.save(invoice);
}


  // Find all invoices with relations appointment and patient
  findAll() {
    return this.invoiceRepository.find({
      relations: ['propety_cita', 'propety_patient'],
    });
  }

  // Find one invoice with relations appointment and patient
  async findOne(id: number) {
    const invoice = await this.invoiceRepository.findOne({
      where: { id_factura: id },
      relations: ['propety_cita', 'propety_patient'],
    });
    if (!invoice) throw new Error('Invoice not found');
    return invoice;
  }

  // Update invoice with correct relations
  async update(id: number, dto: UpdateInvoiceDto) {
    // Verification of existence of invoice
    const invoice = await this.findOne(id);

    // If send new appointmentId, update relation
    if (dto.id_cita) {
      const appointment = await this.appointmentRepository.findOne({
        where: { id: dto.id_cita },
      });
      if (!appointment) throw new Error('Appointment not found');
      invoice.propety_cita = appointment;
    }

    // If send new patientId, update relation
    if (dto.id_paciente) {
      const patient = await this.patientRepository.findOne({
        where: { id: dto.id_paciente },
      });
      if (!patient) throw new Error('Patient not found');
      invoice.propety_patient = patient;
    }

    // Update simple fields
    Object.assign(invoice, dto);
    return this.invoiceRepository.save(invoice);
  }

  // Delete invoice by id
  async remove(id: number) {
    const invoice = await this.findOne(id);
    await this.invoiceRepository.remove(invoice);
    return { message: `Invoice with id ${id} deleted successfully` };
  }
}