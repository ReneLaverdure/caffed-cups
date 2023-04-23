import nextConnect from 'next-connect'
import middleware from '../../../middlewares/createConnection'
import Product from '../../../models/products'

const handler = nextConnect();

handler.use(middleware)

handler.get(async (req, res) => {

    let product = await Product.find() 
   console.log(product)

    res.send('hello')
})

export default handler;