import { TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import * as myGlobals from "../globals";
import {Observable} from "rxjs";
declare let process: any;

export class TranslationLoader implements TranslateLoader {
  private readonly baseUrl : string = '';
  private translationUrl : string = '/translations?languageCode=';

  constructor(private http: HttpClient) {
    const env = process.env.NODE_ENV;

    if (env  === 'production') {
      this.baseUrl = myGlobals.URL_LIVE;
    } else {
      this.baseUrl = myGlobals.URL_DEV;
    }
  }

  getTranslation(lang: string): Observable<any> {
    return this.http.get(this.baseUrl + this.translationUrl + lang);
  }
}
