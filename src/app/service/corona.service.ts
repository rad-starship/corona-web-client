import { ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CoronaVirus } from '../model/coronaVirus';
import { Observable } from 'rxjs/Observable';

export interface SingleValue {
  name: string;
  value: number;
}

@Injectable()
export class CoronaService {

  private baseUrl: string;
  private totalsLatestUrl: string;
  private totalsDailyUrl: string;
  private countryDailyUrl: string;
  private countriesLatestUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = 'http://localhost:8086/';
    this.countriesLatestUrl = this.baseUrl + 'corona';
    this.countryDailyUrl    = this.baseUrl + 'countryDaily';
    this.totalsLatestUrl    = this.baseUrl + 'totalsLatest';
    this.totalsDailyUrl     = this.baseUrl + 'totalsDaily';
  }

  public getCountriesLatest(): Observable<CoronaVirus[]> {
    var result = this.http.get<CoronaVirus[]>(this.countriesLatestUrl);
    return result;
  }

  public getCountriesLatestSampleData()
  {
    var r = [
     { "country": "USA",   "confirmed": 1212444, "recovered": 331, "critical": 7, "deaths": 72, "lastChange": "2020-05-02T11:27:27+02:00", "lastUpdate": "2020-05-03T09:30:03+02:00"},
     { "country": "Italy",       "confirmed": 237666, "recovered": 331, "critical": 7, "deaths": 72, "lastChange": "2020-05-02T11:27:27+02:00", "lastUpdate": "2020-05-03T09:30:03+02:00"},
     { "country": "Sapin",       "confirmed": 328662, "recovered": 331, "critical": 7, "deaths": 72, "lastChange": "2020-05-02T11:27:27+02:00", "lastUpdate": "2020-05-03T09:30:03+02:00"},
     { "country": "Chaina",      "confirmed": 81097, "recovered": 331, "critical": 7, "deaths": 72, "lastChange": "2020-05-02T11:27:27+02:00", "lastUpdate": "2020-05-03T09:30:03+02:00"},
     { "country": "Israel",      "confirmed": 17221, "recovered": 331, "critical": 7, "deaths": 72, "lastChange": "2020-05-02T11:27:27+02:00", "lastUpdate": "2020-05-03T09:30:03+02:00"},
     { "country": "Brazil",      "confirmed": 34414, "recovered": 331, "critical": 7, "deaths": 72, "lastChange": "2020-05-02T11:27:27+02:00", "lastUpdate": "2020-05-03T09:30:03+02:00"},
     { "country": "Japan",       "confirmed": 1344, "recovered": 331, "critical": 7, "deaths": 72, "lastChange": "2020-05-02T11:27:27+02:00", "lastUpdate": "2020-05-03T09:30:03+02:00"},
    ];

    var single = [];
    for (var i = 0; i < r.length; i++) {
      single.push({ "name": r[i].country, "value": r[i].confirmed });
    }
    return single; 
  }

  public getCountryDaily(date, countryName) : Observable<CoronaVirus[]> {
    var result = this.http.get<CoronaVirus[]>(this.countryDailyUrl);
    return result;
  }

  public getTotalsLatest(): Observable<CoronaVirus[]> {
    var result = this.http.get<CoronaVirus[]>(this.totalsLatestUrl);
    return result;
  }

  public getTotalLatestSampleData() {
    var r = 
      {
        "confirmed": 3494535,
        "recovered": 1136205,
        "critical": 50863,
        "deaths": 244987,
        "lastChange": "2020-05-03T09:23:51+02:00",
        "lastUpdate": "2020-05-03T09:30:03+02:00"
      };

      var single = [
        { "name": "confirmed", "value": r.confirmed },
        { "name": "recovered", "value": r.recovered },
        { "name": "critical", "value": r.critical },
        { "name": "deaths", "value": r.deaths }
      ];
      return single;
  }

  /**
  {
      "confirmed": 2472259,
      "recovered": 560866,
      "deaths": 169986,
      "active": 1741407,
      "date": "2020-04-20"
    }   
   */
  public getTotalsDaily(date) {
    return this.http.get<CoronaVirus[]>(this.totalsDailyUrl);
  }

  public getSingleSampleData()
  {
     var single = [
      { "name": "USA", "value": 2243772 },
      { "name": "Chaina", "value": 1126000 },
      { "name": "Italy", "value": 296215 },
      { "name": "Spain", "value": 257363 },
      { "name": "Germany", "value": 196750 },
      { "name": "France", "value": 204617 }
    ];
    return single;
  }
  
  public getMultiSampleData()
  {
    var multi = [
    {
      "name": "China",
      "series": [
        {
          "name": "2018",
          "value": 2243772
        },
        {
          "name": "2017",
          "value": 1227770
        }
      ]
    },
  
    {
      "name": "USA",
      "series": [
        {
          "name": "2018",
          "value": 1126000
        },
        {
          "name": "2017",
          "value": 764666
        }
      ]
    },
  
    {
      "name": "Norway",
      "series": [
        {
          "name": "2018",
          "value": 296215
        },
        {
          "name": "2017",
          "value": 209122
        }
      ]
    },
  
    {
      "name": "Japan",
      "series": [
        {
          "name": "2018",
          "value": 257363
        },
        {
          "name": "2017",
          "value": 205350
        }
      ]
    },
  
    {
      "name": "Germany",
      "series": [
        {
          "name": "2018",
          "value": 196750
        },
        {
          "name": "2017",
          "value": 129246
        }
      ]
    },
  
    {
      "name": "France",
      "series": [
        {
          "name": "2018",
          "value": 204617
        },
        {
          "name": "2017",
          "value": 149797
        }
      ]
    }
  ];    
  return multi;
  }
}
