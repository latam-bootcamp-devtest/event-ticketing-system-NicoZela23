import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-events',
  imports: [],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventsComponent { }
