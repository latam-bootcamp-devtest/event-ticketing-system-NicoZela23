import { IsDateString, IsNotEmpty, Min } from 'class-validator';

export class CreateEventDto {
  @IsNotEmpty()
  name: string;

  @IsDateString()
  date: string;

  @Min(0, { message: 'Available Seats must be greater than 0' })
  availableSeats: number;
}
