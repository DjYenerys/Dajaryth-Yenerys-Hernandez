import { Injectable } from '@nestjs/common';
import { CreatePrescriptionDto } from './dto/create-prescription.dto';
import { UpdatePrescriptionDto } from './dto/update-prescription.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Medicine } from 'src/medicine/medicine.entity';
import { Appointment } from 'src/appointment/appointment.entity';
import { Prescription } from './prescription.entity';
import { PrescriptionDetail } from 'src/prescription-detail/prescription-detail.entity';

@Injectable()
export class PrescriptionService {

  constructor(
    @InjectRepository(Prescription)
    private readonly prescriptionRepository: Repository<Prescription>,

    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
    
    @InjectRepository(PrescriptionDetail)
    private readonly prescriptionDetailRepository: Repository<Prescription>,
    

    @InjectRepository(Medicine)
    private readonly medicineRepository: Repository<Medicine>,
  ) { }
  // Create a prescription with the correct relations
  async create(dto: CreatePrescriptionDto) {
    // Search for appointment
    const appointment = await this.appointmentRepository.findOne({
      where: { id: dto.appointmentId },
    });
    if (!appointment) throw new Error('Appointment not found');

    // Search for medicine
    const medicine = await this.medicineRepository.findOne({
      where: { id: dto.medicineId },
    });
    if (!medicine) throw new Error('Medicine not found');

    // Create the prescription with the correct relations
    const prescription = this.prescriptionRepository.create({
      date: dto.date || new Date(),
      observations: dto.observations,
      quantity: dto.quantity || 0,
      duration: dto.duration || 0,
      appointment,
      medicine,
    });

  return this.prescriptionRepository.save(prescription);
}

  // Find all prescriptions with relations appointment and medicine
  findAll() {
    return this.prescriptionRepository.find({
      relations: ['appointment', 'medicine'],
    });
  }

  // Find one prescription with relations appointment and medicine
  findOne(id: number) {
    return this.prescriptionRepository.findOne({where: {id}, relations: ['appointment', 'medicine']});
  }

  // Update prescription with correct relations
  async update(id: number, updatePrescriptionDto: UpdatePrescriptionDto) {
    await this.prescriptionRepository.update(id, updatePrescriptionDto);
    return this.findOne(id);
  }

  // Delete prescription by id
  remove(id: number) {
    return this.prescriptionRepository.delete(id);
  }
}
