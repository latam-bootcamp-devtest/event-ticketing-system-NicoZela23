import { Injectable, NotFoundException, Query } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from './dto/pagination.dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}
  async create(createEventDto: CreateEventDto) {
    const createdEvent = await this.eventRepository.create(createEventDto);
    this.eventRepository.save(createdEvent);
    return createEventDto;
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    const [events, total] = await this.eventRepository.findAndCount({
      take: limit,
      skip: offset,
    });

    return {
      pagesize: total,
      limit,
      offset,
      data: events,
    };
  }

  async findOne(eventId: number) {
    const foundEvent = await this.eventRepository.findOneBy({ eventId });
    if (!foundEvent) {
      throw new NotFoundException(`Event with id: ${eventId} not found`);
    }
    return foundEvent;
  }

  async decreaseSeats(eventId: number) {
    const event = await this.findOne(eventId);
    const pastValues = event.availableSeats;
    event.availableSeats = pastValues - 1;
    await this.eventRepository.save(event);
  }

  async increaseSeats(eventId: number) {
    const event = await this.findOne(eventId);
    const pastValues = event.availableSeats;
    event.availableSeats = pastValues + 1;
    await this.eventRepository.save(event);
  }
}
