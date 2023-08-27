import { Component, OnInit } from '@angular/core';
import {GaleryService} from "../../services/galery.service";

@Component({
  selector: 'app-galery',
  templateUrl: './galery.component.html',
  styleUrls: ['./galery.component.scss']
})
export class GaleryComponent implements OnInit {
  public galery: any[] = [];

  constructor(private galeryService: GaleryService) { }

  ngOnInit(): void {
    this.galeryService.getGalery()
    .subscribe((g: any[]) => {
      this.galery = g;
    });
  }

}
