import { HttpErrorResponse} from '@angular/common/http';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { AppComponent } from './../app.component';
import { Component, OnInit } from '@angular/core';
import { CoronaVirus } from '../model/coronaVirus';
import { CoronaService } from '../service/corona.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartDataModel } from '../model/chartData';
import { SerieModel } from '../model/seriel';
import { SeriersChildModel } from '../model/seriersChild';

@Component({
  selector: 'app-corona-list',
  templateUrl: './corona-list.component.html',
  styleUrls: ['./../app.component.navbar.css'],
  providers: [NgxChartsModule]
})
export class CoronaListComponent implements OnInit {
  clickMessage = ''; 
  coronas: CoronaVirus[];

  //General
  cardColor: string = '#232837';

  //OverAll Today
  totalsLatestDate: string;
  totalsLatest: any[];

  //

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
  numberOfWorldsDeaths = new Array();

  multi: any;
 
  totalLatest     = new Array();
  topCountriesLatest = new Array();

  country: string;
  countryMode: boolean;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private coronaService: CoronaService) {
    this.country = "";
  }
 
  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.country = params['country'];

      console.log(new Date() + ": " + JSON.stringify("Init Coronas"), this.country);

      if (this.country == "" || this.country == undefined) {
        this.country = "";
        this.countryMode = false;
        console.log("Country: " + this.country, "Mode: " + this.countryMode);
        this.displayAll();
      }
      else {
        this.countryMode = true;
        console.log("Country: " + this.country, "Mode: " + this.countryMode);
        this.displayCountry(this.country);
      }
  });
  }

  private displayCountry(country: string) {
    this.getCountryLatest(country);
  }

  private displayAll() {
    this.getTotalsLatest();
    this.getCountriesLatest("");
  }

  private getTotalsLatest() {
    this.coronaService.getTotalsLatest().subscribe((data: CoronaVirus) => {
      this.totalsLatest = [
        { "name": "Confirmed",  "value": this.formatNumber(data.confirmed) },
        { "name": "Verified",   "value": this.formatNumber(data.confirmed-data.recovered) },
        { "name": "Recovered",  "value": this.formatNumber(data.recovered) },
        { "name": "Critical",   "value": this.formatNumber(data.critical) },
        { "name": "Deaths",     "value": this.formatNumber(data.deaths) }
      ];     
      this.totalsLatestDate = this.convert2Date(data.lastUpdate);

      console.log("totalsLatest", new Date() + ": " + JSON.stringify(data));
    }, err => {
      var errMsg = err;
      if (err.error != null)
      {
        errMsg = err.error;
        if (err.error.Error != null)
          errMsg = err.error.Error; 
      }
      this.clickMessage = 'Error Loading Error: ' + errMsg;      
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          this.clickMessage = 'Login expired. Redirect to login page...';
          // redirect to the login route
          setTimeout(() => 
          {
            this.router.navigate(['/']);
          },
          2000);   
        }
      }      
    });
  }

  private getCountryLatest(country: string) {
    this.getCountriesLatest(country);
  }

  private getCountriesLatest(country: string) {
    //Get Corona Data
    this.coronaService.getCountriesLatest().subscribe((data: CoronaVirus[]) => {

      if (country == "") {
        this.coronas = data;
      }
      else {
        var newData:CoronaVirus[];
        newData = [];
        for (var i = 0; i < data.length; i++) {
          if (data[i].country == country)
            newData.push(data[i]);
        }
        this.coronas = newData;
      }

      this.handleCountriesLatest(this.coronas);

      var arr: CoronaVirus[];
      arr = Object.assign([], this.coronas);

      arr.sort(function (a, b) {
        return b.confirmed - a.confirmed;
      });

       this.topCountriesLatest = [];
       this.single = [];
       this.numberOfWorldsDeaths = [];
       this.multi = [];
       for (var i = 0; i < arr.length; i++) {
       {
         if (country != "" && arr[i].country != country)
          continue;

          this.topCountriesLatest.push({ "name": arr[i].country, "value": arr[i].confirmed });

          if (arr[i].deaths >  2000)
             this.numberOfWorldsDeaths.push({ "name": arr[i].country, "value": arr[i].deaths });

          if (arr[i].country == "Brazil" || 
              arr[i].country == "India" || 
              arr[i].country == "Spain" || 
              arr[i].country == "Peru" || 
              arr[i].country == "Brazil" || 
              arr[i].country == "Chile" || 
              arr[i].country == "Russia") {
            this.single.push({ "name": arr[i].country, "value": arr[i].confirmed });
          }

          if (arr[i].confirmed > 100000)
          {
            var series = [];
            series.push({"name": "Confirmed", "value": arr[i].confirmed});
            series.push({"name": "Critical", "value": arr[i].critical});
            series.push({"name": "Deaths", "value": arr[i].deaths});
            this.multi.push({ "name": arr[i].country, "series": series});
          }
       }
      }      
    }, err => {
      var errMsg = err;
      if (err.error != null)
      {
        errMsg = err.error;
        if (err.error.Error != null)
          errMsg = err.error.Error; 
      }
      this.clickMessage = 'Error Loading Error: ' + errMsg;      
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          this.clickMessage = 'Login expired. Redirect to login page...';
          // redirect to the login route
          setTimeout(() => 
          {
            this.router.navigate(['/']);
          },
          2000);   
        }
      }      
    });
  }

  handleCountriesLatest(coronas: CoronaVirus[])  {
    this.adjustDisplay(this.coronas);
    this.fill(this.coronas);
    this.multi = this.ngxData.data;
  }

  adjustDisplay(coronas: CoronaVirus[]) {
    for (var i = 0; i < this.coronas.length; i++) {
      this.coronas[i].lastChangeDisplay = this.convert2Date(this.coronas[i].lastChange);
      this.coronas[i].lastUpdateDisplay = this.convert2Date(this.coronas[i].lastUpdate);
      this.coronas[i].population        = this.formatNumber(this.coronas[i].population);
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

  convert2Date(date:number) {
    return new Date(date).toDateString();
    //    return new Date(date).toLocaleString();
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
