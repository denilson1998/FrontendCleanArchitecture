import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { QrPaymentsDataRow } from '../../domain/entities/data-row-entities/qr-payments.data-row';
import { QrPaymentEntity } from '../../domain/entities/qr-payments.entity';
import { QrPaymentsService } from '../../infraestructure/services/qr-payments.service';
import { SectionTitleComponent } from '../../../../../shared/presentation/components/texts/section-title/section-title.component';
import { AddButtonComponent } from 'src/app/shared/presentation/components/buttons/add-button/add-button.component';
import { JichiTableComponent } from 'src/app/shared/presentation/components/table/table.component';
import { SectionSubtitleComponent } from 'src/app/shared/presentation/components/texts/subtitle-section/section-subtitle.component';
import { SpanComponent } from 'src/app/shared/presentation/components/texts/span/span.component';
import { ListQrPaymentEntity } from '../../domain/entities/list-qr-payments.entity';
import { CurrencyBolivianPipe } from '../../../../../shared/presentation/helpers/pipes/currency-bolivian.pipe';

import { MoleculesModule, OrganismsModule, AtomModule, SnackbarComponent } from '@sitec/sarao';
import { QRCodeModule } from 'angularx-qrcode';
import { FormControl } from '@angular/forms';
import { QrPaymentGetUseCase } from '../../domain/usecase/get-qr-payment.usecase';

import { SnackbarService, SNACKBAR_POSITION, SNACKBAR_STATE } from '@sitec/sarao';
import { TableHeadEntity } from 'src/app/shared/domain/entities/table-head.entity';
import { DataOptions } from 'src/app/shared/domain/entities/data-options';

@Component({
  selector: 'app-qr-payments-list',
  standalone: true,
  templateUrl: './qr-payments-list.component.html',
  styleUrls: ['./qr-payments-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [
    CommonModule,
    SectionTitleComponent,
    AddButtonComponent,
    JichiTableComponent,
    SectionSubtitleComponent,
    SpanComponent,
    MoleculesModule,
    SnackbarComponent,
    OrganismsModule,
    AtomModule,
    QRCodeModule,
    CurrencyBolivianPipe
  ]
})
export class QrPaymentsListComponent implements OnInit {

  visibleNormal = false;
  visibleNormal_expired = false;
  flag_loader: boolean = false;
  flag_fill_dark: boolean = false;
  flag_error: boolean = false;

  visibleNoClosable = false;

  qrStringEncripted: string = '';
  client_name: string = '';
  qr_description: string = '';
  date_validate!: Date;
  amount!: number;
  is_Ex = new FormControl();

  @ViewChild('parent') parent!: ElementRef<HTMLImageElement>;
  elementType: string = "canvas";

  head: TableHeadEntity[] = [
    { name: 'Nombre del cliente', prop: 'clientName', type: 'text' },
    { name: 'Fecha y hora', prop: 'createdAt', type: 'dateTime' },
    { name: 'Monto recibido', prop: 'amount', type: 'price-qr' },
    { name: 'Descripción o glosa', prop: 'description', type: 'text' },
    { name: 'Estado', prop: 'isExpired', type: 'expired' },
    { name: 'Acciones', prop: 'see', type: 'actions' }
  ];

  currentPage: number = 1;
  pageSize: number = 10;
  paymentsResponse!: ListQrPaymentEntity;
  payments: QrPaymentEntity[] = [];
  paymentsDataRow: QrPaymentsDataRow[] = [];
  data!: ListQrPaymentEntity;


  dataOptions: DataOptions = {
    paginationOptions: {
      pageSize: 2,
      pageNumber: 1
    },
    sortOptions: [],
    FilterOptions: []
  }

  constructor(
    private ser: QrPaymentsService,
    public serviceQrPayment: QrPaymentsService,
    private getQrPaymentUseCase: QrPaymentGetUseCase,
    public snackbarService: SnackbarService) { }

  ngOnInit(): void {
    this.loadPayments(this.dataOptions);
  }


  close() {
    this.visibleNoClosable = false;
  }

  initLoad() {
    this.flag_loader = true;
    this.flag_fill_dark = true;
  }

  endLoad() {
    this.flag_loader = false;
    this.flag_fill_dark = false;
  }

  loadPayments(dataOptions: DataOptions) {
    this.initLoad();
    this.getQrPaymentUseCase.execute(dataOptions)
      .subscribe({
        next: (resp) => {
          this.endLoad();
          // TODO
          // this.paymentsResponse = resp;
          this.paymentsResponse = this.ser.data;
          this.payments = resp.result;
          this.paymentsResponse.result.map((data) => {
            data = new QrPaymentEntity(data);
            this.paymentsDataRow.push(data.convertToDataRow())
          })
        },
        error: (e) => {
          this.flag_loader = false;
          this.flag_fill_dark = true;
          this.flag_error = true;
          console.log(e);
        }
      })
  }

