import { BaseModel } from "../base/base.model";


export interface ProductModel extends BaseModel {
    name: string;
    description: string;
    features: string;
    price: number;
    keywords: string;
    url: string;
    category: string;
    subcategory: string;
}