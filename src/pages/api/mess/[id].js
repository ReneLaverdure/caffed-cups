import nextConnect from 'next-connect'
import middleware from '../../../middlewares/createConnection'
const handler = nextConnect();

handler.use(middleware)

handler.get((req, res) => {

//    console.log(req.body)

    res.send('mess ')
})

export default handler;