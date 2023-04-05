import { Schema, model, models } from "mongoose"
import validator from 'validator'


const userSchema = new Schema({
    name: {
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
        }
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
})


const User = models.User || model("User", userSchema)

export default User