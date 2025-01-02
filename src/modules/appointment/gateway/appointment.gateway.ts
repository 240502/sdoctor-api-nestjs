import { Injectable } from '@nestjs/common';
import { BaseGateway } from 'src/common/shared';
import { Appointment } from 'src/models';

@Injectable()
export class AppointmentGateway extends BaseGateway {
  /**
   * Gửi thông báo tới tất cả client trong room của bác sĩ
   * @param doctorId ID của bác sĩ
   * @param message Nội dung thông báo
   */
  notifyToAllClient(appointment: Appointment): void {
    this.emitToAll('appointment:new', appointment);
  }
}
