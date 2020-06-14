/*
* When handling authentication in an Angular app, 
* it’s generally best to put everything you need in a dedicated service. 
* Any authentication service should have a few basic methods for allowing users to log in and log out. 
* It should also include a method for retrieving a JSON Web Token 
* from wherever it is stored on the client and a way to determine if the user is authenticated or not.
*
* The goal is to include the JWT which is in local storage 
* as the Authorization header in any HTTP request that is sent.
*/
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { LoginRequest } from '../../model/loginRequest';
import { LoginResponse } from '../../model/loginResponse';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { tokenNotExpired } from 'angular2-jwt';
import * as jwt_decode from "jwt-decode";

@Injectable()
export class AuthService implements OnInit
{
    token: string;

    constructor(private http: HttpClient) {
        this.token = "";       
    }
    
      ngOnInit() {
        console.log("Login sss");
      }
  private login(loginRequest: LoginRequest): Observable<HttpResponse<LoginRequest>> {
    var loginUrl = 'http://localhost:8083/login';

    let httpHeaders = new HttpHeaders({
        'Content-Type' : 'application/json'
    });    
    return this.http.post<LoginRequest>(loginUrl, loginRequest,
      {
        headers: httpHeaders,
        observe: 'response'
      }
    );
  } 

  public getToken(): string {
    if (this.token === "")
    {
      console.log("Do login");
      var loginBody = new LoginRequest("admin", "admin", "", "Admin");
      this.login(loginBody).subscribe(res => { 
          //let resBody: LoginResponse = res.body;
          console.log("Login OK", res.body);
          //resBody.access_token;
        },
        err => {
          console.log("Login Failed", err);
        } 
       );   
    }

    this.token = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI2cjhpNWtjSUNLX1RwSlN6WGxxcWpEV2xuZ2Mtb2t4UERCenUyWUFLZEg0In0.eyJleHAiOjE1OTE4ODk5MDAsImlhdCI6MTU5MTg4ODcwMCwianRpIjoiNGI4NWZjMGEtYTgzYS00Y2Y3LWI2NzItYjYzZDMyZDdmMmJlIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL2F1dGgvcmVhbG1zL0FkbWluIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjhlM2ZhZmU2LTYyNDEtNDQ3YS1hOTNmLTMzNjY3ODhjYWYzNyIsInR5cCI6IkJlYXJlciIsImF6cCI6ImNvcm9uYS1ubXMiLCJzZXNzaW9uX3N0YXRlIjoiYWU5ZTc4NjMtMmE5Yi00OTI3LThmODYtYWZmZDljYWZiMDM2IiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwOi8vbG9jYWxob3N0OjgwODEiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImFsbCIsIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iLCJBZG1pbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoicHJvZmlsZSBlbWFpbCIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwibmFtZSI6IkFkbWluIEFkbWluIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiYWRtaW4iLCJnaXZlbl9uYW1lIjoiQWRtaW4iLCJmYW1pbHlfbmFtZSI6IkFkbWluIiwiZW1haWwiOiJhZG1pbkBkb21haW4uY29tIn0.eubFqZrMuSIRFn3Bdc_pQdbyGeNY_k8DdDCV1EfLExpF9bdiwfvq9_Z007H3Ggtq1pE4z7xQMRyTvr8EyA3gUbu-nZBTN3NLz7afK6G38XtIUfZKu_wf3yPDNqH-KUOjH-0hZM2FbkUerp9hlRSQvIZu0fGAmKHbpKOr-93WXeLm579VgCQEgacXCiofDyZq_hf2o-0qSRqVnDnyTl9aw-SvNDnSFZysd9zuXry3EcERn6b46E_u7DJCI1zVk8TVPGb9FDMDB2i9Jp4jIeKmmMYBDSHec9rpZDurLlxWdjfZFYhCbzBH0KFsXvgrLTJwtSIw8DHWVYYyQRiUt7vAgQ";
    return this.token;
  }

  getDecodedAccessToken(): any {
    try {
        const token = this.getToken();
        var tokenInfo = jwt_decode(token); // decode token
        console.log(tokenInfo);
        
        // decode header by passing in options (useful for when you need `kid` to verify a JWT):
        var decodedHeader = jwt_decode(token, { header: true });
        console.log(decodedHeader)

        return tokenInfo;
    }
    catch(Error){
        return null;
    }
  }

  public isAuthenticated(): boolean {
    // get the token
    const token = this.getToken();
    // return a boolean reflecting 
    // whether or not the token is expired
    return tokenNotExpired(null, token);
  }
}