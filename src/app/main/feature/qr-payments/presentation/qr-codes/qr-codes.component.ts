import { CommonModule } from '@angular/common';
import { Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  AtomModule,
  MoleculesModule,
  OrganismsModule,
  SnackbarService,
  SNACKBAR_POSITION,
  SNACKBAR_STATE,
} from '@sitec/sarao';
import { PaymentMethod } from 'src/app/shared/domain/enums/paymenetMethod';
import { CacheService } from 'src/app/shared/infrastructure/services/cache.service';
import { OrganizationModel } from '../../../organization/infrastructure/models/organization.model';
import { PaymentsModel } from '../../infraestructure/models/payments.model';
import { QRCodeModule } from 'angularx-qrcode';
import { SafeUrl } from '@angular/platform-browser';
import { JichiTableComponent } from 'src/app/shared/presentation/components/table/table.component';

import { SharedPresentation } from 'src/app/shared/presentation/shared.module';
import {
  ListQrPaymentByQrModel,
  qrInfoModel,
} from '../../infraestructure/models/listQrPaymentsByQr.mode';

import dataGropuedQrFake from '../data-fake/groupedQrDetail.json';
import dataQrIdFake from '../data-fake/PaymentByQrID.json';
import { QrPaymentsAddUseCase } from '../../domain/usecases/add.usecase';
import { QrPaymentsGetGroupQrUseCase } from '../../domain/usecases/getGroupedQrDetail.usecase';
import { QrPaymentsByQrIdUseCase } from '../../domain/usecases/getPaymetsByQrId.usecase';
import { ListGroupedQrDetailModel } from '../../infraestructure/models/ListGroupedQr.model';
import { LocalStorageLoadOptions } from 'src/app/shared/domain/entities/local-storage-options';
import { TableHeadEntity } from 'src/app/shared/domain/entities/table-head.entity';
import { SectionTitleComponent } from 'src/app/shared/presentation/components/texts/section-title/section-title.component';

@Component({
  selector: 'app-qr-codes',
  templateUrl: './qr-codes.component.html',
  standalone: true,
  styleUrls: ['./qr-codes.component.scss'],
  imports: [
    CommonModule,
    AtomModule,
    MoleculesModule,
    ReactiveFormsModule,
    QRCodeModule,
    JichiTableComponent,
    SharedPresentation,
    OrganismsModule,
    SectionTitleComponent
  ],
})
export class QrCodesComponent {

  @ViewChild('qr') qr!: ElementRef<HTMLImageElement>;

  organization: OrganizationModel = {} as OrganizationModel;
  groupedQrDetail: ListGroupedQrDetailModel = {} as ListGroupedQrDetailModel;
  listQrPaymetnByQr: ListQrPaymentByQrModel = {} as ListQrPaymentByQrModel;
  loadOptions: LocalStorageLoadOptions = {} as LocalStorageLoadOptions;
  qrInfo: qrInfoModel = {} as qrInfoModel;
  visilbeRight: boolean = false;
  visilbeModalQr: boolean = false;
  visilbeModalQrError: boolean = false;
  visilbeQrListRight: boolean = false;
  loading: boolean = false;
  showTable: boolean = false;
  finishedCustom: boolean = false;

  filterSelect: FormControl = new FormControl();

  amount: number = 0;
  idQr: number = 0;
  description: string = '';
  expiration: string = '';
  name: string = '';
  encryptedQrString: string = '';
  title: string = '';
  elementType: string = 'canvas';
  titleQrShow: string = '';

  qrCodeSrc: SafeUrl = '';

  head: TableHeadEntity[] = [
    { name: 'Descripción o glosa', prop: 'description', type: 'text' },
    { name: 'Número de ID', prop: 'qrId', type: 'text' },
    { name: 'Estado del QR', prop: 'isPaid', type: 'chip' },
    { name: 'Pagos recibidos', prop: 'paidNumber', type: 'text' },
    { name: 'Acciones', prop: 'actions', type: 'actions' },
  ];
  FilterOptions = [
    {
      viewValue: 'Activo',
      value: 'Activo',
    },
    {
      viewValue: 'Vencidos',
      value: 'Vencidos',
    },
    {
      viewValue: 'Todos',
      value: 'Todos',
    },
  ];
  constructor(
    private fb: FormBuilder,
    private paymentsAddService: QrPaymentsAddUseCase,
    private paymentsGetGruopedService: QrPaymentsGetGroupQrUseCase,
    private paymentsByQrIdService: QrPaymentsByQrIdUseCase,
    private storage: CacheService,
    public snackbarService: SnackbarService
  ) {
    this.loadOptions = {
      key: 'organization',
      ignoreExpiration: true,
      isObject: true,
    };
    this.organization = this.storage.load(this.loadOptions);
    this.groupedQrDetail = dataGropuedQrFake as ListGroupedQrDetailModel;
    // dataQrIdFake.result = dataQrIdFake.result.map((item) => { new PaymentsModel(item) });
    // this.listQrPaymetnByQr = dataQrIdFake as ListQrPaymentByQrModel;
  }

