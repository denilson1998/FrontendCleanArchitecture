import { Component, Input } from '@angular/core';
import { CartItem, CreateSalesOrderState } from '../../states/create-order.state';
import { ProductDataModule } from '../../../../products/infrastructure/modules/product.data.module';
import { OrderDataModule } from '../../../infrastructure/modules/order.data.module';
import { AddButtonComponent } from 'src/app/shared/presentation/components/buttons/add-button/add-button.component';
import { SidebarDrawerComponent } from 'src/app/shared/presentation/components/sidebar-drawer/sidebar-drawer.component';
import { JichiTableComponent } from 'src/app/shared/presentation/components/table/table.component';
import { SectionTitleComponent } from 'src/app/shared/presentation/components/texts/section-title/section-title.component';
import { SpanComponent } from 'src/app/shared/presentation/components/texts/span/span.component';
import { SectionSubtitleComponent } from 'src/app/shared/presentation/components/texts/subtitle-section/section-subtitle.component';
import { AtomModule, MoleculesModule } from '@sitec/sarao';
import { CommonModule, formatNumber } from '@angular/common';
import { DataOptions, Filter, FilterParameters } from 'src/app/shared/domain/entities/data-options';
import { TableHeadEntity } from 'src/app/shared/domain/entities/table-head.entity';
import { ListProductEntity } from '../../../../products/domain/entities/list-product.entity';
import { ProductEntity } from '../../../../products/domain/entities/product.entity';
import { ProductGateway } from '../../../../products/domain/gateway/product.gateway';
import { ProductGetByOrganizationUseCase } from '../../../../products/domain/usecase/get.usecase';
import { OrderGateway } from '../../../domain/gateways/order.gateway';
import { Router } from '@angular/router';
import { ActionsDataRow } from '../../../../home/domain/entities/actions.data-row';
import { PriceEntity } from '../../../../products/domain/entities/price.entity';
import { ProductImageEntity } from '../../../../products/domain/entities/product-image.entity';
import { FormsModule } from '@angular/forms';
import { ProductForOrderDataRow } from 'src/app/main/feature/products/domain/entities/data-row-entities/products.data-row';
import { CreateProductComponent } from 'src/app/main/feature/products/presentation/create/create-product.component';

@Component({
  selector: 'products-list-for-order-creation',
  standalone: true,
  imports: [
    CommonModule,
    MoleculesModule,
    AtomModule,
    OrderDataModule,
    ProductDataModule,
    JichiTableComponent,
    SectionSubtitleComponent,
    SpanComponent,
    AddButtonComponent,
    SidebarDrawerComponent,
    ProductsListForOrderCreationComponent,
    FormsModule,
    CreateProductComponent
  ],
  templateUrl: './products-list-for-order-creation.component.html',
  styleUrls: ['./products-list-for-order-creation.component.scss']
})
export class ProductsListForOrderCreationComponent {
  @Input() createSalesOrderState!: CreateSalesOrderState;
  head: TableHeadEntity[] = [
    {name: 'Foto', prop: 'imageUri', type: 'image'},
    {name: 'Nombre del producto', prop: 'name', type: 'text'},
    {name: 'Código SKU', prop: 'skuCode', type: 'text'},
    {name: 'Cantidad disponible', prop: 'quantity', type: 'text'},
    {name: 'Precio', prop: 'price', type: 'price'},
    {name: 'Acciones', prop: 'actions', type: 'actions'}
  ]
  createProductModalIsShown = false;
  productCurrentPage: number = 1;
  productPageSize: number = 10;
  productsResponse?: ListProductEntity;
  products: ProductEntity[] = []
  productsDataRow : ProductForOrderDataRow[] = []
  productDataOptions: DataOptions = {
    paginationOptions: {
      pageSize: 10,
      pageNumber: 1
    },
    sortOptions: [],
    FilterOptions: []
  }
  constructor(
    private getProductsUseCase: ProductGetByOrganizationUseCase, 
    private router: Router,
    private ordersService: OrderGateway
  ) {
    this.loadProducts()
  }

  search(event: any) {
    const searchValue = event.target.value;
    if (!searchValue) {
      this.productDataOptions.FilterOptions = [];
      this.loadProducts();
      return;
    }
    this.productDataOptions.FilterOptions = [
      new FilterParameters({
        field: 'Name',
        operation: Filter.Equal,
        value: searchValue,
      })
    ];
    this.loadProducts()
  }

