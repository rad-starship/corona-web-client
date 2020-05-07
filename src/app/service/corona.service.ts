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

  getIsraelData()
  {
    return this.israelData;
  }

  israelData = [
        {
            "date": "1/26/20",
            "overallTests": "3",
            "verified": "0",
            "hospitalized": "0",
            "critical": "0",
            "respiration": "0",
            "deaths": "0"
        },
        {
            "date": "1/27/20",
            "overallTests": "4",
            "verified": "0",
            "hospitalized": "0",
            "critical": "0",
            "respiration": "0",
            "deaths": "0"
        },
        {
            "date": "1/28/20",
            "overallTests": "4",
            "verified": "0",
            "hospitalized": "0",
            "critical": "0",
            "respiration": "0",
            "deaths": "0"
        },
        {
            "date": "1/29/20",
            "overallTests": "7",
            "verified": "0",
            "hospitalized": "0",
            "critical": "0",
            "respiration": "0",
            "deaths": "0"
        },
        {
            "date": "1/30/20",
            "overallTests": "11",
            "verified": "0",
            "hospitalized": "0",
            "critical": "0",
            "respiration": "0",
            "deaths": "0"
        },
        {
            "date": "1/31/20",
            "overallTests": "11",
            "verified": "0",
            "hospitalized": "0",
            "critical": "0",
            "respiration": "0",
            "deaths": "0"
        },
        {
            "date": "2/1/20",
            "overallTests": "11",
            "verified": "0",
            "hospitalized": "0",
            "critical": "0",
            "respiration": "0",
            "deaths": "0"
        },
        {
            "date": "2/2/20",
            "overallTests": "18",
            "verified": "0",
            "hospitalized": "0",
            "critical": "0",
            "respiration": "0",
            "deaths": "0"
        },
        {
            "date": "2/3/20",
            "overallTests": "25",
            "verified": "0",
            "hospitalized": "0",
            "critical": "0",
            "respiration": "0",
            "deaths": "0"
        },
        {
            "date": "2/4/20",
            "overallTests": "31",
            "verified": "0",
            "hospitalized": "0",
            "critical": "0",
            "respiration": "0",
            "deaths": "0"
        },
        {
            "date": "2/5/20",
            "overallTests": "31",
            "verified": "0",
            "hospitalized": "0",
            "critical": "0",
            "respiration": "0",
            "deaths": "0"
        },
        {
            "date": "2/6/20",
            "overallTests": "31",
            "verified": "0",
            "hospitalized": "0",
            "critical": "0",
            "respiration": "0",
            "deaths": "0"
        },
        {
            "date": "2/7/20",
            "overallTests": "31",
            "verified": "0",
            "hospitalized": "0",
            "critical": "0",
            "respiration": "0",
            "deaths": "0"
        },
        {
            "date": "2/8/20",
            "overallTests": "31",
            "verified": "0",
            "hospitalized": "0",
            "critical": "0",
            "respiration": "0",
            "deaths": "0"
        },
        {
            "date": "2/9/20",
            "overallTests": "71",
            "verified": "0",
            "hospitalized": "0",
            "critical": "0",
            "respiration": "0",
            "deaths": "0"
        },
        {
            "date": "2/10/20",
            "overallTests": "98",
            "verified": "0",
            "hospitalized": "0",
            "critical": "0",
            "respiration": "0",
            "deaths": "0"
        },
        {
            "date": "2/11/20",
            "overallTests": "148",
            "verified": "0",
            "hospitalized": "0",
            "critical": "0",
            "respiration": "0",
            "deaths": "0"
        },
        {
            "date": "2/12/20",
            "overallTests": "183",
            "verified": "0",
            "hospitalized": "0",
            "critical": "0",
            "respiration": "0",
            "deaths": "0"
        },
        {
            "date": "2/13/20",
            "overallTests": "218",
            "verified": "0",
            "hospitalized": "0",
            "critical": "0",
            "respiration": "0",
            "deaths": "0"
        },
        {
            "date": "2/14/20",
            "overallTests": "248",
            "verified": "0",
            "hospitalized": "0",
            "critical": "0",
            "respiration": "0",
            "deaths": "0"
        },
        {
            "date": "2/15/20",
            "overallTests": "251",
            "verified": "0",
            "hospitalized": "0",
            "critical": "0",
            "respiration": "0",
            "deaths": "0"
        },
        {
            "date": "2/16/20",
            "overallTests": "274",
            "verified": "0",
            "hospitalized": "0",
            "critical": "0",
            "respiration": "0",
            "deaths": "0"
        },
        {
            "date": "2/17/20",
            "overallTests": "315",
            "verified": "0",
            "hospitalized": "0",
            "critical": "0",
            "respiration": "0",
            "deaths": "0"
        },
        {
            "date": "2/18/20",
            "overallTests": "361",
            "verified": "0",
            "hospitalized": "0",
            "critical": "0",
            "respiration": "0",
            "deaths": "0"
        },
        {
            "date": "2/19/20",
            "overallTests": "395",
            "verified": "0",
            "hospitalized": "0",
            "critical": "0",
            "respiration": "0",
            "deaths": "0"
        },
        {
            "date": "2/20/20",
            "overallTests": "422",
            "verified": "0",
            "hospitalized": "0",
            "critical": "0",
            "respiration": "0",
            "deaths": "0"
        },
        {
            "date": "2/21/20",
            "overallTests": "450",
            "verified": "1",
            "hospitalized": "2",
            "critical": "0",
            "respiration": "0",
            "deaths": "0"
        },
        {
            "date": "2/22/20",
            "overallTests": "472",
            "verified": "1",
            "hospitalized": "2",
            "critical": "0",
            "respiration": "0",
            "deaths": "0"
        },
        {
            "date": "2/23/20",
            "overallTests": "528",
            "verified": "1",
            "hospitalized": "2",
            "critical": "0",
            "respiration": "0",
            "deaths": "0"
        },
        {
            "date": "2/24/20",
            "overallTests": "606",
            "verified": "2",
            "hospitalized": "2",
            "critical": "0",
            "respiration": "0",
            "deaths": "0"
        },
        {
            "date": "2/25/20",
            "overallTests": "713",
            "verified": "2",
            "hospitalized": "2",
            "critical": "0",
            "respiration": "0",
            "deaths": "0"
        },
        {
            "date": "2/26/20",
            "overallTests": "821",
            "verified": "2",
            "hospitalized": "2",
            "critical": "0",
            "respiration": "0",
            "deaths": "0"
        },
        {
            "date": "2/27/20",
            "overallTests": "992",
            "verified": "3",
            "hospitalized": "3",
            "critical": "0",
            "respiration": "0",
            "deaths": "0"
        },
        {
            "date": "2/28/20",
            "overallTests": "1110",
            "verified": "6",
            "hospitalized": "5",
            "critical": "0",
            "respiration": "0",
            "deaths": "0"
        },
        {
            "date": "2/29/20",
            "overallTests": "1270",
            "verified": "6",
            "hospitalized": "5",
            "critical": "0",
            "respiration": "0",
            "deaths": "0"
        },
        {
            "date": "3/1/20",
            "overallTests": "1460",
            "verified": "7",
            "hospitalized": "7",
            "critical": "0",
            "respiration": "0",
            "deaths": "0"
        },
        {
            "date": "3/2/20",
            "overallTests": "1631",
            "verified": "12",
            "hospitalized": "11",
            "critical": "0",
            "respiration": "0",
            "deaths": "0"
        },
        {
            "date": "3/3/20",
            "overallTests": "1865",
            "verified": "15",
            "hospitalized": "11",
            "critical": "0",
            "respiration": "0",
            "deaths": "0"
        },
        {
            "date": "3/4/20",
            "overallTests": "1994",
            "verified": "15",
            "hospitalized": "11",
            "critical": "0",
            "respiration": "0",
            "deaths": "0"
        },
        {
            "date": "3/5/20",
            "overallTests": "2167",
            "verified": "17",
            "hospitalized": "13",
            "critical": "1",
            "respiration": "0",
            "deaths": "0"
        },
        {
            "date": "3/6/20",
            "overallTests": "2442",
            "verified": "30",
            "hospitalized": "16",
            "critical": "2",
            "respiration": "1",
            "deaths": "0"
        },
        {
            "date": "3/7/20",
            "overallTests": "2780",
            "verified": "34",
            "hospitalized": "19",
            "critical": "3",
            "respiration": "2",
            "deaths": "0"
        },
        {
            "date": "3/8/20",
            "overallTests": "3202",
            "verified": "43",
            "hospitalized": "26",
            "critical": "5",
            "respiration": "4",
            "deaths": "0"
        },
        {
            "date": "3/9/20",
            "overallTests": "3721",
            "verified": "47",
            "hospitalized": "40",
            "critical": "6",
            "respiration": "5",
            "deaths": "0"
        },
        {
            "date": "3/10/20",
            "overallTests": "4242",
            "verified": "80",
            "hospitalized": "59",
            "critical": "6",
            "respiration": "5",
            "deaths": "0"
        },
        {
            "date": "3/11/20",
            "overallTests": "4645",
            "verified": "99",
            "hospitalized": "81",
            "critical": "7",
            "respiration": "6",
            "deaths": "0"
        },
        {
            "date": "3/12/20",
            "overallTests": "5252",
            "verified": "120",
            "hospitalized": "103",
            "critical": "7",
            "respiration": "6",
            "deaths": "0"
        },
        {
            "date": "3/13/20",
            "overallTests": "5948",
            "verified": "155",
            "hospitalized": "123",
            "critical": "7",
            "respiration": "6",
            "deaths": "0"
        },
        {
            "date": "3/14/20",
            "overallTests": "6561",
            "verified": "186",
            "hospitalized": "161",
            "critical": "6",
            "respiration": "4",
            "deaths": "0"
        },
        {
            "date": "3/15/20",
            "overallTests": "7745",
            "verified": "224",
            "hospitalized": "201",
            "critical": "9",
            "respiration": "6",
            "deaths": "0"
        },
        {
            "date": "3/16/20",
            "overallTests": "9090",
            "verified": "297",
            "hospitalized": "221",
            "critical": "11",
            "respiration": "7",
            "deaths": "0"
        },
        {
            "date": "3/17/20",
            "overallTests": "10747",
            "verified": "392",
            "hospitalized": "257",
            "critical": "12",
            "respiration": "7",
            "deaths": "0"
        },
        {
            "date": "3/18/20",
            "overallTests": "12866",
            "verified": "511",
            "hospitalized": "306",
            "critical": "16",
            "respiration": "7",
            "deaths": "0"
        },
        {
            "date": "3/19/20",
            "overallTests": "14947",
            "verified": "648",
            "hospitalized": "295",
            "critical": "21",
            "respiration": "12",
            "deaths": "0"
        },
        {
            "date": "3/20/20",
            "overallTests": "17272",
            "verified": "818",
            "hospitalized": "288",
            "critical": "23",
            "respiration": "12",
            "deaths": "1 "
        },
        {
            "date": "3/21/20",
            "overallTests": "19369",
            "verified": "1026",
            "hospitalized": "276",
            "critical": "27",
            "respiration": "15",
            "deaths": "1 "
        },
        {
            "date": "3/22/20",
            "overallTests": "22705",
            "verified": "1275",
            "hospitalized": "323",
            "critical": "37",
            "respiration": "22",
            "deaths": "1 "
        },
        {
            "date": "3/23/20",
            "overallTests": "26335",
            "verified": "1623",
            "hospitalized": "350",
            "critical": "42",
            "respiration": "24",
            "deaths": "1 "
        },
        {
            "date": "3/24/20",
            "overallTests": "31118",
            "verified": "2046",
            "hospitalized": "393",
            "critical": "45",
            "respiration": "26",
            "deaths": "4 "
        },
        {
            "date": "3/25/20",
            "overallTests": "37044",
            "verified": "2471",
            "hospitalized": "412",
            "critical": "48",
            "respiration": "27",
            "deaths": "5 "
        },
        {
            "date": "3/26/20",
            "overallTests": "43555",
            "verified": "2998",
            "hospitalized": "464",
            "critical": "54",
            "respiration": "31",
            "deaths": "10 "
        },
        {
            "date": "3/27/20",
            "overallTests": "49299",
            "verified": "3434",
            "hospitalized": "515",
            "critical": "65",
            "respiration": "36",
            "deaths": "12 "
        },
        {
            "date": "3/28/20",
            "overallTests": "55010",
            "verified": "3916",
            "hospitalized": "512",
            "critical": "69",
            "respiration": "39",
            "deaths": "12 "
        },
        {
            "date": "3/29/20",
            "overallTests": "62574",
            "verified": "4452",
            "hospitalized": "541",
            "critical": "77",
            "respiration": "50",
            "deaths": "15 "
        },
        {
            "date": "3/30/20",
            "overallTests": "69665",
            "verified": "4999",
            "hospitalized": "617",
            "critical": "86",
            "respiration": "55",
            "deaths": "16 "
        },
        {
            "date": "3/31/20",
            "overallTests": "77625",
            "verified": "5732",
            "hospitalized": "665",
            "critical": "97",
            "respiration": "64",
            "deaths": "20 "
        },
        {
            "date": "4/1/20",
            "overallTests": "86606",
            "verified": "6428",
            "hospitalized": "767",
            "critical": "110",
            "respiration": "72",
            "deaths": "28 "
        },
        {
            "date": "4/2/20",
            "overallTests": "96823",
            "verified": "7150",
            "hospitalized": "811",
            "critical": "112",
            "respiration": "79",
            "deaths": "38 "
        },
        {
            "date": "4/3/20",
            "overallTests": "107148",
            "verified": "7748",
            "hospitalized": "800",
            "critical": "128",
            "respiration": "92",
            "deaths": "43 "
        },
        {
            "date": "4/4/20",
            "overallTests": "113664",
            "verified": "8176",
            "hospitalized": "786",
            "critical": "138",
            "respiration": "107",
            "deaths": "49 "
        },
        {
            "date": "4/5/20",
            "overallTests": "123107",
            "verified": "8755",
            "hospitalized": "823",
            "critical": "134",
            "respiration": "106",
            "deaths": "55 "
        },
        {
            "date": "4/6/20",
            "overallTests": "130603",
            "verified": "9206",
            "hospitalized": "806",
            "critical": "146",
            "respiration": "110",
            "deaths": "62 "
        },
        {
            "date": "4/7/20",
            "overallTests": "137531",
            "verified": "9585",
            "hospitalized": "743",
            "critical": "158",
            "respiration": "106",
            "deaths": "69 "
        },
        {
            "date": "4/8/20",
            "overallTests": "143401",
            "verified": "9925",
            "hospitalized": "690",
            "critical": "164",
            "respiration": "114",
            "deaths": "78 "
        },
        {
            "date": "4/9/20",
            "overallTests": "149149",
            "verified": "10269",
            "hospitalized": "663",
            "critical": "165",
            "respiration": "117",
            "deaths": "87 "
        },
        {
            "date": "4/10/20",
            "overallTests": "156476",
            "verified": "10629",
            "hospitalized": "666",
            "critical": "169",
            "respiration": "128",
            "deaths": "95 "
        },
        {
            "date": "4/11/20",
            "overallTests": "163167",
            "verified": "10974",
            "hospitalized": "623",
            "critical": "182",
            "respiration": "130",
            "deaths": "101 "
        },
        {
            "date": "4/12/20",
            "overallTests": "173789",
            "verified": "11534",
            "hospitalized": "664",
            "critical": "176",
            "respiration": "130",
            "deaths": "108 "
        },
        {
            "date": "4/13/20",
            "overallTests": "184748",
            "verified": "11978",
            "hospitalized": "684",
            "critical": "192",
            "respiration": "137",
            "deaths": "116 "
        },
        {
            "date": "4/14/20",
            "overallTests": "197411",
            "verified": "12383",
            "hospitalized": "672",
            "critical": "178",
            "respiration": "135",
            "deaths": "124 "
        },
        {
            "date": "4/15/20",
            "overallTests": "206861",
            "verified": "12694",
            "hospitalized": "670",
            "critical": "179",
            "respiration": "132",
            "deaths": "137 "
        },
        {
            "date": "4/16/20",
            "overallTests": "219645",
            "verified": "12995",
            "hospitalized": "703",
            "critical": "182",
            "respiration": "136",
            "deaths": "144 "
        },
        {
            "date": "4/17/20",
            "overallTests": "231206",
            "verified": "13295",
            "hospitalized": "662",
            "critical": "165",
            "respiration": "125",
            "deaths": "153 "
        },
        {
            "date": "4/18/20",
            "overallTests": "241836",
            "verified": "13605",
            "hospitalized": "642",
            "critical": "173",
            "respiration": "117",
            "deaths": "164 "
        },
        {
            "date": "4/19/20",
            "overallTests": "253299",
            "verified": "13896",
            "hospitalized": "619",
            "critical": "156",
            "respiration": "117",
            "deaths": "172 "
        },
        {
            "date": "4/20/20",
            "overallTests": "268646",
            "verified": "14199",
            "hospitalized": "614",
            "critical": "153",
            "respiration": "122",
            "deaths": "178 "
        },
        {
            "date": "4/21/20",
            "overallTests": "282231",
            "verified": "14491",
            "hospitalized": "543",
            "critical": "143",
            "respiration": "117",
            "deaths": "187 "
        },
        {
            "date": "4/22/20",
            "overallTests": "295525",
            "verified": "14720",
            "hospitalized": "532",
            "critical": "147",
            "respiration": "108",
            "deaths": "190 "
        },
        {
            "date": "4/23/20",
            "overallTests": "309683",
            "verified": "15000",
            "hospitalized": "491",
            "critical": "143",
            "respiration": "112",
            "deaths": "194 "
        },
        {
            "date": "4/24/20",
            "overallTests": "322296",
            "verified": "15255",
            "hospitalized": "454",
            "critical": "140",
            "respiration": "104",
            "deaths": "197 "
        },
        {
            "date": "4/25/20",
            "overallTests": "331374",
            "verified": "15415",
            "hospitalized": "432",
            "critical": "133",
            "respiration": "104",
            "deaths": "200 "
        },
        {
            "date": "4/26/20",
            "overallTests": "339841",
            "verified": "15503",
            "hospitalized": "441",
            "critical": "139",
            "respiration": "109",
            "deaths": "202 "
        },
        {
            "date": "4/27/20",
            "overallTests": "350860",
            "verified": "15618",
            "hospitalized": "410",
            "critical": "130",
            "respiration": "99",
            "deaths": "206 "
        },
        {
            "date": "4/28/20",
            "overallTests": "361501",
            "verified": "15786",
            "hospitalized": "391",
            "critical": "125",
            "respiration": "98",
            "deaths": "211 "
        },
        {
            "date": "4/29/20",
            "overallTests": "370505",
            "verified": "15869",
            "hospitalized": "370",
            "critical": "118",
            "respiration": "93",
            "deaths": "217 "
        }
    ]
}
