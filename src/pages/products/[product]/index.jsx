import { useState, useEffect, useRef } from 'react'
import ProductCard from '../../../components/ProductCard/ProductCard'

import TypesSection from '../../../components/TypesSection/TypesSection'
import { useRouter } from 'next/router'


//db imports
import {connectToMongoDB} from '../../../db/mongoose'
import Product from '../../../models/products'

export default function ProductPage({products}) {
    const router = useRouter()
    let currentPage = router.asPath

    const didMount = useRef(false)

    const [productsList, setProductsList] = useState([...products])

    const [sortedProducts, setSortedProducts] = useState([...products])
    const [typeItems, setTypeItems] = useState([])
    const [activeTypes, setActiveTypes] = useState([])


    const handleTypes= (e) => {
        if(!activeTypes.includes(e.target.value)){
            setActiveTypes([...activeTypes, e.target.value])
        } else {
            let temp = [...activeTypes]
            let index = temp.indexOf(e.target.value)

            if(index !== -1){
                temp.splice(index, 1)
                setActiveTypes([...temp])
            }
        }
 
    }

    const handleFilter = () => {
        let tempSortedProducts = [...productsList]
        let tempActive = [...activeTypes]

        tempSortedProducts.map((item) => {            
            item.types = Object.entries(item.types).map(([key, value]) => value)
        })

        let newProducts = tempSortedProducts.filter((item) => {
            return tempActive.every(r => item.types.includes(r))
        })

        setSortedProducts([...newProducts])
    }

    //set unquies types 
    const checkedTypes = () => {
        let tempList = [...products]
        let typesObj = {}
        
        tempList.map((item) => {
            for(const key in item.types){
                if(typesObj[key] === undefined){
                    typesObj[key] = [item.types[key]]
                } else {
                    typesObj[key].push(item.types[key])
                }
            }
        })

        for(const key in typesObj){
            typesObj[key] = [...new Set(typesObj[key])]
        }

        typesObj = Object.entries(typesObj).map(([key, value]) => ({key, value}))

        setTypeItems([...typesObj])
    }


    useEffect(() => {
        checkedTypes()
        setProductsList([...products])
        setSortedProducts([...products])

    }, [currentPage])

    useEffect(() => {
        //stop from running on first render
        if(!didMount.current){
            didMount.current = true;
            return
        }

        handleFilter()
    }, [activeTypes])



     if (typeof products === "undefined"){
    return "Loading..."
    } 



    return (
        <>  
            <div className='ProductContainer'>
                <div>
                    {
                        typeItems.map((type) => {
                            return <TypesSection key={type.key} title={type.key} items={type.value}  handleTypes={handleTypes} />
                        })
                    }
                </div>
                <div className='ProductGrid'>
                    {
                        sortedProducts.map((item) => {
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

    await connectToMongoDB().catch(err => res.json(err))

    let products = await Product.find({product_type: context.params.product})
    products = JSON.stringify(products)
    products = JSON.parse(products)

    return {
        props: { 
            products 
        },
    }
}
  