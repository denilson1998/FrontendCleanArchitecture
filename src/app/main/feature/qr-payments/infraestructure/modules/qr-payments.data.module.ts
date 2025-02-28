import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { QrPaymentsGateway } from '../../domain/gateway/qr-payments.gateway';
import { QrPaymentGetUseCase } from '../../domain/usecase/get-qr-payment.usecase';
import { QrPaymentsAddUseCase } from '../../domain/usecases/add.usecase';
import { QrPaymentsGetGroupQrUseCase } from '../../domain/usecases/getGroupedQrDetail.usecase';
import { QrPaymentsByQrIdUseCase } from '../../domain/usecases/getPaymetsByQrId.usecase';
import { QrPaymentsService } from '../services/qr-payments.service';


const QrPaymentsUseCaseFactory = (qrPaymentsRepo: QrPaymentsGateway) =>
  new QrPaymentGetUseCase(qrPaymentsRepo);


  export const getPaymentUseCaseProvider = {
    provide: QrPaymentGetUseCase,
    useFactory: QrPaymentsUseCaseFactory,
    deps: [QrPaymentsGateway],
  };
  
  export const addUseCaseProvider = {
    provide: QrPaymentsAddUseCase,
    useFactory: QrPaymentsUseCaseFactory,
    deps: [QrPaymentsGateway],
  };
  
  export const getCurrentUseCaseProvider = {
    provide: QrPaymentsGetGroupQrUseCase,
    useFactory: QrPaymentsUseCaseFactory,
    deps: [QrPaymentsGateway],
  };
  
  export const getPaymentsByQrCurrentUseCaseProvider = {
    provide: QrPaymentsByQrIdUseCase,
    useFactory: QrPaymentsUseCaseFactory,
    deps: [QrPaymentsGateway],
  };

@NgModule({
  providers: [
    getPaymentUseCaseProvider,
    addUseCaseProvider,
    getCurrentUseCaseProvider,
    getPaymentsByQrCurrentUseCaseProvider,
    {
      provide: QrPaymentsGateway,
      useClass: QrPaymentsService,
    }, 
  ],
  imports: [CommonModule, HttpClientModule],
})
export class QrPaymentsDataModule {}
