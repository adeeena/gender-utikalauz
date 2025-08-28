import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import * as myGlobals from '../globals';
declare let process: any;

@Injectable({
  providedIn: 'root'
})
export class GaleryService {
  private readonly baseUrl:string = '';
  private galeryUrl:string = '/galery?languageCode=hu';

  constructor(private http: HttpClient) {
    const env = process.env.NODE_ENV;

    if (env  === 'production') {
      this.baseUrl = myGlobals.URL_LIVE;
    } else {
      this.baseUrl = myGlobals.URL_DEV;
    }
  }

  getGalery() {
    return this.http.get<any[]>(this.baseUrl + this.galeryUrl);
  }
}
