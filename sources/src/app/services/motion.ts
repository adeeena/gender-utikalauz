import { Injectable } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

@Injectable({ providedIn: 'root' })
export class MotionService {
  readonly gsap = gsap;
  readonly ScrollTrigger = ScrollTrigger;
  readonly SplitText = SplitText;
  readonly ease = 'power3.out';

  private readonly reducedQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  get reduced(): boolean {
    return this.reducedQuery.matches;
  }

  // Az oldal saját görgethető konténere, ezt kell a ScrollTriggernek figyelnie
  get scroller(): HTMLElement | undefined {
    return document.querySelector<HTMLElement>('.page') ?? undefined;
  }
}
