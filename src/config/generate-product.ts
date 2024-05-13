import { fakerES as faker } from "@faker-js/faker";




export class GenerateProducts {

    

    static #createProduct() {
        const category = ['computadoras',
            'telefonos',
            'televisores',
            'accesorios',
            'electrodomésticos']
        return {
            id:faker.database.mongodbObjectId(),
            title: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            code: faker.string.uuid(),
            stock: faker.string.numeric(),
            category:category[Math.floor(Math.random()*category.length)],
            price: faker.commerce.price(),
            thumbnails: faker.image.url(),
        }
    }

    static generateProducts() {
        let product = []
        for (let i = 0; i < 10; i++) {
            product.push(this.#createProduct())
        }

        return product
    }
}