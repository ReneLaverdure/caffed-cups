export default async function handler(req, res) {
    // const {name, price} = req.body;

    // const product = await Product.create(req.body)

    // res.status(200).send(product)
    res.status(200).json({test: "working"})
}