import { Module } from 'Taller-4/src/auth/node_modules/@nestjs/common';
import { OfficeService } from './office.service';
import { OfficeController } from './office.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Office } from './office.entity';
import { Appointment } from '../appointment/appointment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Office])],
  controllers: [OfficeController],
  providers: [OfficeService],
})
export class OfficeModule {}
