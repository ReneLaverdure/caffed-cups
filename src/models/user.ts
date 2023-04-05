import { Schema, model, models } from "mongoose"
import validator from 'validator'


const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 6,
        validate(value: string){
            if(value.toLowerCase().includes('password')){
                throw new Error('Your password cannot be password')
            }
        },
        select: false
    },  
    email: {
        type: String,
        unique: true,
        required: true,
        validate(value: string){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        },
        trim: true,
        lowercase: true
    },
    role: {
        type: String,
        required: true,
        default: 'USER'
    }
})


const User = models.User || model("User", userSchema)

export default User