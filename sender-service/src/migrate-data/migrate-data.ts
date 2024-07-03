import { ProductMigrate } from './migrate.repository';
import products from './products.json'



export async function CreateProductData() {
    try {
        await createProducts();
    } catch (error) {
        console.log(error);
    }
}

async function createProducts() {
    const existingProducts = await ProductMigrate.getAll();
    if (existingProducts.length === 0) {
        for (let i = 0; i < products.length; i++) {
            await ProductMigrate.create(products[i]);
        }
        console.log('Created Products');
    }
}