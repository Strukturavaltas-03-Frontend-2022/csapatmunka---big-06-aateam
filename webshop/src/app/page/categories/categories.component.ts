import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { combineLatest, map, Observable } from 'rxjs';
import { Category } from 'src/app/model/category';
import { CategoryService } from 'src/app/service/category.service';
import { ConfigService } from 'src/app/service/config.service';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  categoryList$: Observable<Category[]> = this.categoryService.list$;

  columns = this.config.productTableColumns;

  page: number = 1;

  phrase: string = '';

  filterKey: string = '';

  currentHeader: string = 'id';
  sortColumn: string = 'id';
  sortDirect: string = 'increasing';
  sortIcon: string = 'fa fa-long-arrow-up';

  constructor(
    private categoryService: CategoryService,
    private config: ConfigService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.categoryService.getAll();
  }

  onCategorySelect(category: Category): void {
    this.router.navigate(['/', 'category', 'edit', category.id]);
  }

  onCategoryRemove(category: Category): void {
    //console.log(product);
    // a modal service hívása
  }

  onColumnSelect(columnHeader: string): void {
    this.sortColumn = columnHeader;
    if (columnHeader !== this.currentHeader) {
      this.sortDirect = 'increasing';
      this.sortIcon = 'fa fa-long-arrow-up';
    }

    if (columnHeader == this.currentHeader) {
      if (this.sortDirect == 'increasing') {
        this.sortDirect = 'decreasing';
        this.sortIcon = 'fa fa-long-arrow-down';
      }
      else {
        this.sortDirect = 'increasing';
        this.sortIcon = 'fa fa-long-arrow-up';
      }
    }
    this.currentHeader = columnHeader;
  }


}
