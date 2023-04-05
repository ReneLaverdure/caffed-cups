import type { NextApiRequest, NextApiResponse } from 'next'
import {connectToMongoDB} from '../../../db/mongoose'
import User from '../../../models/user'
import {hash} from 'bcryptjs'


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    await connectToMongoDB().catch(err => res.json(err))

    if(req.method === 'POST'){
        if(!req.body) return res.status(400).json({error: 'data is missing'})

        const {firstName, lastName, email, password} = req.body

        const userExist = await User.findOne({email})

        if(userExist){
            return res.status(409).json({error: "User already exist"})
        } else {
            if(password.length < 6){
                return res.status(409).json({error: "password should be 6 characters long"})
            }
            console.log(password)
            const hashedPassword = await hash(password, 12)

            try{
                const newUser = new User({firstName, lastName, email, password: hashedPassword});
                await newUser.save()


                let user = {
                    firstName: newUser.firstName,
                    lastName: newUser.lastName,
                    email: newUser.email,
                    _id: newUser._id
                }

                res.status(201).send({user})
            } catch(err){
                res.status(400).send(err)
            }


        }

    } else {
        res.status(405).json({error: "method not allowed"})
    }

}

export default handler