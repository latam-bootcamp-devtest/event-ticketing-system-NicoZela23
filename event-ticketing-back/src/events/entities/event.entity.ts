import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Event {
  @PrimaryGeneratedColumn('increment')
  eventId: number;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ type: 'date' })
  date: string;

  @Column({ type: 'int' })
  availableSeats: number;
}
