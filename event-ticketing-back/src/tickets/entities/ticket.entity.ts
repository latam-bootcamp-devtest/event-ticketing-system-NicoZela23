import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn('increment')
  ticketId: number;

  @Column({ type: 'int' })
  userId: number;

  @Column({ type: 'int' })
  eventId: number;
}
