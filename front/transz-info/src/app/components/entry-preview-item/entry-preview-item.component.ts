import {Component, Input, OnInit} from '@angular/core';
import {Entry} from "../../models/entry";

@Component({
  selector: 'app-entry-preview-item',
  templateUrl: './entry-preview-item.component.html',
  styleUrls: ['./entry-preview-item.component.scss']
})
export class EntryPreviewItemComponent implements OnInit {
  @Input() entry: any;
  @Input() mode: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
