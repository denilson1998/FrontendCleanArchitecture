import { CategoryEntity } from "./category.entity";
import { ProductDataRow, ProductForOrderDataRow } from "./data-row-entities/products.data-row";
import { InventoryEntity } from "./inventory.entities";
import { PriceEntity } from "./price.entity";
import { ProductDetailsEntity } from "./product-details.entity";
import { ProductImageEntity } from "./product-image.entity";

export class ProductEntity {
    id : number;
    name: string;
    description: string;
    prices : PriceEntity[];
    categories: CategoryEntity[];
    productDetails: ProductDetailsEntity [];
    productImages: ProductImageEntity[];
    inventory: InventoryEntity;
    imageUri: string = "https://www.inkatrinaskitchen.com/wp-content/uploads/2011/04/Cookie-Monster-Cookies.jpg";
    skuCode: string;
    hasCharacteristics: boolean;
    isShownInCatalog: boolean;
    isMarketplaceSynced: boolean;
    isTrackingInventoryMovement: boolean;

    constructor(product: ProductEntity){
        this.id = product.id;
        this.name = product.name;
        this.description = product.description;
        this.prices = product.prices;
        this.categories = product.categories;
        this.productDetails = product.productDetails;
        this.productImages = product.productImages;
        this.inventory = product.inventory;
        // this.imageUri = product.imageUri;
        this.skuCode = product.skuCode;
        this.hasCharacteristics = product.hasCharacteristics;
        this.isShownInCatalog = product.isShownInCatalog;
        this.isMarketplaceSynced = product.isMarketplaceSynced;
        this.isTrackingInventoryMovement = product.isTrackingInventoryMovement;
        this.imageUri = "https://www.inkatrinaskitchen.com/wp-content/uploads/2011/04/Cookie-Monster-Cookies.jpg";
}

    public convertToProductForOrderDataRow(){
        return new ProductForOrderDataRow(
            this.id, 
            this.productImages,
            this.name, 
            this.skuCode,
            this.inventory.quantity,
            this.prices,
        )
    }

    public convertToDataRow(){
        return new ProductDataRow(
            this.id, 
            this.productImages,
            this.name, 
            this.isShownInCatalog, 
            this.skuCode,
            this.inventory.quantity,
            this.prices,
            {
                showAction: false,
                editAction: true,
                deleteAction: false
            }
        )
    }
}