  changePage(page: number): void{
    this.productCurrentPage = page;
    this.productDataOptions.paginationOptions.pageNumber = this.productCurrentPage
    this.loadProducts()
  }

  goToInventory() {
    this.router.navigateByUrl('/app/products/lista')
  }

  setCarItemProductQuantity(carItem: CartItem) {
    this.createSalesOrderState.upsertCartItem(carItem);
  }

  forceOnlyTwoDecimals(event: any) {
    console.log(event)
    const allowedKeys = [
      'ArrowLeft',
      'ArrowUp',
      'ArrowDown',
      'ArrowRight',
      'End',
      'Home',
      '0',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '-',
      '.',
      'Delete',
      'Enter',
      'Backspace',
    ]
    if (!allowedKeys.includes(event.key)) {
      event.preventDefault()
      return;
    }
    const value = event.target.value
    let decimalsNumbers = 0;
    const decimalPointIndex = value.indexOf('.');
    console.log(event.target.selectionStart, decimalPointIndex)
    if (decimalPointIndex !== -1 && decimalPointIndex !== (value.length -1)) {
      decimalsNumbers = value.substring(decimalPointIndex+1, value.length).length;
    }
    if (decimalsNumbers >= 2 && Number.isNaN(Number(event.key)) === false && event.target.selectionStart > decimalPointIndex) {
      event.preventDefault();
    }
  }
  se(event: any) {
    console.log(event)
  }

  private loadProducts(){
    let dataOptions = this.productDataOptions
    this.getProductsUseCase.execute(dataOptions).subscribe({
      next: (resp) =>{
        let imageUri = "https://www.inkatrinaskitchen.com/wp-content/uploads/2011/04/Cookie-Monster-Cookies.jpg";
        resp.result.forEach(p => p.imageUri = imageUri)
        this.productsResponse = resp
        this.products = resp.result
        this.productsDataRow = []
        
        this.productsResponse.result.map((data)=>{
         data = new ProductEntity(data)
         this.productsDataRow.push(data.convertToProductForOrderDataRow())
        })
      },
      error: (e) =>{
        console.error(e)
      }
    })
  }

  getCartItemQuantity(productId: number) {
    return this.createSalesOrderState
      .cart
      .items
      .find((item) => item.product.id === productId)?.quantity ?? 0
  }

  addCartItemQuantity(productId: number) {
    let cartItemFound = this.createSalesOrderState
      .cart
      .items
      .find((item) => item.product.id === productId);
    
    if (!cartItemFound) {
      let product = this.products.find((product) => product.id === productId)!;
      cartItemFound = new CartItem(product, 0, product.prices[0].amount);
    }

    cartItemFound.quantity = cartItemFound?.quantity + 1 ?? 1;
    
    this.createSalesOrderState.upsertCartItem(cartItemFound)
  }

  inputQuantityChange(event: any, productId: number) {
    let quantity: number = Number(event.value) ?? 0;
    if (quantity === 0) {
      let cartItemFound = this.createSalesOrderState
      .cart
      .items
      .find((item) => item.product.id === productId);
      if (!cartItemFound) {
        return;
      }
      this.createSalesOrderState.removeCartItem(cartItemFound);
      return;
    }
    let cartItemFound = this.createSalesOrderState
      .cart
      .items
      .find((item) => item.product.id === productId);
    
    if (!cartItemFound) {
      let product = this.products.find((product) => product.id === productId)!;
      cartItemFound = new CartItem(product, 0, product.prices[0].amount);
    }

    cartItemFound.quantity = quantity;
    
    this.createSalesOrderState.upsertCartItem(cartItemFound)
  }

  removeCartItemQuantity(productId: number) {
    let cartItemFound = this.createSalesOrderState
      .cart
      .items
      .find((item) => item.product.id === productId);
    if (!cartItemFound) {
      return;
    }

    cartItemFound.quantity = cartItemFound?.quantity - 1 ?? 0;
    if (cartItemFound.quantity <= 0) {
      this.createSalesOrderState.removeCartItem(cartItemFound)
    } else {
      this.createSalesOrderState.upsertCartItem(cartItemFound)
    }
  }

  showCreateProductModal() {
    this.createProductModalIsShown = true;
  }
}
