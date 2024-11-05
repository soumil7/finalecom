import mongoose from 'mongoose';

// Define the schema for the eCommerce products
const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    product: {
        type: String,
    },
    image: {
        type: String, // Stores the filename of the uploaded image
    }
}, {
    timestamps: true // Adds createdAt and updatedAt fields
});

// Create the model using the schema
const ProductModel = mongoose.model('Product', ProductSchema);

export default ProductModel;
