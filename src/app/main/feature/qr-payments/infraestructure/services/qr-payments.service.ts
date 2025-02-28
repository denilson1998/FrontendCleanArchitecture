import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiService } from 'src/app/shared/infrastructure/services/api.service';
import { CacheService } from 'src/app/shared/infrastructure/services/cache.service';
import { environment } from 'src/environments/environment';
import { UserEntity } from '../../../auth/domain/entities/user.entity';
import { PaymentsEntity } from '../../domain/entities/payments.entity';
import { qrInfoModel, ListQrPaymentByQrModel } from '../models/listQrPaymentsByQr.mode';
import { PaymentsModel } from '../models/payments.model';
import { HttpClient } from '@angular/common/http';
import { ListQrPaymentEntity } from '../../domain/entities/list-qr-payments.entity';
import { QrPaymentEntity } from '../../domain/entities/qr-payments.entity';
import { QrPaymentsGateway } from '../../domain/gateway/qr-payments.gateway';
import { DataOptions } from 'src/app/shared/domain/entities/data-options';
import { ListGroupedQrDetailModel } from '../models/ListGroupedQr.model';

@Injectable({
  providedIn: 'root'
})

export class QrPaymentsService extends QrPaymentsGateway {

  public data!: any;
  
  constructor( private apiService: ApiService, private http: HttpClient) {
    super();
    this.getFile();
  }
 
  getPayments(params: DataOptions): Observable<ListQrPaymentEntity> {
    let userInfo = JSON.parse(localStorage.getItem('userInfo')!);
    return this.apiService.getwithPagination<ListQrPaymentEntity>(
      `${environment.paymentsApi}/organizations/${userInfo.currentOrganizationId}/payments`,
      params)
      .pipe(map((data) => {
        console.log(data);
        
        data.result.forEach((item) => {
          item = new QrPaymentEntity(item)
        })
        return data;
      }));
  }


  getFile() {
    this.http.get('assets/db.json.txt').subscribe(dato => {
      this.data = dato;
    })
  }
  userInfo : UserEntity = {} as UserEntity;
 

  add(params: PaymentsModel): Observable<PaymentsEntity> {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo')!);
    return this.apiService
      .post<PaymentsEntity>(
        `${environment.paymentsApi}/organizations/${this.userInfo.currentOrganizationId}/payments`,
        params
      )
      .pipe(
        map((data: PaymentsEntity) => {
          return data;
        })
      );
  }

  getGroupedQrDetail(): Observable<ListGroupedQrDetailModel> {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo')!);
    return this.apiService.get<ListGroupedQrDetailModel>(
      `${environment.paymentsApi}/organizations/${this.userInfo.currentOrganizationId}/qr`
    );
  }

  getQrPaymentById(params: qrInfoModel): Observable<ListQrPaymentByQrModel> {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo')!);
    return this.apiService.get<ListQrPaymentByQrModel>(
      `${environment.paymentsApi}/organizations/${this.userInfo.currentOrganizationId}/qr/${params.id}`
    );
  }

  // TODO
  // getPayments(params: DataOptions): Observable<ListQrPaymentEntity> {
  //   let userInfo = JSON.parse(localStorage.getItem('userInfo')!);
  //   return this.apiService.getwithPagination<ListQrPaymentEntity>(
  //     `${environment.paymentsApi}/organizations/${userInfo.currentOrganizationId}/qr/payments`,
  //     params)
  //     .pipe(map((data) => {
  //       console.log(data);
        
  //       data.result.forEach((item) => {
  //         item = new QrPaymentEntity(item)
  //       })
  //       return data;
  //     }));
  // }
}
