import mongoose, { Schema, model, models } from "mongoose";

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true
    },
    product_type: {
        type: String,
        required: true
    },
    types: {
        type: mongoose.SchemaTypes.Mixed,
        required: true
    }
})

const Product = models.Product || model('Product', productSchema);
export default Product;