import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { Category } from 'src/app/model/category';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-edit-categories',
  templateUrl: './edit-categories.component.html',
  styleUrls: ['./edit-categories.component.scss']
})
export class EditCategoriesComponent implements OnInit {

  category$: Observable<Category | null> = this.categoryService.selected$;


  constructor(
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    // this.activatedRoute.params.subscribe(params => console.log(params['id']));
    this.activatedRoute.params.subscribe(params => {
      if (params['id'] !== '0') {
        //console.log('params[id]', params['id'])
        this.activatedRoute.params.subscribe(
          params => this.categoryService.get(params['id'])
        )
      }
      else {
        this.category$ = of(new Category());
      }
    });
    //ha nincs adat
    if (this.categoryService.list$.getValue().length === 0)
      this.categoryService.getAll();
  }

  onUpdate(category: Category): void {

    if (category.id === 0) {
      this.categoryService.create(category);
    }
    else {
      this.categoryService.update(category);
    }
    this.router.navigate(['/', 'categories']);

    this.toastrService.success('Item saved successfully!', 'OK', {
      timeOut: 5000,
      positionClass: 'toast-top-right',
      progressBar: true,
    });

  }

}
