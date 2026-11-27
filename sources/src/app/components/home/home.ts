import {Component, ElementRef, OnDestroy, OnInit, AfterViewInit, ChangeDetectionStrategy} from '@angular/core';
import type {gsap} from 'gsap';
import type {SplitText} from 'gsap/SplitText';
import {Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {SidenavService} from "@services/sidenav";
import {EntryService} from "@services/entry";
import {CategoryService} from "@services/category";
import {MotionService} from "@services/motion";
import type {Category, RecentEntry} from "@types";

@Component({
    selector: 'app-home',
    templateUrl: './home.html',
    styleUrl: './home.scss',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  private searchText: string = '';
  private _router: Router;
  private motionContext?: gsap.Context;
  private split?: SplitText;
  public recentEntries: RecentEntry[] = [];
  public recentEntriesLoading = true;
  public recentEntriesError = false;
  public guideCount = 0;

  constructor(_router: Router,
              private titleService: Title,
              private sidenav: SidenavService,
              private entryService: EntryService,
              private categoryService: CategoryService,
              private motion: MotionService,
              private host: ElementRef<HTMLElement>) {
    this._router = _router;
  }

  ngAfterViewInit(): void {
    if (this.motion.reduced) {
      return;
    }

    const { gsap, ScrollTrigger, SplitText, ease } = this.motion;
    const root = this.host.nativeElement;
    const title = root.querySelector<HTMLElement>('.hero-title');

    this.motionContext = gsap.context(() => {
      gsap.set(title, { opacity: 0 });

      const intro = gsap.timeline({ defaults: { ease } });
      intro
        .from('.hero-flag', { opacity: 0, duration: 0.9 }, 0)
        .from('.hero-flag img', { scale: 1.14, duration: 2.2, ease: 'power2.out' }, 0)
        .from('.hero-box', { opacity: 0, y: 28, duration: 0.9 }, 0.2)
        .from('.hero-lead, .hero .buttons, .hero-facts', { opacity: 0, y: 16, duration: 0.8, stagger: 0.1 }, 0.85);

      document.fonts.ready.then(() => {
        if (!title || !this.motionContext) {
          return;
        }
        this.split = SplitText.create(title, { type: 'lines', mask: 'lines' });
        gsap.set(title, { opacity: 1 });
        intro.from(this.split.lines, { yPercent: 108, duration: 1.1, stagger: 0.12 }, 0.3);
      });

      gsap.fromTo('.hero-flag img', { yPercent: -5 }, {
        yPercent: 5,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          scroller: this.motion.scroller,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });
    }, root);

    ScrollTrigger.refresh();
  }

  ngOnDestroy(): void {
    this.split?.revert();
    this.motionContext?.revert();
  }

  ngOnInit(): void {
    this.titleService.setTitle('Gender útikalauz');
    this.categoryService.getCategories().subscribe((categories) => {
      this.guideCount = (categories as any[]).reduce(
        (total, category) => total + (category.children?.length ?? 0), 0);
    });
    this.entryService.getRecentlyModified().subscribe({
      next: (entries) => {
        this.recentEntries = entries;
        this.recentEntriesLoading = false;
      },
      error: (error) => {
        console.error('Nem sikerült betölteni a friss cikkeket.', error);
        this.recentEntriesError = true;
        this.recentEntriesLoading = false;
      }
    });
  }

  formatDate(value: string): string {
    return new Intl.DateTimeFormat('hu-HU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(`${value}T00:00:00Z`));
  }

  searchClicked(): void {
    if (this.searchText) {
      this._router.navigate(['search'],{
        queryParams: {
          query: this.searchText
        }
      });
    }
  }

  searchUpdated($event: Event) {
    if (($event as any).target) {
      this.searchText = ($event as any).target.value;
    }
  }

  sidenavToggle() {
    this.sidenav.toggle();
  }
}
