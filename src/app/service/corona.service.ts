import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CoronaVirus } from '../model/coronaVirus';
import { Observable } from 'rxjs/Observable';
 
@Injectable()
export class CoronaService {
 
  private coronasUrl: string;
 
  constructor(private http: HttpClient) {
    this.coronasUrl = 'http://localhost:8082/corona';
  }
 
  public findAll(): Observable<CoronaVirus[]> {
    return this.http.get<CoronaVirus[]>(this.coronasUrl);
  }
 
  public save(corona: CoronaVirus) {
    return this.http.post<CoronaVirus>(this.coronasUrl, corona);
  }
}