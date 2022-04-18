import { Injectable } from '@angular/core';
import {AppConfig} from "./app-config";
import {HttpClient} from "@angular/common/http";
import {Subscription} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  private config: AppConfig = {
    languageCode: 'NOT_SET'
  };

  loaded = false;

  constructor(private http: HttpClient) {}

  loadConfig(): Promise<any> {
    return new Promise((resolve) => {
      return this.http
        .get<AppConfig>('/assets/app.config.json')
        .subscribe((data: any) => {
          this.config = data;
          this.loaded = true;
          resolve(data);
        });
    })
  }

  getConfig(): AppConfig {
    return this.config;
  }
}
