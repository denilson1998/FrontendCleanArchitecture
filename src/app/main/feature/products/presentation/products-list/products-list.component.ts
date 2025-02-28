import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { JichiTableComponent } from 'src/app/shared/presentation/components/table/table.component';
import { AddButtonComponent } from "src/app/shared/presentation/components/buttons/add-button/add-button.component";
import { ProductEntity } from 'src/app/main/feature/products/domain/entities/product.entity';
import { ListProductEntity } from 'src/app/main/feature/products/domain/entities/list-product.entity';
import { ProductDataRow } from 'src/app/main/feature/products/domain/entities/data-row-entities/products.data-row';
import { SectionSubtitleComponent } from 'src/app/shared/presentation/components/texts/subtitle-section/section-subtitle.component';
import { SpanComponent } from 'src/app/shared/presentation/components/texts/span/span.component';
import { SidebarDrawerComponent } from 'src/app/shared/presentation/components/sidebar-drawer/sidebar-drawer.component';
import { CreateProductComponent } from '../create/create-product.component';
import { EditProductComponent } from 'src/app/main/feature/products/presentation/edit/edit-product.component';
import { ProductSharingService } from '../services/product-sharing.service';
import { Subscription } from 'rxjs';
import { TableHeadEntity } from 'src/app/shared/domain/entities/table-head.entity';
import { DataOptions } from 'src/app/shared/domain/entities/data-options';
import { MoleculesModule } from '@sitec/sarao';
import { ProductGetByOrganizationUseCase } from '../../domain/usecase/get.usecase';

@Component({
    selector: 'app-products-list',
    standalone: true,
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.scss'],
    imports: [
      CommonModule, 
      JichiTableComponent, 
      AddButtonComponent, 
      SectionSubtitleComponent, 
      SpanComponent, 
      SidebarDrawerComponent, 
      CreateProductComponent,
      EditProductComponent,
      MoleculesModule,
    ],
 
})
export class ProductsListComponent implements OnInit, OnDestroy {
  head: TableHeadEntity[] = [
    {name: 'Foto', prop: 'imageUri', type: 'image'},
    {name: 'Nombre del producto', prop: 'name', type: 'text'},
    {name: 'Mostrar en catálogo', prop: 'isShownInCatalog', type: 'toggle'},
    {name: 'Código SKU', prop: 'skuCode', type: 'text'},
    {name: 'Cantidad disponible', prop: 'quantity', type: 'text'},
    {name: 'Precio', prop: 'price', type: 'price'},
    {name: 'Acciones', prop: 'actions', type: 'actions'}
]

 
  currentPage: number = 1;
  pageSize: number = 10;
  productsResponse!: ListProductEntity;
  products: ProductEntity[] = []
  productsDataRow : ProductDataRow[] = []
  createModal : boolean = false
  editModal: boolean = false;
  currentPageForm: string = 'create-options'
  currentPageFormEdit: string = 'main-edit'
  contentSideBar:string = ''
  currentProduct!: ProductEntity;
  subscription!: Subscription;
  dataOptions: DataOptions = {
    paginationOptions: {
      pageSize: 10,
      pageNumber: 1
    },
    sortOptions: [],
    FilterOptions: []
  }

  constructor(private getUseCase: ProductGetByOrganizationUseCase, private sharingService: ProductSharingService){}


  ngOnInit(): void {
   this.loadProducts(this.dataOptions)
    this.subscription = this.sharingService.currentProduct.subscribe(product => this.currentProduct = product)
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  changePage(page: number): void{
    this.currentPage = page;
    this.dataOptions.paginationOptions.pageNumber = this.currentPage
    this.loadProducts(this.dataOptions)
  }


  loadProducts(dataOptions: DataOptions){
    this.getUseCase.execute(dataOptions).subscribe({
      next: (resp) =>{
        this.productsResponse = resp
        this.products = resp.result
        this.productsDataRow = []
        
        this.productsResponse.result.map((data)=>{
         data = new ProductEntity(data)
         this.productsDataRow.push(data.convertToDataRow())
        })
      },
      error: (e) =>{
        console.error(e)
      }
    })

  }


  updateShowInCatalog(item:any){
  }

  editProduct(item:ProductDataRow){
    this.editModal = true
    this.contentSideBar = 'edit'

    let foundItem = this.products.find((data) => {
      return data.id === item.id 
    })
    this.currentProduct = foundItem!
    this.sharingService.changeProduct(this.currentProduct)
    this.currentPageFormEdit = 'main-edit'
  }

  openSideBarDrawer(){
    this.createModal = true
    this.contentSideBar = 'create'
  }

  closeSideBarDrawer(){
    this.createModal = false
    this.editModal = false
  }

  actionClickEvent(){}


}
