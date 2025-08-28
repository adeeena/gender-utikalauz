import { Component, HostListener, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DialogElementsExampleDialog} from '../entry/entry.component';
import {fadeInUpOnEnterAnimation} from "angular-animations";
import {TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'app-higham-hiszterektomia-verveszteseg-kalkulator',
    templateUrl: './higham-hiszterektomia-verveszteseg-kalkulator.component.html',
    styleUrls: ['./higham-hiszterektomia-verveszteseg-kalkulator.component.scss'],
    animations: [
        fadeInUpOnEnterAnimation({ anchor: 'enter1', duration: 1000, delay: 100, translate: '30px' }),
        fadeInUpOnEnterAnimation({ anchor: 'enter2', duration: 1000, delay: 300, translate: '30px' }),
        fadeInUpOnEnterAnimation({ anchor: 'enter3', duration: 1000, delay: 500, translate: '30px' }),
        fadeInUpOnEnterAnimation({ anchor: 'enter4', duration: 1000, delay: 800, translate: '30px' }),
        fadeInUpOnEnterAnimation({ anchor: 'enter5', duration: 1000, delay: 1500, translate: '30px' }),
    ],
    standalone: false
})
export class HighamHiszterektomiaVervesztesegKalkulatorComponent implements OnInit {
  private innerWidth: number = 0;
  days = Array(8).fill(0).map((_, idx) => idx + 1);
  rows = ['higham.light', 'higham.medium', 'higham.high', 'higham.low', 'higham.big'];
  colSum: number[] = [];
  rowSum: number[] = [];
  totalSum: number = 0;
  dataSource: number[][] = [];

  cycleLength = 28;
  firstBleeding = 14;
  age = 26;
  histerectomyAge: number | null = null;

  frequency: number = 12;
  bleedingSoFar: number = 0;
  bleedingTillHisterectomy: number = 0;
  bleedingTillMenopause: number = 0;

  constructor(public dialog: MatDialog,
              private translate: TranslateService) { }

  ngOnInit(): void {
    for (let i = 0; i < this.rows.length; i++) {
        const innerArr: number[] = [];
        for (let j = 0; j < this.days.length; j++) {
            innerArr.push(0);
        }
        this.dataSource.push(innerArr);
    }

    for (let i = 0; i < this.rows.length; i++) {
      this.rowSum[i] = 0;
    }

    for (let i = 0; i < this.days.length; i++) {
      this.colSum[i] = 0;
    }
  }

  pointsMap: { [key: string]: number } = {
    'higham.light': 1,
    'higham.medium': 5,
    'higham.high': 20,
    'higham.low': 1,
    'higham.big': 5
  };

  onLeftInputChange(): void {
    this.colSum = [];
    this.rowSum = [];
    this.totalSum = 0;

    for (let row = 0; row < this.rows.length; row++) {
      for (let col = 0; col < this.days.length; col++) {
        if (!this.isValidNumber(this.dataSource[row][col])) {
          break;
        }

        if (!this.colSum[col]) {
          this.colSum[col] = 0;
        }

        if (!this.rowSum[row]) {
          this.rowSum[row] = 0;
        }

        var multiplier = this.pointsMap[this.rows[row]];

        this.colSum[col] += +this.dataSource[row][col] * multiplier;
        this.rowSum[row] += +this.dataSource[row][col] * multiplier;

        this.totalSum += +this.dataSource[row][col] * multiplier;
      }
    }

    this.frequency = 365 / this.cycleLength;
    let yearsOfBleeding = 0;

    if (this.histerectomyAge !== null) {
      yearsOfBleeding = Math.min(this.histerectomyAge, this.age) - this.firstBleeding;
    } else {
      yearsOfBleeding = this.age - this.firstBleeding;
    }

    let periodEvents = yearsOfBleeding * this.frequency;
    this.bleedingSoFar = periodEvents * this.totalSum;

    if (this.histerectomyAge !== null) {
      let yearsTillHisterectomy = this.histerectomyAge - this.age;
      let histerectomySaved = yearsTillHisterectomy * this.frequency;
      this.bleedingTillHisterectomy = histerectomySaved * this.totalSum;
    }

    let yearsTillMenopause = 0;

    if (this.histerectomyAge !== null) {
      yearsTillMenopause = 55 - Math.max(this.histerectomyAge, this.age);
    } else {
      yearsTillMenopause = 55 - this.age;
    }

    let menopauseSaved = yearsTillMenopause * this.frequency;
    this.bleedingTillMenopause = menopauseSaved * this.totalSum;
  }

  isValidNumber(value: any): boolean {
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
        link: location.origin + '/#/higham-hiszterektomia-verveszteseg-kalkulator'
      }
    });
  }
}
