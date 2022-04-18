import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Entry} from "../models/entry";
import * as myGlobals from '../globals';
declare let process: any;

@Injectable({
  providedIn: 'root'
})
export class EntryService {
  private readonly baseUrl:string = '';
  private entryUrl:string = '/entry/getBy?categoryId=';
  private entryByUrl:string = '/entry/getById?entryId=';
  private searchByUrl:string = '/entry/searchBy?query=';

  constructor(private http: HttpClient) {
    const env = process.env.NODE_ENV;

    if (env  === 'production') {
      this.baseUrl = myGlobals.URL_LIVE;
    } else {
      this.baseUrl = myGlobals.URL_DEV;
    }
  }

  getBy(categoryId: string) {
    return this.http.get<any>(this.baseUrl + this.entryUrl + categoryId);
  }

  getById(entryId: string) {
    return this.http.get<Entry>(this.baseUrl + this.entryByUrl + entryId);
  }

  searchBy(query: string) {
    return this.http.get<any>(this.baseUrl + this.searchByUrl + query);
  }
}
