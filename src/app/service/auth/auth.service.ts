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
import { Inject, Injectable, OnInit } from '@angular/core';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

@Injectable()
export class AuthService implements OnInit
{
    // key that is used to access the data in local storageconst 
    private STORAGE_KEY = 'corona_app_data';

    private token: string;
    private refresh_token: string;


    constructor(private http: HttpClient, 
               @Inject(LOCAL_STORAGE) private storage: StorageService) {
      const currentAppData = this.storage.get(this.STORAGE_KEY) || [];
      const firstAppData = currentAppData[0] || {};
      this.token = firstAppData.token;
      this.refresh_token = firstAppData.refreshToken;
      //console.log("AuthService init Token", this.token);
      //console.log("AuthService init Refresh Token", this.refresh_token);
    }
    
    ngOnInit() {
    }

    public storeOnLocalStorage(token: string, refreshToken: string): void {
          
      // get array of tasks from local storage
      var currentAppData = this.storage.get(this.STORAGE_KEY) || [];
      currentAppData = [];
      // push new task to array
      currentAppData.push({
          token: token,
          refreshToken: refreshToken,
          isChecked: false 
      });
      // insert updated array to local storage
      this.storage.set(this.STORAGE_KEY, currentAppData);
      //console.log(this.storage.get(this.STORAGE_KEY) || 'Local storage is empty');
    }

    public setToken(access_token: string, refresh_token: string)
    {
      this.token = access_token;
      this.refresh_token = refresh_token;
      //console.log("AuthService setToken", this.token);
      this.storeOnLocalStorage(this.token, this.refresh_token);
    }

    public getToken(): string {
      return this.token;
    }

    public getRefreshToken(): string {
      return this.refresh_token;
    }

    private getDecodedAccessToken(): JwtPayload | null {
      if (!this.token) {
        return null;
      }

      try {
          return jwtDecode<JwtPayload>(this.token);
      }
      catch (error) {
          console.error('Failed to decode access token', error);
          return null;
      }
    }

    private isAuthenticated(): boolean {
      const decodedToken = this.getDecodedAccessToken();
      return !!decodedToken?.exp && decodedToken.exp * 1000 > Date.now();
    }
}