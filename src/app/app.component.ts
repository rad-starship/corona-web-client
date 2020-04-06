import { Component } from '@angular/core';
import { AppModule } from './app.module';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import * as Keycloak from 'keycloak-js'

//keycloak init options
let initOptions = {
  url: 'http://localhost:8080/auth', realm: 'Admin', clientId: 'corona-web'
}

let keycloak = Keycloak(initOptions);

keycloak.init({ onLoad: "login-required" }).success((auth) => {

  if (!auth) {
    window.location.reload();
  } else {
    console.log("Authenticated");
  }

  //bootstrap after authentication is successful.
  platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err));

  localStorage.setItem("ang-token", keycloak.token);
  localStorage.setItem("ang-refresh-token", keycloak.refreshToken);

  setTimeout(() => {
    keycloak.updateToken(70).success((refreshed) => {
      if (refreshed) {
        console.debug('Token refreshed' + refreshed);
      } else {
        console.warn('Token not refreshed, valid for '
          + Math.round(keycloak.tokenParsed.exp + keycloak.timeSkew - new Date().getTime() / 1000) + ' seconds');
      }
    }).error(() => {
      console.error('Failed to refresh token');
    });


  }, 60000)

}).error(() => {
  console.error("Authenticated Failed");
});


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string;
 
  constructor() {
    this.title = 'Coronavirus View';
  }
}