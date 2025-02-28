import { PriceEntity } from "src/app/main/feature/products/domain/entities/price.entity";
import { ProductImageEntity } from "src/app/main/feature/products/domain/entities/product-image.entity";
import { ActionsDataRow } from "src/app/main/feature/home/domain/entities/actions.data-row";

export class ProductDataRow {
        id: number;
        imageUri: string;
        name: string;
        isShownInCatalog: boolean;
        skuCode: string;
        quantity: number;
        price: PriceEntity;
        actions: ActionsDataRow;

    constructor(
        id: number,
        productImages: ProductImageEntity[],
        name: string,
        isShownInCatalog: boolean,
        skuCode: string,
        quantity: number,
        prices: PriceEntity[],
        actions: ActionsDataRow
    ){
       
        // this.imageUri = productImages[0]?.blobUri;
        this.imageUri = "https://www.inkatrinaskitchen.com/wp-content/uploads/2011/04/Cookie-Monster-Cookies.jpg";
        this.name = name;
        this.isShownInCatalog = isShownInCatalog;
        this.skuCode = skuCode;
        this.quantity = quantity;
        this.price = prices[0];
        this.actions = actions
        this.id = id;
    }
}

export class ProductForOrderDataRow {
  id: number;
  imageUri: string;
  name: string;
  skuCode: string;
  quantity: number;
  price: PriceEntity;

  constructor(
    id: number,
    productImages: ProductImageEntity[],
    name: string,
    skuCode: string,
    quantity: number,
    prices: PriceEntity[],
  ){
  
    // this.imageUri = productImages[0]?.blobUri;
    this.imageUri = "https://www.inkatrinaskitchen.com/wp-content/uploads/2011/04/Cookie-Monster-Cookies.jpg";
    this.name = name;
    this.skuCode = skuCode;
    this.quantity = quantity;
    this.price = prices[0];
    this.id = id;
  }
}