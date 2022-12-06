import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Category } from 'src/app/model/category';
import { Product } from 'src/app/model/product';
import { CategoryService } from 'src/app/service/category.service';
import { ProductService } from 'src/app/service/product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent {
  product$: Observable<Product | null> = this.productService.selected$;
  categoryList$: Observable<Category[]> = this.categoryService.list$;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    // this.activatedRoute.params.subscribe(params => console.log(params['id']));
    this.activatedRoute.params.subscribe((params) => {
      if (params['id'] !== '0') {
        //console.log('params[id]', params['id'])
        this.activatedRoute.params.subscribe((params) =>
          this.productService.get(params['id'])
        );
      } else {
        this.product$ = of(new Product());
      }
    });
    // ha nincs adat
    if (this.categoryService.list$.getValue().length === 0)
      this.categoryService.getAll();
    if (this.productService.list$.getValue().length === 0)
      this.productService.getAll();
  }

  onUpdate(product: Product): void {
    if (typeof product.catID != 'number')
      product.catID = parseInt(product.catID);

    if (product.id === 0) {
      this.productService.create(product);
    } else {
      this.productService.update(product);
    }
    this.router.navigate(['/', 'products']);

    this.toastrService.success('Az elem mentése sikerült!', 'OK', {
      timeOut: 5000,
      positionClass: 'toast-top-right',
      progressBar: true,
    });

    /*
    //https://www.npmjs.com/package/ngx-toastr
    this.toastrService.success('Toastr default success test!');
    this.toastrService.error('Toastr', 'Error test!', {
      timeOut: 3000,
      positionClass: 'toast-center-center',
      progressBar: true,
    });
    this.toastrService.info('Toastr', 'Info test!', {
      timeOut: 6000,
      closeButton: true,
      positionClass: 'toast-bottom-left',
      progressBar: true,
    });
    this.toastrService.warning('Toastr', 'Warning test!', {
      easeTime: 2000,
      easing: 'ease-in',
      timeOut: 8000,
      positionClass: 'toast-top-left',
      progressBar: true,
    });
    */
  }
}