  ngOnInit() {
    this.showTable = true;
  }

  formGroup = this.fb.group({
    billId: [null], // reset to null
    amount: [0, Validators.required],
    currency: [''],
    paymentMethod: [''],
    qrDescription: ['', [Validators.required]],
    change: [0],
  });

  openRight() {
    this.visilbeRight = true;
  }
  close() {
    this.visilbeRight = true;
  }

  getQr() {
    this.paymentsGetGruopedService.execute().subscribe({
      next: (resp) => {
        console.log(resp);
        this.groupedQrDetail = resp;
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  getPayByQr(qrInfo: qrInfoModel) {
    qrInfo.id = this.idQr;
    this.paymentsByQrIdService.execute(qrInfo).subscribe({
      next: (resp) => {
        console.log(resp);
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  getRow(row: any) {
    this.idQr = row.id;
    this.visilbeQrListRight = true;
    this.titleQrShow = row.description;
    this.amount = row.amount!;
    this.description = row.description!;
    this.expiration = row.expirationDate!;
    this.name = row.clientName!;
    this.encryptedQrString = row.encryptedQrString!;
    this.title = 'Código QR';
    // call to getPayByQr metohd
  }
  onSubmit(): void {
    this.formGroup.markAllAsTouched();
    if (!this.formGroup.valid) {
      console.log('no es valido');
      return;
    }
    console.log(this.organization);
    this.formGroup.get('currency')?.setValue(this.organization.currency);
    this.formGroup
      .get('amount')
      ?.setValue(Number(this.formGroup.get('amount')?.value));
    this.formGroup.get('paymentMethod')?.setValue(PaymentMethod.QR);
    console.log(this.formGroup.value);
    this.visilbeModalQr = true;
    this.loading = true;
    this.addPayments();
  }

  addPayments() {
    this.paymentsAddService
      .execute(this.formGroup.value as PaymentsModel)
      .subscribe({
        next: (resp) => {
          this.amount = resp.amount!;
          this.description = resp.qrDetail?.description!;
          this.expiration = resp.qrDetail?.expirationDate!;
          this.name = resp.qrDetail?.clientName!;
          this.encryptedQrString = resp.qrDetail?.encryptedQrString!;
          this.title = 'Código QR';
          this.loading = false;
          this.visilbeModalQr = true;
          setTimeout(() => {
            this.copyImageInMemory(this.qr);
          }, 1000);
        },
        error: (e) => {
          this.visilbeModalQr = false;
          this.loading = false;
          this.visilbeModalQrError = true;
        },
      });
  }

  onChangeURL(url: SafeUrl) {
    console.log(url);
    this.qrCodeSrc = url;
  }

  saveAsImage(parent: any) {
    let parentElement = null;

    if (this.elementType === 'canvas') {
      // fetches base 64 data from canvas
      parentElement = parent.children[0].children[0].children[0].children[0]
        .querySelector('canvas')
        .toDataURL('image/png');
    } else if (this.elementType === 'img' || this.elementType === 'url') {
      parentElement = parent.qrcElement.nativeElement.querySelector('img').src;
    } else {
      console.log("Set elementType to 'canvas', 'img' or 'url'.");
    }

    if (parentElement) {
      // converts base 64 encoded image to blobData
      let blobData = this.convertBase64ToBlob(parentElement);
      // saves as image
      const blob = new Blob([blobData], { type: 'image/png' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      // name of the file
      link.download = 'Qrcode';
      link.click();
    }
  }

  private convertBase64ToBlob(Base64Image: string) {
    const parts = Base64Image.split(';base64,');
    const imageType = parts[0].split(':')[1];
    const decodedData = window.atob(parts[1]);
    const uInt8Array = new Uint8Array(decodedData.length);
    for (let i = 0; i < decodedData.length; ++i) {
      uInt8Array[i] = decodedData.charCodeAt(i);
    }
    return new Blob([uInt8Array], { type: imageType });
  }

  retry() {
    this.visilbeModalQrError = false;
    this.loading = true;
    this.visilbeModalQr = true;
    this.addPayments();
  }

  onScrollCustom() {
    this.finishedCustom = true;
    setTimeout(() => {
      this.finishedCustom = false;
    }, 1000);
  }

  showQrSelecting() {
    this.visilbeQrListRight = false;
    this.visilbeModalQr = true;
    setTimeout(() => {
      this.copyImageInMemory(this.qr);
    }, 1000);
  }

  showSnackbar() {
    this.snackbarService.showSnackbar(
      SNACKBAR_STATE.success,
      SNACKBAR_POSITION.bottomright,
      '¡Listo! Se ha copiado el código QR generado al portapapeles.'
    );
  }

  copyImageInMemory(parent: any) {
    console.log('pareeeent',parent.qrcElement.nativeElement);
    
    let parentElement = null
    if (this.elementType === "canvas") {
      // fetches base 64 data from canvas
      parentElement = parent.qrcElement.nativeElement
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
}