  reload() {
    window.location.reload();
  }

  saveAsImage(parent: any) {
    let parentElement = null
    if (this.elementType === "canvas") {
      // fetches base 64 data from canvas
      parentElement = parent.children[1].children[0].children[0].children[0]
        .querySelector("canvas")
        .toDataURL("image/png")
    } else if (this.elementType === "img" || this.elementType === "url") {

      parentElement = parent.qrcElement.nativeElement.querySelector("img").src
    } else {
      console.log("Set elementType to 'canvas', 'img' or 'url'.");
    }

    if (parentElement) {
      // converts base 64 encoded image to blobData
      let blobData = this.convertBase64ToBlob(parentElement)
      // saves as image
      const blob = new Blob([blobData], { type: "image/png" })
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a")
      link.href = url;
      // name of the file
      link.download = `qr_pago_${this.qr_description}.png`;
      link.click()
    }
  }

  copyImageInMemory(parent: any) {
    let parentElement = null
    if (this.elementType === "canvas") {
      // fetches base 64 data from canvas
      parentElement = parent.children[1].children[0].children[0].children[0]
        .querySelector("canvas")
        .toDataURL("image/png")
    } else if (this.elementType === "img" || this.elementType === "url") {

      parentElement = parent.qrcElement.nativeElement.querySelector("img").src
    } else {
      console.log("Set elementType to 'canvas', 'img' or 'url'.");
    }
    if (parentElement) {
      // converts base 64 encoded image to blobData
      let blobData = this.convertBase64ToBlob(parentElement)
      // saves as image
      const blob = new Blob([blobData], { type: "image/png" })
      const clipboardItem = new ClipboardItem({ 'image/png': blob });
      navigator.clipboard.write([clipboardItem]).then(() => {
        this.showSnackbar();
      }).catch((error) => {
        console.error('Failed to copy image: ', error);
      });
    }
  }

  private convertBase64ToBlob(Base64Image: string) {
    const parts = Base64Image.split(";base64,")
    const imageType = parts[0].split(":")[1]
    const decodedData = window.atob(parts[1])
    const uInt8Array = new Uint8Array(decodedData.length)
    for (let i = 0; i < decodedData.length; ++i) {
      uInt8Array[i] = decodedData.charCodeAt(i)
    }
    return new Blob([uInt8Array], { type: imageType })
  }

  changePage(page: number): void {
    this.currentPage = page;
  }

  seeQR(item: QrPaymentsDataRow) {
    this.qr_description = item.description;
    this.qrStringEncripted = item.encryptedQrString;
    this.client_name = item.clientName;
    this.date_validate = new Date(item.expirationDate);
    this.amount = item.amount;
    this.flag_fill_dark = true;
    this.is_Ex.setValue(item.isExpired);

    this.visibleNormal = true;

    setTimeout(() => {
      this.copyImageInMemory(this.parent.nativeElement);
    }, 1000);
  }

  seeQRexpired(item: QrPaymentsDataRow) {
    this.qr_description = item.description;
    this.qrStringEncripted = item.encryptedQrString;
    this.client_name = item.clientName;
    this.date_validate = new Date(item.expirationDate);
    this.amount = item.amount;
    this.flag_fill_dark = true;
    this.is_Ex.setValue(item.isExpired);
    
    this.visibleNormal_expired = true;

  }

  closeModalQrActive() {
    this.visibleNormal_expired = false;
    this.visibleNormal = false;
    this.flag_fill_dark = false;
    this.qrStringEncripted = '';
    this.client_name = '';
    this.date_validate = new Date();
    this.amount = 0;
    this.is_Ex.reset();
    this.setear();
  }

  setear() {
    this.parent = ElementRef.prototype;
  }

  closeModalQrExpired() {
    this.visibleNormal_expired = false;
    this.visibleNormal = false;
    this.flag_fill_dark = false;
    this.qrStringEncripted = '';
    this.client_name = '';
    this.date_validate = new Date();
    this.amount = 0;
    this.is_Ex.reset();
  }

  showSnackbar() { 
      this.snackbarService.showSnackbar(
        SNACKBAR_STATE.success, 
        SNACKBAR_POSITION.bottomright,
        '¡Listo! Se ha copiado el código QR generado al portapapeles.'
        )
  }

}
