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
    document.body.style.overflow = "hidden";
    document.body.style.height = "100%";
  }


  public close() {
    return this.sidenav.close().then(_ => {
      document.body.style.overflow = "auto";
      document.body.style.height = "auto";
    })

  }

  public toggle() {
    this.sidenav.toggle().then(_ => {
      if (this.sidenav.opened) {
        document.body.style.overflow = "hidden";
        document.body.style.height = "100%";
      } else {
        document.body.style.overflow = "auto";
        document.body.style.height = "auto";
      }
    });
  }
}
