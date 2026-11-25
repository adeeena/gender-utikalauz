import { Injectable } from '@angular/core';
import type {Category} from "@types";
import { HttpClient } from "@angular/common/http";
import * as myGlobals from '@app/globals';
import {AppConfigService} from "@services/app-config";
declare let process: any;

@Injectable()
export class SearchService {
  private readonly baseUrl:string = '';
  private entryUrl:string = '/entry?languageCode=hu&id=';
  private entryByUrl:string = '/entry?languageCode=hu&id=';
  private searchByUrl:string = '/entry/searchBy?query=';

  constructor(private http: HttpClient) {
    const env = process.env.NODE_ENV;

    if (env === 'production') {
      this.baseUrl = myGlobals.URL_LIVE;
    } else {
      this.baseUrl = myGlobals.URL_DEV;
    }
  }

  // method to perform a search
  search(query: string, languageCode: string) {
    const endpoint = `${this.baseUrl}/search`;
    const params = { query, languageCode }; 

    return this.http.get<any[]>(endpoint, { params });
  }
}
