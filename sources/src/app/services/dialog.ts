import {
  ApplicationRef,
  EnvironmentInjector,
  Inject,
  Injectable,
  InjectionToken,
  Injector,
  Type,
  createComponent
} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {Observable, Subject} from 'rxjs';

export const DIALOG_DATA = new InjectionToken<any>('DIALOG_DATA');

export interface DialogConfig {
  data?: unknown;
  panelClass?: string;
  autoFocus?: string;
}

export class DialogRef {
  private readonly closed = new Subject<void>();

  constructor(private readonly element: HTMLDialogElement) {
    element.addEventListener('close', () => {
      this.closed.next();
      this.closed.complete();
    });
  }

  close(): void {
    this.element.close();
  }

  afterClosed(): Observable<void> {
    return this.closed.asObservable();
  }
}

// Wraps a component in a native <dialog>: focus trap, Escape and backdrop are provided by the browser.
@Injectable({providedIn: 'root'})
export class DialogService {
  private titleCount = 0;

  constructor(private appRef: ApplicationRef,
              private environmentInjector: EnvironmentInjector,
              @Inject(DOCUMENT) private document: Document) {}

  open<T>(component: Type<T>, config: DialogConfig = {}): DialogRef {
    const element = this.document.createElement('dialog');
    element.className = ['app-dialog', config.panelClass].filter(Boolean).join(' ');

    const ref = new DialogRef(element);
    const componentRef = createComponent(component, {
      environmentInjector: this.environmentInjector,
      elementInjector: Injector.create({
        providers: [
          {provide: DialogRef, useValue: ref},
          {provide: DIALOG_DATA, useValue: config.data}
        ]
      })
    });

    this.appRef.attachView(componentRef.hostView);
    componentRef.changeDetectorRef.detectChanges();
    element.appendChild(componentRef.location.nativeElement);

    const heading = element.querySelector('h1, h2');
    if (heading) {
      heading.id ||= `dialog-title-${++this.titleCount}`;
      element.setAttribute('aria-labelledby', heading.id);
    }

    element.addEventListener('click', (event) => {
      if (event.target === element) {
        element.close();
      }
    });
    element.addEventListener('close', () => {
      this.appRef.detachView(componentRef.hostView);
      componentRef.destroy();
      element.remove();
    });

    this.document.body.appendChild(element);
    element.showModal();
    if (config.autoFocus) {
      element.querySelector<HTMLElement>(config.autoFocus)?.focus();
    }

    return ref;
  }
}
