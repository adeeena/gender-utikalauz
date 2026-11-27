import { AfterViewInit, Directive, ElementRef, Input, OnDestroy } from '@angular/core';
import type { gsap } from 'gsap';
import { MotionService } from '@services/motion';

/**
 * Elem vagy a megadott gyerekelemek finom megjelenítése, amikor a látómezőbe érnek.
 * Csökkentett mozgás beállításnál nem csinál semmit, így a tartalom végig látható marad.
 */
@Directive({
  selector: '[appReveal]',
  standalone: false
})
export class RevealDirective implements AfterViewInit, OnDestroy {
  @Input() appRevealChildren = '';
  @Input() appRevealDelay = 0;
  @Input() appRevealDistance = 24;

  private observer?: IntersectionObserver;
  private tweens: gsap.core.Tween[] = [];

  constructor(private host: ElementRef<HTMLElement>, private motion: MotionService) {}

  ngAfterViewInit(): void {
    if (this.motion.reduced || !('IntersectionObserver' in window)) {
      return;
    }

    const root = this.host.nativeElement;
    const targets: HTMLElement[] = this.appRevealChildren
      ? Array.from(root.querySelectorAll<HTMLElement>(this.appRevealChildren))
      : [root];
    if (!targets.length) {
      return;
    }

    this.motion.gsap.set(targets, { opacity: 0, y: this.appRevealDistance, transition: 'none' });

    this.observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting);
      visible.forEach((entry, index) => {
        this.observer?.unobserve(entry.target);
        this.tweens.push(this.motion.gsap.to(entry.target, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay: this.appRevealDelay + index * 0.07,
          ease: this.motion.ease,
          clearProps: 'opacity,transform,transition'
        }));
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });

    targets.forEach((target) => this.observer!.observe(target));
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    this.tweens.forEach((tween) => tween.kill());
  }
}

/**
 * A szöveg elején álló számot nullától számolja fel a végértékig, amikor láthatóvá válik.
 * A képernyőolvasó a végleges szöveget olvassa.
 */
@Directive({
  selector: '[appCountUp]',
  standalone: false
})
export class CountUpDirective implements AfterViewInit, OnDestroy {
  private observer?: IntersectionObserver;
  private tween?: gsap.core.Tween;

  constructor(private host: ElementRef<HTMLElement>, private motion: MotionService) {}

  ngAfterViewInit(): void {
    const node = this.host.nativeElement;
    const text = node.textContent?.trim() ?? '';
    const match = text.match(/^(\d+(?:[.,]\d+)?)(.*)$/);
    if (this.motion.reduced || !match || !('IntersectionObserver' in window)) {
      return;
    }

    const separator = match[1].includes(',') ? ',' : '.';
    const decimals = (match[1].split(/[.,]/)[1] ?? '').length;
    const target = parseFloat(match[1].replace(',', '.'));
    const suffix = match[2];
    const format = (value: number) => value.toFixed(decimals).replace('.', separator) + suffix;

    node.textContent = '';
    const visual = document.createElement('span');
    visual.setAttribute('aria-hidden', 'true');
    visual.textContent = format(0);
    const accessible = document.createElement('span');
    accessible.className = 'sr-only';
    accessible.textContent = text;
    node.append(visual, accessible);

    this.observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) {
        return;
      }
      this.observer?.disconnect();
      const counter = { value: 0 };
      this.tween = this.motion.gsap.to(counter, {
        value: target,
        duration: 1.8,
        ease: 'power2.out',
        onUpdate: () => (visual.textContent = format(counter.value)),
        onComplete: () => (visual.textContent = format(target))
      });
    }, { threshold: 0.6 });
    this.observer.observe(node);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    this.tween?.kill();
  }
}
