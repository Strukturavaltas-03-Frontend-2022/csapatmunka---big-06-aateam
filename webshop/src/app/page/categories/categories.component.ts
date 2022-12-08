import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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

  columns = this.config.categoryTableColumns;

  constructor(
    private categoryService: CategoryService,
    private config: ConfigService,
    private router: Router,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.categoryService.getAll();
  }

  onCategorySelect(category: Category): void {
    //console.log(customer);
    this.router.navigate(['/', 'category', 'edit', category.id]);
  }

  onCategoryNew(): void {
    //console.log(category);
    this.router.navigate(['/', 'category', 'edit', 0]);
  }

  onCategoryDelete(category: Category): void {
    //console.log(customer);
    this.categoryService.delete(category.id);
    this.toastrService.success('Item deleted successfully!', 'OK', {
      timeOut: 5000,
      positionClass: 'toast-top-right',
      progressBar: true,
    });
  }
}
