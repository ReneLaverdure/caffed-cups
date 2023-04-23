import nextConnect from 'next-connect'
import {connectToMongoDB} from '../db/mongoose'

// import next from 'next/types';


const middleware = nextConnect();


middleware.use( async (req, res, next) => {
    await connectToMongoDB().catch(err => res.json(err))

    console.log('hello frim middle ware')
    console.log(req.body)

    next()
})

export default middleware;