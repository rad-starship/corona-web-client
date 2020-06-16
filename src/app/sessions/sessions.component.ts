import { Component, OnInit } from '@angular/core';
import { Session } from '../model/session';

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./../app.component.navbar.css']
})
export class SessionsComponent implements OnInit {

  sessions: Session[];
  clickMessage = ''; 

  constructor() { }

  ngOnInit(): void {
  }

  onTenantKeycloak() {
    window.open('http://localhost:8080/auth/', "_blank");
  }  

  onDelete(session: Session) {

  }

  onRowSelected(event: Event) {

  }  
}
