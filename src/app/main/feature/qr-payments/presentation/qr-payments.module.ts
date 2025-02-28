import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SectionTitleComponent } from 'src/app/shared/presentation/components/texts/section-title/section-title.component';
import { QrPaymentsComponent } from './qr-payments.component';
import { QrPaymentsRoutingModule } from './qr-payments-routing.module';
import { QrPaymentsDataModule } from '../infraestructure/modules/qr-payments.data.module';
import { AtomModule } from '@sitec/sarao';


@NgModule({
  declarations: [
    QrPaymentsComponent,

  ],
  imports: [
    CommonModule,
    RouterModule,
    SectionTitleComponent,
    QrPaymentsRoutingModule,
    QrPaymentsDataModule,
    AtomModule
  ],
})
export class QrPaymentsModule { }
