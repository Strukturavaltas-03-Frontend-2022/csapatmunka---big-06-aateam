import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/model/product';
import { ConfigService } from 'src/app/service/config.service';
import { ProductService } from 'src/app/service/product.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  productList$: Observable<Product[]> = this.productService.list$;

  columns = this.config.productTableColumns;

  constructor(
    private productService: ProductService,
    private config: ConfigService,
  ) { }

  ngOnInit(): void {
    this.productService.getAll();
  }

  onProductSelect(product: Product): void {
    console.log(product);
    // this.router.navigate(['/', 'product-editor', product.id]);
  }
}
