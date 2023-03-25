import React from 'react'

import ProductCard from '../../../components/ProductCard/ProductCard'


export default function product({products}) {
    // const dispatch = useDispatch();
    // const items = useSelector((state) => state.items);

    // const router = useRouter();
    // const productLine = router.query.product

    // //if no products in store dispatch
    // if(!items[productLine]){

    //     console.log(dispatch(addProductLine(products)))
    // }
   

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
    const response = await fetch('http://localhost:3000/api/products/get-products')
    let products = await response.json();

    products = products.filter((item) => context.params.product === item.product_type)

    return {
        props: { 
            products 
        },
    }
}
  