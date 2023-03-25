import "../../../db/mongoose"
import Product from "../../../models/products"

export default async function handler(req, res) {
    // const {name, price} = req.body;
    const {productid} = req.query;
    console.log(productid)
    const product = await Product.find({_id: productid})

    res.status(200).send(product)
  
}