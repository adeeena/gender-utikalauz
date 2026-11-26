import {Component, Inject, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {EntryService} from "@services/entry";
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
export class EntryComponent implements OnInit {
  public entryId: string = '';
  public metadata: any;
  public entry: any;
  public entryLoading = false;
  public entryError = false;

  constructor(private route: ActivatedRoute,
              private entryService: EntryService,
              private titleService: Title,
              private meta: Meta,
              private translate: TranslateService,
              public dialog: DialogService,
              private markdownService: MarkdownService) { }

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
        link: location.origin + '/#/entry?id=' + this.entryId
      }
    });
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
