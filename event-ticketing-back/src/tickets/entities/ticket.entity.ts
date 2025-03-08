import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn('increment')
  ticketId: number;

  @Column({ type: 'int' })
  userId: number;

  @Column({ type: 'int' })
  eventId: number;
}
