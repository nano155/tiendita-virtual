import { useEffect } from "react"
import { useAuth } from "../../hook/useAuth"
import Card from "../components/Card"


const Products = () => {
    const {getProducts, products} = useAuth()

  useEffect(() => {
    getProducts()

  }, [])
  
  return (
    <section className="grid grid-cols-3 justify-items-center m-6 gap-y-8">
      {
        products && products.map(product =>(
          <Card key={product.id} className="flex items-center justify-center" description={product.description} id={product.id} price={product.price} title={product.title}/>
        ))
      }
    </section>
  )
}

export default Products
