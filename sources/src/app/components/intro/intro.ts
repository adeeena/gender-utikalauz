import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-intro',
    templateUrl: './intro.html',
    styleUrl: './intro.scss',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class IntroComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
