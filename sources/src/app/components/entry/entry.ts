import {Component, ElementRef, Inject, OnInit, AfterViewInit, OnDestroy, ChangeDetectionStrategy} from '@angular/core';
import type {gsap} from 'gsap';
import {ActivatedRoute, Router} from "@angular/router";
import {EntryService} from "@services/entry";
import {MotionService} from "@services/motion";
import {DIALOG_DATA, DialogRef, DialogService} from "@services/dialog";
import {Meta, Title} from "@angular/platform-browser";
import {TranslateService} from "@ngx-translate/core";
import {MarkdownService} from "ngx-markdown";

export interface DialogData {
  link: string;
}

export interface EntryDocument {
  title: string;
  description: string;
  html: string;
}

export async function renderEntryDocument(
  raw: string,
  parseMarkdown: (markdown: string, options: { disableSanitizer: boolean }) => Promise<string | Promise<string>>
): Promise<EntryDocument> {
  const document = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);
  if (!document) {
    throw new Error('A cikk metaadatai nem olvashatók.');
  }

  const metadata = new Map<string, string>();
  document[1].split('\n').forEach((line) => {
    const separator = line.indexOf(':');
    if (separator > -1) {
      metadata.set(
        line.slice(0, separator).trim(),
        line.slice(separator + 1).trim().replace(/^['"]+|['"]+$/g, '')
      );
    }
  });

  const rendered = await parseMarkdown(document[2], { disableSanitizer: true });
  let html = rendered
    .replaceAll('<a href="https://', '<a target="_blank" href="https://')
    .replaceAll('<a href="http://', '<a target="_blank" href="http://');

  const content = window.document.createElement('div');
  content.innerHTML = html;
  content.querySelectorAll<HTMLImageElement>('img:not([alt])').forEach((image) => {
    if (image.src.includes('/undraw_')) {
      image.alt = '';
      return;
    }

    const imageContainer = image.parentElement;
    const caption = imageContainer?.querySelector('span')?.textContent?.trim();
    let heading = image.closest('.wiki-content')?.querySelector('h1, h2, h3, h4')?.textContent?.trim();
    if (!heading) {
      const previousHeading = imageContainer?.previousElementSibling;
      heading = previousHeading?.matches('h1, h2, h3, h4')
        ? previousHeading.textContent?.trim()
        : undefined;
    }
    image.alt = caption || (heading ? `Ábra: ${heading}` : 'A cikkhez kapcsolódó illusztráció');
  });
  content.querySelectorAll<HTMLAnchorElement>('a[href^="/#/"], a[href^="#/"]').forEach((link) => {
    link.setAttribute('href', link.getAttribute('href')!.replace(/^\/?#/, ''));
  });
  content.querySelectorAll<HTMLAnchorElement>('a[target="_blank"]').forEach((link) => {
    link.rel = 'noopener';
  });
  html = content.innerHTML;

  return {
    title: metadata.get('title') || 'Cikk',
    description: metadata.get('description') || '',
    html
  };
}

@Component({
    selector: 'app-entry',
    templateUrl: './entry.html',
    styleUrl: './entry.scss',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class EntryComponent implements OnInit, AfterViewInit, OnDestroy {
  public entryId: string = '';
  public metadata: any;
  public entry: any;
  public entryLoading = false;
  public entryError = false;
  private motionContext?: gsap.Context;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private entryService: EntryService,
              private titleService: Title,
              private meta: Meta,
              private translate: TranslateService,
              public dialog: DialogService,
              private markdownService: MarkdownService,
              private motion: MotionService,
              private host: ElementRef<HTMLElement>) { }

  // Olvasási folyamatjelző: a cikk görgetésével arányosan nő
  ngAfterViewInit(): void {
    if (this.motion.reduced) {
      return;
    }
    const { gsap } = this.motion;
    this.motionContext = gsap.context(() => {
      gsap.fromTo('.read-progress', { scaleX: 0 }, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: this.host.nativeElement,
          scroller: this.motion.scroller,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.4
        }
      });
    }, this.host.nativeElement);
  }

  ngOnDestroy(): void {
    this.motionContext?.revert();
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.entryId = (params as any).params.id;

      if (this.entryId) {
        this.entry = null;
        this.entryError = false;
        this.entryLoading = true;
        this.entryService.getById(this.entryId).subscribe({
          next: async (data) => {
            try {
              const document = await renderEntryDocument(
                data,
                (markdown, options) => this.markdownService.parse(markdown, options)
              );

              this.entry = document.html;
              this.titleService.setTitle(
                document.title + ' | ' + this.translate.instant('general.title'));
              this.meta.updateTag({ name: 'description', content: document.description });
              setTimeout(() => this.motion.ScrollTrigger.refresh(), 100);
            } catch (error) {
              console.error('A cikk megjelenítése sikertelen.', error);
              this.entryError = true;
            } finally {
              this.entryLoading = false;
            }
          },
          error: (error) => {
            console.error('A cikk betöltése sikertelen.', error);
            this.entryError = true;
            this.entryLoading = false;
          }
        });
      }
    });
  }

  openShareDialog(): void {
    this.dialog.open(DialogElementsExampleDialog, {
      data: {
        link: location.origin + '/entry?id=' + this.entryId
      }
    });
  }

  // A cikkben lévő belső hivatkozások teljes oldalbetöltés nélkül nyíljanak meg
  onContentClick(event: MouseEvent): void {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }
    const link = (event.target as HTMLElement).closest('a');
    const href = link?.getAttribute('href');
    if (!link || !href || link.target || !href.startsWith('/') || href.startsWith('//')) {
      return;
    }
    event.preventDefault();
    this.router.navigateByUrl(href);
  }
}

@Component({
    selector: 'share-dialog',
    templateUrl: 'entry-dialog.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class DialogElementsExampleDialog {
  constructor(public dialogRef: DialogRef,
              @Inject(DIALOG_DATA) public data: DialogData,
  ) {}

  onClick(): void {
    this.dialogRef.close();
  }
}
