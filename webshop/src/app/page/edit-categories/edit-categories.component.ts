import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Category } from 'src/app/model/category';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-edit-categories',
  templateUrl: './edit-categories.component.html',
  styleUrls: ['./edit-categories.component.scss']
})
export class EditCategoriesComponent implements OnInit {

  categoryService: CategoryService = inject(CategoryService);

  activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  category$: Observable<Category | null> = this.categoryService.selected$;

  ngOnInit(): void{
    this.activatedRoute.params.subscribe(
      params => this.categoryService.get(params['id'])
    );
  }

}
