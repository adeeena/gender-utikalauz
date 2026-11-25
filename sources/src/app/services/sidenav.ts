import { Injectable } from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";


@Injectable()
export class SidenavService {
  // @ts-ignore
  private sidenav: MatSidenav;


  public setSidenav(sidenav: MatSidenav) {
    this.sidenav = sidenav;
  }

  public open() {
    return this.sidenav.open();
  }


  public close() {
    return this.sidenav.close();
  }

  public toggle() {
    this.sidenav.toggle();
  }
}
