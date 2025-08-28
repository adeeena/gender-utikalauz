import { Component, OnInit } from '@angular/core';
import {GaleryService} from "../../services/galery.service";
import * as myGlobals from "../../globals";
declare let process: any;

@Component({
    selector: 'app-galery',
    templateUrl: './galery.component.html',
    styleUrls: ['./galery.component.scss'],
    standalone: false
})
export class GaleryComponent implements OnInit {
  public galery: any[] = [];
  public baseUrl: string;

  constructor(private galeryService: GaleryService) {
    const env = process.env.NODE_ENV;

    if (env  === 'production') {
      this.baseUrl = myGlobals.URL_LIVE;
    } else {
      this.baseUrl = myGlobals.URL_DEV;
    }
  }

  ngOnInit(): void {
    this.galeryService.getGalery()
    .subscribe((g: any[]) => {
      this.galery = g;
    });
  }

}
