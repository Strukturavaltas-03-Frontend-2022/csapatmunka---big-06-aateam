import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexFill, ApexPlotOptions, ApexTitleSubtitle, ApexXAxis, ApexYAxis, ChartComponent } from 'ng-apexcharts';
import { BehaviorSubject, combineLatest, filter, map, Observable } from 'rxjs';
import { Bill } from 'src/app/model/bill';
import { Category } from 'src/app/model/category';
import { Customer } from 'src/app/model/customer';
import { Order } from 'src/app/model/order';
import { Product } from 'src/app/model/product';
import { BillService } from 'src/app/service/bill.service';
import { CategoryService } from 'src/app/service/category.service';
import { CustomerService } from 'src/app/service/customer.service';
import { OrderService } from 'src/app/service/order.service';
import { ProductService } from 'src/app/service/product.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  @ViewChild('chart') chart!: ElementRef;

  public OrdersChartOptions: any;
  public CustomersChartOptions: any;
  public BillsChartOptions: any;

  billList$: BehaviorSubject<Bill[]> = this.billService.list$;
  customerList$: BehaviorSubject<Customer[]> = this.customerService.list$;
  orderList$: BehaviorSubject<Order[]> = this.orderService.list$;
  productList$: BehaviorSubject<Product[]> = this.productService.list$;
  categoryList$: BehaviorSubject<Category[]> = this.categoryService.list$;

  notPaidOrders = this.orderList$.pipe(
    map(
      (params) =>
        params.filter(
          (item) => item.status === 'new' || item.status === 'shipped'
        )?.length
    )
  );

  activeCustomers = this.customerList$.pipe(
    map((params) => params.filter((item) => item.active)?.length)
  );

  activeProducts = this.productList$.pipe(
    map((params) => params.filter((item) => item.active)?.length)
  );

  notPaidBillsAmount = this.billList$.pipe(
    map((params) =>
      params
        .filter((item) => item.status === 'new')
        .reduce((acc, one) => acc + parseInt('' + one.amount), 0)
    )
  );
  productPriceByCategory: any;

  dataSource$ = combineLatest({
    products: this.productService.list$,
    categories: this.categoryService.list$,
    orders: this.orderService.list$,
    bills: this.billService.list$
  });

  /*
  productPriceByCategory = this.categoryList$.pipe(
    map((catArray) => {
      catArray.forEach((cat) => {
        let prodAmount: number = 0;
        let prodCount: number = 0;
        this.productList$.pipe(
          map((prodArray) => {
            prodArray.forEach((prod) => {
              if (prod.catID === cat.id) {
                prodAmount += parseInt('' + prod.price);
                prodCount++;
              }
            })
          })
          );
        return prodAmount/prodCount;
      });
    })
  );*/

  /*
  dataSource$ = combineLatest({
    products: this.productService.getAll(),
    categories: this.categoryService.getAll(),
  }).pipe(
    map( data => {
      this.categoryList = data.categories;
      const catList: {[x: string]: any} = {};
      data.products.forEach( product => {
        if (!catList[product.catID]) {
          catList[product.catID] = 0;
        }
        catList[product.catID]++;
      });
      return catList;
    }),
  );
*/

  /*
  productNumberByCategory = this.categoryList$.pipe(
    map( data => {
        //this.categoryList = data.categories;
        const catList: {[x: string]: any} = {};
        data.products.forEach( product => {
          if (!catList[product.catID]) {
            catList[product.catID] = 0;
          }
          catList[product.catID]++;
        });
        return catList;
      }),
  )
  */

  constructor(
    private billService: BillService,
    private customerService: CustomerService,
    private orderService: OrderService,
    private productService: ProductService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.billService.getAll();
    this.customerService.getAll();
    this.orderService.getAll();
    this.productService.getAll();
    this.categoryService.getAll();

    const chartSettings = {
      series: [
        {
          name: "order",
          data: [1,1,1]
        }
      ],
      chart: {
        height: 170,
        type: "bar"
      },
      plotOptions: {
        bar: {
          dataLabels: {
            position: "top" // top, center, bottom
          }
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function(val: any) {
          return val + "db";
        },
        offsetY: -30,
        style: {
          fontSize: "12px",
          colors: ["#304758"]
        }
      },

      xaxis: {
        categories: [
          '1',
          '1',
          '1'
        ],

        tooltip: {
          enabled: true,
          offsetY: -50
        }
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          type: "horizontal",
          shadeIntensity: 0.25,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [50, 0, 100, 100]
        }
      },
      yaxis: {
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        labels: {
          show: false,
          formatter: function(val: any) {
            return val + 'db';
          }
        }
      },
      title: {
        text: "",
        floating: true,
        offsetY: 150,
        align: "center",
        style: {
          color: "#444"
        }
      }
    };

    this.dataSource$.subscribe(
      data => {
        // Order chart.
        const newOrders: number =
          data.orders.filter(o => o.status.includes('new')).length;
        const shippedOrders: number =
          data.orders.filter(o => o.status === 'shipped').length;
        const paidOrders: number =
          data.orders.filter(o => o.status === 'paid').length;

        chartSettings.series[0].data[0] = newOrders;
        chartSettings.series[0].data[1] = shippedOrders;
        chartSettings.series[0].data[2] = paidOrders;
        chartSettings.xaxis.categories = ['new', 'shipped', 'paid']

        this.OrdersChartOptions = chartSettings;
      }
    );
    //this.chartOptions = chartSettings;
  }
}
