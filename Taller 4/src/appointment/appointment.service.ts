import { Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Appointment } from './appointment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, } from 'typeorm';
import { Doctor } from 'src/doctor/doctor.entity';
import { Patient } from 'src/patient/patient.entity';
import { Office } from 'src/office/office.entity';

@Injectable()
export class AppointmentService {

  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
    
    @InjectRepository(Office)
    private readonly officeRepository: Repository<Office>,
    
  ) { }

  // async create (createAppointmentDto: CreateAppointmentDto)
  async create (createAppointmentDto: CreateAppointmentDto) {
    // Search of patient, doctor and office by ID
    const doctor = await this.doctorRepository.findOneBy({id: createAppointmentDto.doctorId});
    const patient = await this.patientRepository.findOneBy({id: createAppointmentDto.patientId});
    const office = await this.officeRepository.findOneBy({id_consultorio: createAppointmentDto.officeId});
    
    // Verification of existence of doctor, patient and office
    if (!doctor || !patient) {
      throw new Error('Doctor or patient not found');
    }
    if (!office) {
      throw new Error('Office not found');
    }
    // Create the appointment with the correct relations
    const appointment = this.appointmentRepository.create({
      date: new Date(createAppointmentDto.date),
      reason: createAppointmentDto.reason,
      notes: createAppointmentDto.notes,
      status: createAppointmentDto.status || 'scheduled',
      doctor: doctor,
      patient: patient,
      office: office
      
    });
    return this.appointmentRepository.save(appointment);
  }

  // Find all appointments with relations doctor and patient
  findAll() {
    return this.appointmentRepository.find({relations: ['doctor', 'patient']});
  }

  // Find one appointment with relations doctor and patient
  findOne(id: number) {
    return this.appointmentRepository.findOne({where: {id}, relations: ['doctor', 'patient']});
  }

  // Update appoinment use of UpdateAppointmentDto
  async update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    await this.appointmentRepository.update(id, updateAppointmentDto);
    return this.findOne(id);
  }

  // Delete appointment by id
  remove(id: number) {
    return this.appointmentRepository.delete(id);
  }
}
