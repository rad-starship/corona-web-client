import { ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CoronaVirus } from '../model/coronaVirus';
import { Observable } from 'rxjs/Observable';

export interface SingleValue {
  name: string;
  value: number;
}

//https://govextra.gov.il/ministry-of-health/corona/corona-virus/
@Injectable()
export class CoronaService {

  private baseUrl: string;
  private totalsLatestUrl: string;
  private totalsDailyUrl: string;
  private countryDailyUrl: string;
  private countriesLatestUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = 'http://localhost:8083/';
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

  getIsraelData()
  {
    return this.israelData;
  }

  israelData = 
  [
		{
			"date": "1/26/2020",
			"overallTests": "3",
			"critical": "0",
			"hospitalized": "0",
			"respiration": "0",
			"verified": "4",
			"deaths": "0"
		},
		{
			"date": "1/27/2020",
			"overallTests": "4",
			"critical": "0",
			"hospitalized": "0",
			"respiration": "0",
			"verified": "4",
			"deaths": "0"
		},
		{
			"date": "1/28/2020",
			"overallTests": "4",
			"critical": "0",
			"hospitalized": "0",
			"respiration": "0",
			"verified": "4",
			"deaths": "0"
		},
		{
			"date": "1/29/2020",
			"overallTests": "7",
			"critical": "0",
			"hospitalized": "0",
			"respiration": "0",
			"verified": "4",
			"deaths": "0"
		},
		{
			"date": "1/30/2020",
			"overallTests": "11",
			"critical": "0",
			"hospitalized": "0",
			"respiration": "0",
			"verified": "4",
			"deaths": "0"
		},
		{
			"date": "1/31/2020",
			"overallTests": "11",
			"critical": "0",
			"hospitalized": "0",
			"respiration": "0",
			"verified": "4",
			"deaths": "0"
		},
		{
			"date": "1/2/2020",
			"overallTests": "11",
			"critical": "0",
			"hospitalized": "0",
			"respiration": "0",
			"verified": "4",
			"deaths": "0"
		},
		{
			"date": "2/2/2020",
			"overallTests": "18",
			"critical": "0",
			"hospitalized": "0",
			"respiration": "0",
			"verified": "4",
			"deaths": "0"
		},
		{
			"date": "3/2/2020",
			"overallTests": "25",
			"critical": "0",
			"hospitalized": "0",
			"respiration": "0",
			"verified": "4",
			"deaths": "0"
		},
		{
			"date": "4/2/2020",
			"overallTests": "31",
			"critical": "0",
			"hospitalized": "0",
			"respiration": "0",
			"verified": "4",
			"deaths": "0"
		},
		{
			"date": "5/2/2020",
			"overallTests": "31",
			"critical": "0",
			"hospitalized": "0",
			"respiration": "0",
			"verified": "4",
			"deaths": "0"
		},
		{
			"date": "6/2/2020",
			"overallTests": "31",
			"critical": "0",
			"hospitalized": "0",
			"respiration": "0",
			"verified": "4",
			"deaths": "0"
		},
		{
			"date": "7/2/2020",
			"overallTests": "31",
			"critical": "0",
			"hospitalized": "0",
			"respiration": "0",
			"verified": "4",
			"deaths": "0"
		},
		{
			"date": "8/2/2020",
			"overallTests": "31",
			"critical": "0",
			"hospitalized": "0",
			"respiration": "0",
			"verified": "4",
			"deaths": "0"
		},
		{
			"date": "9/2/2020",
			"overallTests": "71",
			"critical": "0",
			"hospitalized": "0",
			"respiration": "0",
			"verified": "4",
			"deaths": "0"
		},
		{
			"date": "10/2/2020",
			"overallTests": "99",
			"critical": "0",
			"hospitalized": "0",
			"respiration": "0",
			"verified": "4",
			"deaths": "0"
		},
		{
			"date": "11/2/2020",
			"overallTests": "149",
			"critical": "0",
			"hospitalized": "0",
			"respiration": "0",
			"verified": "4",
			"deaths": "0"
		},
		{
			"date": "12/2/2020",
			"overallTests": "184",
			"critical": "0",
			"hospitalized": "0",
			"respiration": "0",
			"verified": "4",
			"deaths": "0"
		},
		{
			"date": "2/13/2020",
			"overallTests": "219",
			"critical": "0",
			"hospitalized": "0",
			"respiration": "0",
			"verified": "4",
			"deaths": "0"
		},
		{
			"date": "2/14/2020",
			"overallTests": "249",
			"critical": "0",
			"hospitalized": "0",
			"respiration": "0",
			"verified": "4",
			"deaths": "0"
		},
		{
			"date": "2/15/2020",
			"overallTests": "252",
			"critical": "0",
			"hospitalized": "0",
			"respiration": "0",
			"verified": "4",
			"deaths": "0"
		},
		{
			"date": "2/16/2020",
			"overallTests": "275",
			"critical": "0",
			"hospitalized": "0",
			"respiration": "0",
			"verified": "4",
			"deaths": "0"
		},
		{
			"date": "2/17/2020",
			"overallTests": "316",
			"critical": "0",
			"hospitalized": "0",
			"respiration": "0",
			"verified": "4",
			"deaths": "0"
		},
		{
			"date": "2/18/2020",
			"overallTests": "362",
			"critical": "0",
			"hospitalized": "0",
			"respiration": "0",
			"verified": "4",
			"deaths": "0"
		},
		{
			"date": "2/19/2020",
			"overallTests": "396",
			"critical": "0",
			"hospitalized": "0",
			"respiration": "0",
			"verified": "4",
			"deaths": "0"
		},
		{
			"date": "2/20/2020",
			"overallTests": "425",
			"critical": "0",
			"hospitalized": "0",
			"respiration": "0",
			"verified": "4",
			"deaths": "0"
		},
		{
			"date": "2/21/2020",
			"overallTests": "462",
			"critical": "0",
			"hospitalized": "2",
			"respiration": "0",
			"verified": "5",
			"deaths": "0"
		},
		{
			"date": "2/22/2020",
			"overallTests": "475",
			"critical": "0",
			"hospitalized": "2",
			"respiration": "0",
			"verified": "5",
			"deaths": "0"
		},
		{
			"date": "2/23/2020",
			"overallTests": "531",
			"critical": "0",
			"hospitalized": "2",
			"respiration": "0",
			"verified": "5",
			"deaths": "0"
		},
		{
			"date": "2/24/2020",
			"overallTests": "607",
			"critical": "0",
			"hospitalized": "2",
			"respiration": "0",
			"verified": "6",
			"deaths": "0"
		},
		{
			"date": "2/25/2020",
			"overallTests": "715",
			"critical": "0",
			"hospitalized": "2",
			"respiration": "0",
			"verified": "6",
			"deaths": "0"
		},
		{
			"date": "2/26/2020",
			"overallTests": "823",
			"critical": "0",
			"hospitalized": "2",
			"respiration": "0",
			"verified": "6",
			"deaths": "0"
		},
		{
			"date": "2/27/2020",
			"overallTests": "994",
			"critical": "0",
			"hospitalized": "3",
			"respiration": "0",
			"verified": "7",
			"deaths": "0"
		},
		{
			"date": "2/28/2020",
			"overallTests": "1113",
			"critical": "0",
			"hospitalized": "5",
			"respiration": "0",
			"verified": "10",
			"deaths": "0"
		},
		{
			"date": "2/29/2020",
			"overallTests": "1272",
			"critical": "0",
			"hospitalized": "5",
			"respiration": "0",
			"verified": "10",
			"deaths": "0"
		},
		{
			"date": "1/3/2020",
			"overallTests": "1460",
			"critical": "0",
			"hospitalized": "7",
			"respiration": "0",
			"verified": "11",
			"deaths": "0"
		},
		{
			"date": "2/3/2020",
			"overallTests": "1631",
			"critical": "0",
			"hospitalized": "11",
			"respiration": "0",
			"verified": "16",
			"deaths": "0"
		},
		{
			"date": "3/3/2020",
			"overallTests": "1866",
			"critical": "0",
			"hospitalized": "10",
			"respiration": "0",
			"verified": "19",
			"deaths": "0"
		},
		{
			"date": "4/3/2020",
			"overallTests": "1995",
			"critical": "0",
			"hospitalized": "11",
			"respiration": "0",
			"verified": "19",
			"deaths": "0"
		},
		{
			"date": "5/3/2020",
			"overallTests": "2169",
			"critical": "1",
			"hospitalized": "13",
			"respiration": "0",
			"verified": "21",
			"deaths": "0"
		},
		{
			"date": "6/3/2020",
			"overallTests": "2444",
			"critical": "2",
			"hospitalized": "16",
			"respiration": "1",
			"verified": "25",
			"deaths": "0"
		},
		{
			"date": "7/3/2020",
			"overallTests": "2780",
			"critical": "3",
			"hospitalized": "20",
			"respiration": "2",
			"verified": "29",
			"deaths": "0"
		},
		{
			"date": "8/3/2020",
			"overallTests": "3201",
			"critical": "5",
			"hospitalized": "26",
			"respiration": "4",
			"verified": "38",
			"deaths": "0"
		},
		{
			"date": "9/3/2020",
			"overallTests": "3719",
			"critical": "6",
			"hospitalized": "40",
			"respiration": "5",
			"verified": "42",
			"deaths": "0"
		},
		{
			"date": "10/3/2020",
			"overallTests": "4239",
			"critical": "6",
			"hospitalized": "59",
			"respiration": "5",
			"verified": "75",
			"deaths": "0"
		},
		{
			"date": "11/3/2020",
			"overallTests": "4641",
			"critical": "7",
			"hospitalized": "81",
			"respiration": "6",
			"verified": "95",
			"deaths": "0"
		},
		{
			"date": "12/3/2020",
			"overallTests": "5249",
			"critical": "7",
			"hospitalized": "103",
			"respiration": "6",
			"verified": "116",
			"deaths": "0"
		},
		{
			"date": "3/13/2020",
			"overallTests": "5946",
			"critical": "7",
			"hospitalized": "123",
			"respiration": "6",
			"verified": "152",
			"deaths": "0"
		},
		{
			"date": "3/14/2020",
			"overallTests": "6560",
			"critical": "6",
			"hospitalized": "161",
			"respiration": "4",
			"verified": "181",
			"deaths": "0"
		},
		{
			"date": "3/15/2020",
			"overallTests": "7744",
			"critical": "9",
			"hospitalized": "201",
			"respiration": "6",
			"verified": "219",
			"deaths": "0"
		},
		{
			"date": "3/16/2020",
			"overallTests": "9089",
			"critical": "11",
			"hospitalized": "221",
			"respiration": "7",
			"verified": "292",
			"deaths": "0"
		},
		{
			"date": "3/17/2020",
			"overallTests": "10736",
			"critical": "12",
			"hospitalized": "256",
			"respiration": "7",
			"verified": "386",
			"deaths": "0"
		},
		{
			"date": "3/18/2020",
			"overallTests": "12843",
			"critical": "16",
			"hospitalized": "306",
			"respiration": "7",
			"verified": "504",
			"deaths": "0"
		},
		{
			"date": "3/19/2020",
			"overallTests": "14917",
			"critical": "21",
			"hospitalized": "295",
			"respiration": "12",
			"verified": "639",
			"deaths": "0"
		},
		{
			"date": "3/20/2020",
			"overallTests": "17238",
			"critical": "23",
			"hospitalized": "289",
			"respiration": "12",
			"verified": "807",
			"deaths": "1"
		},
		{
			"date": "3/21/2020",
			"overallTests": "19346",
			"critical": "27",
			"hospitalized": "276",
			"respiration": "15",
			"verified": "1017",
			"deaths": "1"
		},
		{
			"date": "3/22/2020",
			"overallTests": "22696",
			"critical": "37",
			"hospitalized": "323",
			"respiration": "22",
			"verified": "1271",
			"deaths": "1"
		},
		{
			"date": "3/23/2020",
			"overallTests": "26320",
			"critical": "42",
			"hospitalized": "350",
			"respiration": "24",
			"verified": "1622",
			"deaths": "1"
		},
		{
			"date": "3/24/2020",
			"overallTests": "31109",
			"critical": "45",
			"hospitalized": "393",
			"respiration": "26",
			"verified": "2045",
			"deaths": "4"
		},
		{
			"date": "3/25/2020",
			"overallTests": "37044",
			"critical": "48",
			"hospitalized": "412",
			"respiration": "27",
			"verified": "2470",
			"deaths": "5"
		},
		{
			"date": "3/26/2020",
			"overallTests": "43548",
			"critical": "54",
			"hospitalized": "464",
			"respiration": "31",
			"verified": "2990",
			"deaths": "10"
		},
		{
			"date": "3/27/2020",
			"overallTests": "49300",
			"critical": "65",
			"hospitalized": "515",
			"respiration": "36",
			"verified": "3424",
			"deaths": "12"
		},
		{
			"date": "3/28/2020",
			"overallTests": "55039",
			"critical": "69",
			"hospitalized": "512",
			"respiration": "39",
			"verified": "3905",
			"deaths": "12"
		},
		{
			"date": "3/29/2020",
			"overallTests": "62614",
			"critical": "78",
			"hospitalized": "542",
			"respiration": "50",
			"verified": "4437",
			"deaths": "15"
		},
		{
			"date": "3/30/2020",
			"overallTests": "69714",
			"critical": "87",
			"hospitalized": "619",
			"respiration": "54",
			"verified": "4983",
			"deaths": "16"
		},
		{
			"date": "3/31/2020",
			"overallTests": "77703",
			"critical": "98",
			"hospitalized": "667",
			"respiration": "64",
			"verified": "5721",
			"deaths": "20"
		},
		{
			"date": "1/4/2020",
			"overallTests": "86712",
			"critical": "111",
			"hospitalized": "769",
			"respiration": "72",
			"verified": "6417",
			"deaths": "28"
		},
		{
			"date": "2/4/2020",
			"overallTests": "96936",
			"critical": "113",
			"hospitalized": "812",
			"respiration": "79",
			"verified": "7136",
			"deaths": "38"
		},
		{
			"date": "3/4/2020",
			"overallTests": "107257",
			"critical": "129",
			"hospitalized": "803",
			"respiration": "92",
			"verified": "7734",
			"deaths": "43"
		},
		{
			"date": "4/4/2020",
			"overallTests": "113608",
			"critical": "139",
			"hospitalized": "789",
			"respiration": "107",
			"verified": "8162",
			"deaths": "49"
		},
		{
			"date": "5/4/2020",
			"overallTests": "123003",
			"critical": "135",
			"hospitalized": "825",
			"respiration": "106",
			"verified": "8746",
			"deaths": "55"
		},
		{
			"date": "6/4/2020",
			"overallTests": "130487",
			"critical": "147",
			"hospitalized": "809",
			"respiration": "110",
			"verified": "9197",
			"deaths": "62"
		},
		{
			"date": "7/4/2020",
			"overallTests": "137454",
			"critical": "159",
			"hospitalized": "744",
			"respiration": "106",
			"verified": "9576",
			"deaths": "69"
		},
		{
			"date": "8/4/2020",
			"overallTests": "143327",
			"critical": "165",
			"hospitalized": "692",
			"respiration": "114",
			"verified": "9914",
			"deaths": "78"
		},
		{
			"date": "9/4/2020",
			"overallTests": "149070",
			"critical": "166",
			"hospitalized": "665",
			"respiration": "117",
			"verified": "10258",
			"deaths": "87"
		},
		{
			"date": "10/4/2020",
			"overallTests": "156416",
			"critical": "169",
			"hospitalized": "668",
			"respiration": "128",
			"verified": "10617",
			"deaths": "95"
		},
		{
			"date": "11/4/2020",
			"overallTests": "163118",
			"critical": "182",
			"hospitalized": "626",
			"respiration": "130",
			"verified": "10961",
			"deaths": "101"
		},
		{
			"date": "12/4/2020",
			"overallTests": "173720",
			"critical": "177",
			"hospitalized": "667",
			"respiration": "130",
			"verified": "11516",
			"deaths": "108"
		},
		{
			"date": "4/13/2020",
			"overallTests": "184655",
			"critical": "192",
			"hospitalized": "687",
			"respiration": "137",
			"verified": "11955",
			"deaths": "116"
		},
		{
			"date": "4/14/2020",
			"overallTests": "197327",
			"critical": "178",
			"hospitalized": "673",
			"respiration": "134",
			"verified": "12356",
			"deaths": "124"
		},
		{
			"date": "4/15/2020",
			"overallTests": "206760",
			"critical": "180",
			"hospitalized": "672",
			"respiration": "133",
			"verified": "12667",
			"deaths": "137"
		},
		{
			"date": "4/16/2020",
			"overallTests": "219543",
			"critical": "181",
			"hospitalized": "703",
			"respiration": "136",
			"verified": "12964",
			"deaths": "144"
		},
		{
			"date": "4/17/2020",
			"overallTests": "231124",
			"critical": "166",
			"hospitalized": "664",
			"respiration": "125",
			"verified": "13262",
			"deaths": "153"
		},
		{
			"date": "4/18/2020",
			"overallTests": "241729",
			"critical": "174",
			"hospitalized": "643",
			"respiration": "118",
			"verified": "13553",
			"deaths": "164"
		},
		{
			"date": "4/19/2020",
			"overallTests": "253207",
			"critical": "157",
			"hospitalized": "619",
			"respiration": "118",
			"verified": "13831",
			"deaths": "172"
		},
		{
			"date": "4/20/2020",
			"overallTests": "268573",
			"critical": "155",
			"hospitalized": "611",
			"respiration": "123",
			"verified": "14131",
			"deaths": "178"
		},
		{
			"date": "4/21/2020",
			"overallTests": "282168",
			"critical": "145",
			"hospitalized": "543",
			"respiration": "119",
			"verified": "14415",
			"deaths": "187"
		},
		{
			"date": "4/22/2020",
			"overallTests": "295455",
			"critical": "149",
			"hospitalized": "531",
			"respiration": "110",
			"verified": "14640",
			"deaths": "190"
		},
		{
			"date": "4/23/2020",
			"overallTests": "309615",
			"critical": "146",
			"hospitalized": "502",
			"respiration": "114",
			"verified": "14917",
			"deaths": "194"
		},
		{
			"date": "4/24/2020",
			"overallTests": "322225",
			"critical": "144",
			"hospitalized": "461",
			"respiration": "108",
			"verified": "15167",
			"deaths": "197"
		},
		{
			"date": "4/25/2020",
			"overallTests": "331288",
			"critical": "136",
			"hospitalized": "441",
			"respiration": "107",
			"verified": "15326",
			"deaths": "200"
		},
		{
			"date": "4/26/2020",
			"overallTests": "339751",
			"critical": "142",
			"hospitalized": "440",
			"respiration": "111",
			"verified": "15411",
			"deaths": "202"
		},
		{
			"date": "4/27/2020",
			"overallTests": "350866",
			"critical": "133",
			"hospitalized": "411",
			"respiration": "102",
			"verified": "15528",
			"deaths": "206"
		},
		{
			"date": "4/28/2020",
			"overallTests": "361491",
			"critical": "128",
			"hospitalized": "390",
			"respiration": "101",
			"verified": "15689",
			"deaths": "211"
		},
		{
			"date": "4/29/2020",
			"overallTests": "370483",
			"critical": "121",
			"hospitalized": "376",
			"respiration": "96",
			"verified": "15771",
			"deaths": "217"
		},
		{
			"date": "4/30/2020",
			"overallTests": "380401",
			"critical": "113",
			"hospitalized": "377",
			"respiration": "90",
			"verified": "15913",
			"deaths": "223"
		},
		{
			"date": "1/5/2020",
			"overallTests": "391434",
			"critical": "111",
			"hospitalized": "350",
			"respiration": "89",
			"verified": "16030",
			"deaths": "227"
		},
		{
			"date": "2/5/2020",
			"overallTests": "397001",
			"critical": "112",
			"hospitalized": "334",
			"respiration": "90",
			"verified": "16087",
			"deaths": "230"
		},
		{
			"date": "3/5/2020",
			"overallTests": "405016",
			"critical": "102",
			"hospitalized": "323",
			"respiration": "84",
			"verified": "16114",
			"deaths": "233"
		},
		{
			"date": "4/5/2020",
			"overallTests": "414271",
			"critical": "98",
			"hospitalized": "318",
			"respiration": "78",
			"verified": "16167",
			"deaths": "236"
		},
		{
			"date": "5/5/2020",
			"overallTests": "423215",
			"critical": "92",
			"hospitalized": "276",
			"respiration": "72",
			"verified": "16199",
			"deaths": "238"
		},
		{
			"date": "6/5/2020",
			"overallTests": "432663",
			"critical": "89",
			"hospitalized": "268",
			"respiration": "70",
			"verified": "16264",
			"deaths": "239"
		},
		{
			"date": "7/5/2020",
			"overallTests": "442780",
			"critical": "85",
			"hospitalized": "257",
			"respiration": "71",
			"verified": "16325",
			"deaths": "240"
		},
		{
			"date": "8/5/2020",
			"overallTests": "450927",
			"critical": "78",
			"hospitalized": "240",
			"respiration": "64",
			"verified": "16358",
			"deaths": "246"
		},
		{
			"date": "9/5/2020",
			"overallTests": "454790",
			"critical": "78",
			"hospitalized": "239",
			"respiration": "64",
			"verified": "16377",
			"deaths": "248"
		},
		{
			"date": "10/5/2020",
			"overallTests": "459730",
			"critical": "74",
			"hospitalized": "243",
			"respiration": "66",
			"verified": "16406",
			"deaths": "253"
		},
		{
			"date": "11/5/2020",
			"overallTests": "468946",
			"critical": "69",
			"hospitalized": "226",
			"respiration": "60",
			"verified": "16448",
			"deaths": "258"
		},
		{
			"date": "12/5/2020",
			"overallTests": "476462",
			"critical": "65",
			"hospitalized": "220",
			"respiration": "56",
			"verified": "16471",
			"deaths": "261"
		},
		{
			"date": "5/13/2020",
			"overallTests": "484602",
			"critical": "61",
			"hospitalized": "198",
			"respiration": "53",
			"verified": "16508",
			"deaths": "264"
		},
		{
			"date": "5/14/2020",
			"overallTests": "492904",
			"critical": "61",
			"hospitalized": "188",
			"respiration": "52",
			"verified": "16530",
			"deaths": "266"
		},
		{
			"date": "5/15/2020",
			"overallTests": "498565",
			"critical": "61",
			"hospitalized": "182",
			"respiration": "52",
			"verified": "16542",
			"deaths": "266"
		},
		{
			"date": "5/16/2020",
			"overallTests": "500067",
			"critical": "60",
			"hospitalized": "178",
			"respiration": "51",
			"verified": "16547",
			"deaths": "269"
		},
		{
			"date": "5/17/2020",
			"overallTests": "504701",
			"critical": "55",
			"hospitalized": "186",
			"respiration": "45",
			"verified": "16562",
			"deaths": "273"
		},
		{
			"date": "5/18/2020",
			"overallTests": "512368",
			"critical": "52",
			"hospitalized": "171",
			"respiration": "43",
			"verified": "16589",
			"deaths": "276"
		},
		{
			"date": "5/19/2020",
			"overallTests": "519480",
			"critical": "51",
			"hospitalized": "159",
			"respiration": "40",
			"verified": "16611",
			"deaths": "278"
		},
		{
			"date": "5/20/2020",
			"overallTests": "525436",
			"critical": "46",
			"hospitalized": "153",
			"respiration": "41",
			"verified": "16626",
			"deaths": "279"
		},
		{
			"date": "5/21/2020",
			"overallTests": "531551",
			"critical": "47",
			"hospitalized": "149",
			"respiration": "37",
			"verified": "16643",
			"deaths": "279"
		},
		{
			"date": "5/22/2020",
			"overallTests": "536546",
			"critical": "47",
			"hospitalized": "145",
			"respiration": "37",
			"verified": "16664",
			"deaths": "279"
		},
		{
			"date": "5/23/2020",
			"overallTests": "537263",
			"critical": "47",
			"hospitalized": "148",
			"respiration": "37",
			"verified": "16669",
			"deaths": "279"
		},
		{
			"date": "5/24/2020",
			"overallTests": "541063",
			"critical": "43",
			"hospitalized": "146",
			"respiration": "34",
			"verified": "16683",
			"deaths": "280"
		},
		{
			"date": "5/25/2020",
			"overallTests": "546309",
			"critical": "41",
			"hospitalized": "130",
			"respiration": "29",
			"verified": "16706",
			"deaths": "282"
		},
		{
			"date": "5/26/2020",
			"overallTests": "553078",
			"critical": "36",
			"hospitalized": "121",
			"respiration": "32",
			"verified": "16756",
			"deaths": "282"
		},
		{
			"date": "5/27/2020",
			"overallTests": "559768",
			"critical": "39",
			"hospitalized": "119",
			"respiration": "37",
			"verified": "16796",
			"deaths": "284"
		},
		{
			"date": "5/28/2020",
			"overallTests": "565124",
			"critical": "36",
			"hospitalized": "111",
			"respiration": "35",
			"verified": "16873",
			"deaths": "285"
		},
		{
			"date": "5/29/2020",
			"overallTests": "566987",
			"critical": "39",
			"hospitalized": "115",
			"respiration": "36",
			"verified": "16986",
			"deaths": "285"
		},
		{
			"date": "5/30/2020",
			"overallTests": "568045",
			"critical": "35",
			"hospitalized": "119",
			"respiration": "33",
			"verified": "17014",
			"deaths": "285"
		},
		{
			"date": "5/31/2020",
			"overallTests": "573685",
			"critical": "35",
			"hospitalized": "122",
			"respiration": "31",
			"verified": "17102",
			"deaths": "285"
		},
		{
			"date": "1/6/2020",
			"overallTests": "581844",
			"critical": "34",
			"hospitalized": "123",
			"respiration": "30",
			"verified": "17203",
			"deaths": "288"
		},
		{
			"date": "2/6/2020",
			"overallTests": "593580",
			"critical": "29",
			"hospitalized": "119",
			"respiration": "29",
			"verified": "17324",
			"deaths": "290"
		},
		{
			"date": "3/6/2020",
			"overallTests": "607162",
			"critical": "28",
			"hospitalized": "114",
			"respiration": "25",
			"verified": "17396",
			"deaths": "291"
		},
		{
			"date": "4/6/2020",
			"overallTests": "621851",
			"critical": "30",
			"hospitalized": "122",
			"respiration": "23",
			"verified": "17535",
			"deaths": "291"
		},
		{
			"date": "5/6/2020",
			"overallTests": "638184",
			"critical": "29",
			"hospitalized": "116",
			"respiration": "23",
			"verified": "17659",
			"deaths": "292"
		},
		{
			"date": "6/6/2020",
			"overallTests": "649718",
			"critical": "29",
			"hospitalized": "111",
			"respiration": "21",
			"verified": "17737",
			"deaths": "296"
		},
		{
			"date": "7/6/2020",
			"overallTests": "664815",
			"critical": "29",
			"hospitalized": "120",
			"respiration": "23",
			"verified": "17877",
			"deaths": "298"
		},
		{
			"date": "8/6/2020",
			"overallTests": "679255",
			"critical": "30",
			"hospitalized": "130",
			"respiration": "23",
			"verified": "18055",
			"deaths": "298"
		}	
     ]
    }