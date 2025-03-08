import { IsNumber } from 'class-validator';

export class CreateTicketDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  eventId: number;
}
