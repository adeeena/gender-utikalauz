import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { faGithub, faDiscord, faPatreon, faDev, faPaypal } from "@fortawesome/free-brands-svg-icons";
import {faMugSaucer} from "@fortawesome/free-solid-svg-icons";

@Component({
    selector: 'app-footer',
    templateUrl: './footer.html',
    styleUrl: './footer.scss',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class FooterComponent implements OnInit {
  faGithub = faGithub;
  faDiscord = faDiscord;
  faPaypal = faPaypal;
  faPatreon = faPatreon;
  faMugSaucer = faMugSaucer;
  faDev = faDev;

  constructor() { }

  ngOnInit(): void {
  }

}
