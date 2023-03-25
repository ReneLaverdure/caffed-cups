import "../../../db/mongoose"
import Product from "../../../models/products"

export default async function handler(req, res) {
    // const {name, price} = req.body;
    const body = req.body;
    // console.log(body)
    const product = await Product.find()

    res.status(200).send(product)
  
}