import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { combineLatest, map, Observable } from 'rxjs';
import { Category } from 'src/app/model/category';
import { Product } from 'src/app/model/product';
import { CategoryService } from 'src/app/service/category.service';
import { ConfigService } from 'src/app/service/config.service';
import { ProductService } from 'src/app/service/product.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  // össze kell kombinálni a productot a kategóriával
  // hogy ne csak a catID-t tudja
  productList$: Observable<Product[]> = combineLatest({
    cat: this.categoryService.list$,
    prod: this.productService.list$,
  }).pipe(map(result => result.prod.map(product => {
    // a pruducthoz fölveszünk egy új propertyt, a catID-nek megfelelő categoryt
    product['category'] = result.cat.find(c => c.id === product.catID)?.name
    // ezt még ki kell simítani, hogy ne legyen egymásba ágyazva, hogy egy keyvel
    // tudjunk rá hivatkozni a data-tableben
    return product
  }))
  )

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
    private productService: ProductService,
    private categoryService: CategoryService,
    private config: ConfigService,
    private router: Router,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.productService.getAll();
    this.categoryService.getAll();
  }

  onProductSelect(product: Product): void {
    //console.log(product);
    this.router.navigate(['/', 'product', 'edit', product.id]);
  }

  onProductDelete(product: Product): void {
    //console.log(product);
    this.productService.delete(product.id);
    this.toastrService.success('Az elem törlése sikerült!', 'OK', {
      timeOut: 5000,
      positionClass: 'toast-top-right',
      progressBar: true,
    });
  }

  onProductNew(): void {
    //console.log(customer);
    this.router.navigate(['/', 'product', 'edit', 0]);
  }

/*
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
*/
}
