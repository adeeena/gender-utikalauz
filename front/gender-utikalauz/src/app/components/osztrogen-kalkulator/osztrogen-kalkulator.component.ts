import {Component, HostListener, Inject, OnInit, Renderer2, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {fadeInUpOnEnterAnimation} from "angular-animations";
import {TranslateService} from "@ngx-translate/core";
import {DialogElementsExampleDialog} from '../entry/entry.component';

export interface DialogData {
  link: string;
}

@Component({
  selector: 'app-osztrogen-kalkulator',
  templateUrl: './osztrogen-kalkulator.component.html',
  styleUrls: ['./osztrogen-kalkulator.component.scss'],
  animations: [
    fadeInUpOnEnterAnimation({ anchor: 'enter1', duration: 1000, delay: 100, translate: '30px' }),
    fadeInUpOnEnterAnimation({ anchor: 'enter2', duration: 1000, delay: 300, translate: '30px' }),
    fadeInUpOnEnterAnimation({ anchor: 'enter3', duration: 1000, delay: 500, translate: '30px' }),
    fadeInUpOnEnterAnimation({ anchor: 'enter4', duration: 1000, delay: 800, translate: '30px' }),
    fadeInUpOnEnterAnimation({ anchor: 'enter5', duration: 1000, delay: 1500, translate: '30px' }),
  ]
})

export class OsztrogenKalkulatorComponent implements OnInit, AfterViewInit {
  private innerWidth: number = 0;

  leftValue: string = '';
  rightValue: string = '';
  converter: number = 3.67;

  @ViewChild('leftInput', { static: false }) leftInputRef!: ElementRef;


  constructor(public dialog: MatDialog,
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
      let result = parseFloat(this.leftValue) / this.converter;
      this.rightValue = result.toString();
    } else {
      this.rightValue = '';
    }
  }

  onRightInputChange(): void {
    if (this.isValidNumber(this.rightValue)) {
      let result = parseFloat(this.rightValue) * this.converter;
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
      width: this.innerWidth <= 600 ? '90vw' : '50vw',
      data: {
        link: location.origin + '/#/osztrogen-kalkulator'
      }
    });
  }
}
