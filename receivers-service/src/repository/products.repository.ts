import { pgPoolQuery } from "../database";
import { ProductModel } from "../models";

export class ProductRepository {
  static async update(params: ProductModel): Promise<ProductModel> {
    const sql = `UPDATE products SET name = $1, 
                                         description = $2, 
                                         features = $3, 
                                         price = $4, 
                                         keywords = $5, 
                                         url = $6, 
                                         category = $7, 
                                         subcategory = $8, 
                                         status = $9, 
                                         count = $10, 
                                         updated_at = NOW()
                                   WHERE id = $11 RETURNING *`
    const result = await pgPoolQuery(sql,
                                    [params.name,
                                      params.description,
                                      params.features,
                                      params.price,
                                      params.keywords,
                                      params.url,
                                      params.category,
                                      params.subcategory,
                                      params.status,
                                      params.count,
                                      params.id,
                                ]);
     return result.rows[0];
}
  }
