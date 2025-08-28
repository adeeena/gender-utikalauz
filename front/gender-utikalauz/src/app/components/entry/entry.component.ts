import {Component, HostListener, Inject, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {EntryService} from "../../services/entry.service";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {fadeInUpOnEnterAnimation} from "angular-animations";
import {Meta, Title} from "@angular/platform-browser";
import {TranslateService} from "@ngx-translate/core";
import {MarkdownService} from "ngx-markdown";

export interface DialogData {
  link: string;
}

@Component({
    selector: 'app-entry',
    templateUrl: './entry.component.html',
    styleUrls: ['./entry.component.scss'],
    animations: [
        fadeInUpOnEnterAnimation({ anchor: 'enter1', duration: 1000, delay: 100, translate: '30px' }),
        fadeInUpOnEnterAnimation({ anchor: 'enter2', duration: 1000, delay: 300, translate: '30px' }),
        fadeInUpOnEnterAnimation({ anchor: 'enter3', duration: 1000, delay: 500, translate: '30px' }),
        fadeInUpOnEnterAnimation({ anchor: 'enter4', duration: 1000, delay: 800, translate: '30px' }),
        fadeInUpOnEnterAnimation({ anchor: 'enter5', duration: 1000, delay: 1500, translate: '30px' }),
    ],
    standalone: false
})
export class EntryComponent implements OnInit {
  public entryId: string = '';
  public metadata: any;
  public entry: any;
  private innerWidth: number = 0;

  constructor(private route: ActivatedRoute,
              private entryService: EntryService,
              private titleService: Title,
              private meta: Meta,
              private translate: TranslateService,
              public dialog: MatDialog,
              private markdownService: MarkdownService) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.entryId = (params as any).params.id;

      if (this.entryId) {
        this.entryService.getById(this.entryId)
          .subscribe((data: any) => {
            const values = data.split('---');
            this.metadata = values[1].split('\n');
            let title = this.metadata
              .filter(
                (q:string) => q.startsWith('title'))
              [0].split(': ')[1]
              .replace(/['"]+/g, '');
            let description = this.metadata
              .filter(
                (q:string) => q.startsWith('description'))
              [0].split(': ')[1]
              .replace(/['"]+/g, '');

            this.entry = this.markdownService.parse(values[2]);

            while (this.entry.indexOf('<a href="https://') > -1) {
              this.entry = this.entry.replace('<a href="https://', '<a target="_blank" href="https://');
            }

            while (this.entry.indexOf('<a href="http://') > -1) {
              this.entry = this.entry.replace('<a href="http://', '<a target="_blank" href="http://');
            }

            this.titleService.setTitle(
              title + ' | ' + this.translate.instant('general.title'));

            this.meta.updateTag({ name: 'description', content: description });
          });
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
  }

  openShareDialog(): void {
    this.dialog.open(DialogElementsExampleDialog, {
      width: this.innerWidth <= 600 ? '90vw' : '50vw',
      data: {
        link: location.origin + '/#/entry?id=' + this.entryId
      }
    });
  }
}

@Component({
    selector: 'share-dialog',
    styleUrls: ['./entry.component.scss'],
    templateUrl: 'entry-dialog.component.html',
    standalone: false
})
export class DialogElementsExampleDialog {
  constructor(public dialogRef: MatDialogRef<DialogElementsExampleDialog>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onClick(): void {
    this.dialogRef.close();
  }
}
