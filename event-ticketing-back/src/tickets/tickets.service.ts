import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { EventsService } from 'src/events/events.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from './entities/ticket.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
    private readonly eventService: EventsService,
  ) {}

  async create(createTicketDto: CreateTicketDto) {
    const foundEvent = await this.eventService.findOne(createTicketDto.eventId);
    if (foundEvent.availableSeats <= 0) {
      throw new ConflictException();
    }
    this.eventService.decreaseSeats(createTicketDto.eventId);

    const createdTicket = this.ticketRepository.create(createTicketDto);
    await this.ticketRepository.save(createdTicket);
    return createdTicket;
  }

  findAll() {
    return this.ticketRepository.find();
  }

  async findOne(ticketId: number) {
    const foundTicket = await this.ticketRepository.findOneBy({ ticketId });
    if (!foundTicket) {
      throw new NotFoundException(`Ticket with id: ${ticketId} not found`);
    }
    return foundTicket;
  }

  async remove(ticketId: number) {
    const foundTicket = await this.findOne(ticketId);
    this.eventService.increaseSeats(foundTicket.eventId);
    await this.ticketRepository.remove(foundTicket);
  }
}
