import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Category } from 'src/app/model/category';
import { Product } from 'src/app/model/product';
import { CategoryService } from 'src/app/service/category.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent {
  product$: Observable<Product | null> = this.productService.selected$;
  category$: Observable<Category | null> = this.categoryService.selected$;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    // this.activatedRoute.params.subscribe(params => console.log(params['id']));
    this.activatedRoute.params.subscribe(params => {
      if (params['id'] !== '0') {
        //console.log('params[id]', params['id'])
        this.activatedRoute.params.subscribe(
          params => this.productService.get(params['id'])
        )
      }
      else {
        this.product$ = of(new Product)
      }
    });

  }

  onUpdate(product: Product): void {
    /*
if (product.id === 0) {
  this.productService.create(product);
}
else {
  this.productService.update(product);
}
this.router.navigate(['/', 'product']);
*/
  }
}
