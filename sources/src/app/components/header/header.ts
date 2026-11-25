import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.html',
    styleUrl: './header.scss',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
