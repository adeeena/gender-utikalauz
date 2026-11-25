import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import type {Category} from "@types";
import { Output, EventEmitter } from '@angular/core';
import {CategoryService} from "@services/category";

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.html',
    styleUrl: './sidebar.scss',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class SidebarComponent implements OnInit {
  @Output() closing = new EventEmitter<string>();
  public categories: any[] = [];

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.categoryService.getCategories()
      .subscribe((data: Category[]) => {this.categories = data;});
  }

  linkClicked(): void {
    if (this.closing) {
      this.closing.emit('');
    }
  }
}
