import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {EntryService} from "../../services/entry.service";
import {Entry} from "../../models/entry";
import {fadeInUpOnEnterAnimation} from "angular-animations";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  animations: [
    fadeInUpOnEnterAnimation({ anchor: 'enter1', duration: 1000, translate: '30px' }),
  ]
})
export class CategoryComponent implements OnInit {
  public categoryId: string = '';
  public categoryTitle: string = '';
  public categoryDescription: string = '';
  public entries: Entry[] = [];

  constructor(private route: ActivatedRoute, private entryService: EntryService,
              private titleService: Title) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params =>
    {
      this.categoryId = (params as any).params.id;

      if (this.categoryId) {
        this.entryService.getBy(this.categoryId)
          .subscribe((data: any) => {
            this.categoryTitle = data.name;
            this.categoryDescription = data.description;
            this.entries = data.entries;

            this.titleService.setTitle(data.name + ' | MiniagressziWiki');
          });
      }
    });
  }

}
