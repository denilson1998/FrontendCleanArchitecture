import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserBaseEntity } from 'src/app/main/feature/auth/domain/entities/user.entity';
import { OrderFromListEntity } from 'src/app/main/feature/orders/domain/entities/order.entity';
import { UserDataModule } from '../../../infrastructure/modules/user.data.module';
import { GetUserUseCase } from '../../../domain/usecases/get-user.usecase';
import { AtomModule, ChartsModule, MoleculesModule } from '@sitec/sarao';
import { UserSoldProductsListComponent } from '../../components/user-sold-products-list/user-sold-products-list.component';
import { UserOrdersListComponent } from '../../components/user-orders-list/user-orders-list.component';
import { EditUserModalComponent } from '../../components/edit-user-modal/edit-user-modal.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [
    UserDataModule,
    AtomModule,
    MoleculesModule,
    ChartsModule,
    UserSoldProductsListComponent,
    UserOrdersListComponent,
    EditUserModalComponent,
    CommonModule,
    FormsModule
  ],
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent {
  userIdString?: string;
  user?: UserBaseEntity;
  orders?: Array<OrderFromListEntity>
  ordersCountChartSeries?: any;
  chartOptions?: any;
  ordersCountChartOptions?: any;

  currency = "Bs";

  editUserModalIsShown = false;

  datesRange: Date[] = [];
  categories: string[] = [];
  labels: string[] = [];

  groupByDays = 1;
  
  firstDate = new Date(new Date().setMonth(new Date().getMonth() - 1));
  endDate = new Date();

  constructor(
    private getUserUseCase: GetUserUseCase,
    private route: ActivatedRoute,
  ) {
    this.route.paramMap.subscribe( paramMap => {
      this.userIdString = paramMap.get('userId')!;
      this.loadUser();
    });
  }

  get filteredOrders() {
    return this.orders
      ?.filter((order) =>
        order.createdAt >= this.firstDate
        && order.createdAt <= this.endDate
        && order.isNullified === false
      );
  }

  get ordersLastDate() {
    return this.filteredOrders?.map((order) => order.createdAt).sort((a, b) => b.getTime() - a.getTime())[0];
  }

  get productsTotal() {
    return this.filteredOrders
      ?.reduce((total, order) => total + order.orderItems.reduce((total, orderItem) => total + orderItem.quantity, 0), 0) ?? 0;
  }

  get ordersTotal() {
    const total = this.filteredOrders?.reduce((total, order) => total + order.total, 0) ?? 0;
    return total;
  }

  get paidOrdersTotal() {
    return this.filteredOrders?.reduce((total, order) => total + order.total, 0) ?? 0;
  }
  a = true

  handleOrdersLoaded(orders: Array<OrderFromListEntity>) {
    this.orders = orders.filter((order) => order.isNullified === false);
    // this.firstDate = this.orders?.map((order) => order.createdAt).sort((a, b) => a.getTime() - b.getTime())[0];
    this.loadCharts();
  }
  // getDatesRange(startDate: Date, endDate: Date) {
  //   const dates = [];
  //   const currentDate = startDate;
  //   while (currentDate <= endDate) {
  //     dates.push(new Date(currentDate));
  //     currentDate.setDate(currentDate.getDate() + 1);
  //   }
  //   return dates;
  // }

  loadCharts(firstDate?: string, endDate?: string) {
    // this.a = false;
    // setTimeout(() => {
    //   this.a = true;
    // }, 100)
    if (firstDate) {
      this.firstDate = new Date(Date.parse(firstDate));
    }
    if (endDate) {
      this.endDate = new Date(Date.parse(endDate));
    }
    let difference = this.firstDate.getTime() - this.endDate.getTime();
    let totalDays = Math.ceil(difference / (1000 * 3600 * 24));
    if (this.groupByDays <= 1) {
      this.groupByDays = 1;
    }
    if (totalDays > 100 && this.groupByDays <= 1) {
      this.groupByDays = 7
    }

    let datesRange = []
    let loopDate = new Date(this.firstDate.getTime());
    while (loopDate <= this.endDate) {
      datesRange.push(new Date(loopDate));
      loopDate.setDate(loopDate.getDate() + this.groupByDays);
    }
    this.datesRange = datesRange;
    this.categories = datesRange.map((date) => date.toDateString());
    this.labels = datesRange.filter((date, index) => date.getDate() % 5 === 0).map((date) => date.toDateString());

    this.loadTotalChart();
    this.loadOrdersCountChart();
  }

  groupedOrders(date: Date) {
    return this.orders!.filter((order) => order.createdAt >= date && order.createdAt < new Date(date.setDate(date.getDate() + this.groupByDays)))
  }


  loadTotalChart() {
    const ordersTotalByDate = this.datesRange
    .map((date) => {
      return this.groupedOrders(date)
      // .filter((order) => order.createdAt.setHours(0, 0, 0, 0) === date.setHours(0, 0, 0, 0))
      .reduce((total, order) => total + order.total, 0) ?? 0
    });
    console.log(ordersTotalByDate)
    this.chartOptions = this.getChartOptions(ordersTotalByDate)
  }

  loadOrdersCountChart() {
    const ordersTotalByDate = this.datesRange
    .map((date) => {
      return this.groupedOrders(date)
      .length ?? 0
    });
    this.ordersCountChartOptions = this.getChartOptions(ordersTotalByDate)
  }

  loadUser() {
    const userId = Number(this.userIdString);
    if (Number.isNaN(userId)) {
      return;
    }
    this.getUserUseCase
      .execute(userId)
      .subscribe(
        {
          next: (resp) => {
            this.user = resp;
          }
        }
      )
  }
  showEditUserModal() {
    this.editUserModalIsShown = true;
  }

  handleUserEdited() {
    this.loadUser();
    this.editUserModalIsShown = false;
  }

  getChartOptions(data: number[]) {
    return {
      series: [
        {
          name: 'Cantidad de ventas:',
          data: data,
          color: '#02BED8',
        },
      ],
      chart: {
        height: 500,
        type: 'area',
        fontFamily: 'Open Sans',
        stacked: false,
        zoom: {
          type: 'x',
          enabled: true,
          autoScaleYaxis: true,
        },
        toolbar: {
          show: false,
          autoSelected: 'selection',
          tools: {
            download: false,
            reset: false,
          },
        },
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'light',
          type: 'vertical',
          shadeIntensity: 0.5,
          inverseColors: false,
          opacityFrom: 0.4,
          opacityTo: 0.1,
          stops: [0, 90, 100],
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
        width: 1,
      },
      legend: {
        horizontalAlign: 'left',
        position: 'top',
        markers: {
          radius: 3,
        },
        itemMargin: {
          horizontal: 15,
        },
      },
      grid: {
        row: {
          colors: ['transparent'], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
        xaxis: {
          lines: {
            show: true,
          },
        },
      },
      xaxis: {
        axisTicks: {
          show: false,
        },
        categories: this.categories,
        overwriteCategories: this.labels,
      },
    };
  }
}
