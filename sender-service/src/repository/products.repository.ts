import { pgPoolQuery } from "../database";
import { ProductModel } from "../models";

export class ProductRepository {
    static async create(params: ProductModel): Promise<ProductModel> {
        const sql = `INSERT INTO organization_user (name, description, features, price, keywords, url, category, subcategory) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;`
       
        const result = await pgPoolQuery(sql, [params.name, 
                                               params.description,
                                               params.features,
                                               params.price,
                                               params.keywords,
                                               params.url,
                                               params.category,
                                               params.subcategory
                                       ]);
 return result.rows[0];
    }
  }
