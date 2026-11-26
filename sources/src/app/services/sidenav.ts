import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SidenavService {
  private readonly state = new BehaviorSubject<boolean>(false);
  public readonly isOpen$ = this.state.asObservable();

  public open() {
    this.state.next(true);
  }

  public close() {
    this.state.next(false);
  }

  public toggle() {
    this.state.next(!this.state.value);
  }
}
