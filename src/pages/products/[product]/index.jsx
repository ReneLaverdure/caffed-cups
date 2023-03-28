import ProductCard from '../../../components/ProductCard/ProductCard'
import Product from '../../../models/products'

export default function product({products}) {

     if (typeof products === "undefined"){
    return "Loading..."
    } 

    return (
        <>  
            <div className='ProductContainer'>
                <div>
                    <h2>Region</h2>
                    <h2>Roast</h2>
                    <h2>Types</h2>
                </div>
                <div className='ProductGrid'>
                    {
                        products.map((item) => {
                            return(
                              
                                    <ProductCard key={item.name} item={item} />
                            
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export async function getStaticPaths() {
    return {
      paths: [
        { params: { product: 'coffee' } },
        { params: { product: 'tea' } }
      ],
      fallback: false,
    }
  }

export async function getStaticProps(context) {
    let products = await Product.find({product_type: context.params.product})
    products = JSON.stringify(products)
    products = JSON.parse(products)

    return {
        props: { 
            products 
        },
    }
}
  