import { AppComponent } from './../app.component';
import { Component, OnInit } from '@angular/core';
import { CoronaVirus } from '../model/coronaVirus';
import { CoronaService } from '../service/corona.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';

export class ChartDataModel {
  public data: SerieModel[];
  constructor(data:  SerieModel[]) {
      this.data = data;
  }
}

export class SerieModel {
  public name: string;
  public series: SeriersChildModel[];
  constructor(name:  string, series: SeriersChildModel[]) {
      this.name = name;
      this.series = series;
  }
}

export class SeriersChildModel {
  public name: string;
  public value: number;
  constructor(name:  string, value: number) {
      this.name = name;
      this.value = value;
  }
}

@Component({
  selector: 'app-corona-list',
  templateUrl: './corona-list.component.html',
  styleUrls: ['./corona-list.component.css'],
  providers: [NgxChartsModule]
})
export class CoronaListComponent implements OnInit {
 
  coronas: CoronaVirus[];

ngxData: ChartDataModel = {
      data: []
    };

  view: any[] = [800, 600];

  // options for the chart
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Number of People';
  timeline = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legend: boolean = true;
  legendPosition: string = 'below';
  colorScheme = {
    domain: ['#9370DB', '#87CEFA', '#FA8072', '#FF7F50', '#90EE90', '#9370DB']
  };

  single = new Array();
  multi: any;
 
  totalLatest     = new Array();
  countriesLatest = new Array();

  constructor(private coronaService: CoronaService) {
  }
 
  ngOnInit() {
    console.log(new Date() + ": " + JSON.stringify("Init Coronas"));
       
    this.totalLatest     = this.coronaService.getTotalLatestSampleData();
    this.countriesLatest = this.coronaService.getCountriesLatestSampleData();

    this.multi  = this.coronaService.getMultiSampleData();
    this.single = this.coronaService.getSingleSampleData();
 
    //Get Corona Data
    this.coronaService.getCountriesLatest().subscribe(data => {
      this.coronas = data;
      this.handleCountriesLatest(this.coronas);
    });
  }

  handleCountriesLatest(coronas: CoronaVirus[])  {
    this.adjustDisplay(this.coronas);
    this.fill(this.coronas);
    this.multi = this.ngxData.data;
  }

  adjustDisplay(coronas: CoronaVirus[]) {
    for (var i = 0; i < this.coronas.length; i++) {
      this.coronas[i].lastChangeDisplay = new Date(this.coronas[i].lastChange).toLocaleString();
      this.coronas[i].lastUpdateDisplay = new Date(this.coronas[i].lastUpdate).toDateString();
      this.coronas[i].population = this.formatNumber(this.coronas[i].population);
    }    
  }

  fill(coronas: CoronaVirus[]) {
    var serielModelList = [];

    for (var i = 0; i < this.coronas.length; i++) {
        if (this.coronas[i].country == "Italy" || 
            this.coronas[i].country == "Spain" ||
            this.coronas[i].country == "Austria" || 
            this.coronas[i].country == "France" ||  
            this.coronas[i].country == "Germany" ||  
            this.coronas[i].country == "India" ||  
            this.coronas[i].country == "USA" ||  
            this.coronas[i].country == "Israel" ||  
            this.coronas[i].country == "China")
        {
          var seriesList = [];
          seriesList.push(new SeriersChildModel("Confirmed", this.coronas[i].confirmed));
          seriesList.push(new SeriersChildModel("Recovered", this.coronas[i].recovered));
          seriesList.push(new SeriersChildModel("Deaths",    this.coronas[i].deaths));
          var country = new SerieModel(this.coronas[i].country, seriesList);  
          serielModelList.push(country);   
        }
    }

    this.ngxData = new ChartDataModel(serielModelList);
  }

  formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

  onSelect(data): void {
    //console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    //console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    //console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
