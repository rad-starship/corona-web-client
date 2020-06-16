import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./../app.component.navbar.css']
})
export class SettingsComponent implements OnInit {

  clickMessage = ''; 

  constructor() { }

  ngOnInit(): void {
  }

  onTenantKeycloak() {
    window.open('http://localhost:8080/auth/', "_blank");
  }
}
