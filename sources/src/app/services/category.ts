import { Injectable } from '@angular/core';
import type {Category} from "@types";
import { HttpClient } from "@angular/common/http";
import * as myGlobals from '@app/globals';
import {AppConfigService} from "@services/app-config";
declare let process: any;

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private readonly baseUrl:string = '';
  private categoriesUrl:string = '/categories';

  constructor(private http: HttpClient,
              private appConfigService: AppConfigService) {
    const env = process.env.NODE_ENV;

    if (env === 'production') {
      this.baseUrl = myGlobals.URL_LIVE;
    } else {
      this.baseUrl = myGlobals.URL_DEV;
    }
  }

  getCategories() {
    return this.http.get<Category[]>(
      this.baseUrl + this.categoriesUrl +
      '?languageCode=' + this.appConfigService.getConfig().languageCode);
  }
}
