import { Component, OnInit } from '@angular/core';
import { CoronaVirus } from '../model/coronaVirus';
import { CoronaService } from '../service/corona.service';
 
@Component({
  selector: 'app-corona-list',
  templateUrl: './corona-list.component.html',
  styleUrls: ['./corona-list.component.css']
})
export class CoronaListComponent implements OnInit {
 
  coronas: CoronaVirus[];
 
  constructor(private coronaService: CoronaService) {
  }
 
  ngOnInit() {
    console.log(new Date() + ": " + JSON.stringify("Init Coronas"));
    this.coronaService.findAll().subscribe(data => {
      this.coronas = data;
      console.log(new Date() + ": " + JSON.stringify(data));
    });
  }
}
