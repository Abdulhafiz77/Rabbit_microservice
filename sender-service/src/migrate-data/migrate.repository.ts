import { ProductModel } from '../models';
import { pgPoolQuery } from '..';

export class ProductMigrate {
    static async getAll(): Promise<ProductModel[]> {
        const { rows } = await pgPoolQuery('SELECT * FROM product');
        return rows;
    }

    static async create(product: ProductModel): Promise<void> {
        const { name, description, features, price, keywords, url, category, subcategory, status, count } = product;
        await pgPoolQuery(
            'INSERT INTO product (name, description, features, price, keywords, url, category, subcategory, status, count) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)',
            [name, description, features, price, keywords, url, category, subcategory, status, count]
        );
    }
}