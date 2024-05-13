import fs  from 'fs'
import { GenerateProducts } from '../../../../config/generate-product'


export class ProductService{

    constructor(
        public readonly path = './data'
    ){}

    #createProductFile(){
        if(!fs.existsSync(this.path)){
            fs.mkdirSync(this.path)
        }
        return
    }

    #createProducts(){
        this.#createProductFile()

        const products = GenerateProducts.generateProducts()
        if(fs.existsSync(`${this.path}/products.json`)){
            return
        } 
        
        return fs.writeFileSync(`${this.path}/products.json`, JSON.stringify(products, null, '\t'))

        
        
    }   

    getProducts(){
        this.#createProducts()
        if(fs.existsSync(`${this.path}/products.json`)){

            return JSON.parse(fs.readFileSync(`${this.path}/products.json`, 'utf-8'))
        } 
    }

}