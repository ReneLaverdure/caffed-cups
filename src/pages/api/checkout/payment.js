const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export default async function handler(req, res) {
    console.log(req.body)
    const amount = req.body.amount
    console.log(amount)

    const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: 'aud',
        payment_method_types: ["card"],
    })

    res.send({paymentIntent})

}