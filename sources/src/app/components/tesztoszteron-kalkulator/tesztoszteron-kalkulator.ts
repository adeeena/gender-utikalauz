import {Component, HostListener, Inject, OnInit, Renderer2, ViewChild, ElementRef, AfterViewInit, ChangeDetectionStrategy} from '@angular/core';
import {DialogService} from '@services/dialog';
import {TranslateService} from "@ngx-translate/core";
import {DialogElementsExampleDialog} from '@components/entry/entry';

export interface DialogData {
  link: string;
}

@Component({
    selector: 'app-tesztoszteron-kalkulator',
    templateUrl: './tesztoszteron-kalkulator.html',
    styleUrl: './tesztoszteron-kalkulator.scss',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class TesztoszteronKalkulatorComponent implements OnInit, AfterViewInit {
  private innerWidth: number = 0;

  leftValue: string = '';
  rightValue: string = '';
  converter: number = 28.842;

  @ViewChild('leftInput', { static: false }) leftInputRef!: ElementRef;


  constructor(public dialog: DialogService,
              private translate: TranslateService,
              private renderer: Renderer2) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.renderer.selectRootElement(this.leftInputRef.nativeElement).focus();
    })
  }

  onLeftInputChange(): void {
    if (this.isValidNumber(this.leftValue)) {
      let result = parseFloat(this.leftValue) * this.converter;
      this.rightValue = result.toString();
    } else {
      this.rightValue = '';
    }
  }

  onRightInputChange(): void {
    if (this.isValidNumber(this.rightValue)) {
      let result = parseFloat(this.rightValue) / this.converter;
      this.leftValue = result.toString();
    } else {
      this.leftValue = '';
    }
  }

  isValidNumber(value: string): boolean {
    return !isNaN(parseFloat(value)) && isFinite(parseFloat(value));
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
  }

  openShareDialog(): void {
    this.dialog.open(DialogElementsExampleDialog, {
      data: {
        link: location.origin + '/tesztoszteron-kalkulator'
      }
    });
  }
}
