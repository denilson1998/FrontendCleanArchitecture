import { CategoryModel } from "./category.model";
import { InventoryModel } from "./inventory.model";
import { PriceModel } from "./price.model";
import { ProductDetailsModel } from "./product-details.model";
import { ProductImageModel } from "./product-image.model";

export interface ProductModel {
    name: string;
    description? : string;
    prices: PriceModel[];
    inventory?: InventoryModel;
    categories?: CategoryModel[];
    productDetails?: ProductDetailsModel[];
    productImages?: ProductImageModel;
    skuCode?: string;
    isTrackingInventoryMovement?: boolean;
}