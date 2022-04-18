import { Component, OnInit } from '@angular/core';
import {Category} from "../../models/category";
import { Output, EventEmitter } from '@angular/core';
import {CategoryService} from "../../services/category.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Output() closing = new EventEmitter<string>();
  public categories: Category[] = [];

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
