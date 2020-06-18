import { Component, OnInit } from '@angular/core';
import { Event } from '../model/event';
import { EventsService } from '../service/events.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./../app.component.navbar.css']
})
export class EventsComponent implements OnInit {

  events: Event[];
  clickMessage = ''; 

  constructor(eventsService: EventsService) { }

  ngOnInit(): void {
  }

  onTenantKeycloak() {
    window.open('http://localhost:8080/auth/', "_blank");
  }  

  onDelete(event: Event) {

  }

  onRowSelected(event: Event) {

  }
}
