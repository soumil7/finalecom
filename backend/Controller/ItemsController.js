import ProductModel from '../Model/ItemsModel.js';
import fs from 'fs';
import path from 'path';

// Create a new product
export const addProduct = async (req, res) => {
    let image_filename = req.file ? req.file.filename : null;

    const newProduct = new ProductModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        product: req.body.product,
        image: image_filename // Store the filename in the database
    });

    try {
        await newProduct.save();
        res.status(201).json({ success: true, message: 'Product added successfully', data: newProduct });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error while adding product", error: error.message });
    }
};

// Get all products
export const getProducts = async (req, res) => {
    try {
        const products = await ProductModel.find();
        const modifiedProducts = products.map((product) => ({
            ...product.toObject(),
            image: product.image ? `${req.protocol}://${req.get('host')}/uploads/${product.image}` : '', // Form the image URL
        }));

        res.status(200).json({ success: true, data: modifiedProducts });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error while fetching products', error: error.message });
    }
};

// Get a single product by ID
export const getProductById = async (req, res) => {
    try {
        const product = await ProductModel.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        // Update the image path
        product.image = product.image ? `${req.protocol}://${req.get('host')}/uploads/${product.image}` : '';

        res.status(200).json({ success: true, data: product });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error while fetching product', error: error.message });
    }
};

// Update a product by ID
export const updateProduct = async (req, res) => {
    try {
        const { name, description, price, productCategory } = req.body;
        const image = req.file ? req.file.filename : null;

        const updatedData = {
            ...(name && { name }),
            ...(description && { description }),
            ...(price && { price }),
            ...(productCategory && { product: productCategory }),
            ...(image && { image }) // Update image only if a new one is provided
        };

        const updatedProduct = await ProductModel.findByIdAndUpdate(req.params.id, updatedData, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        res.status(200).json({ success: true, message: 'Product updated successfully', data: updatedProduct });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error while updating product', error: error.message });
    }
};

// Delete a product by ID
export const deleteProduct = async (req, res) => {
    try {
        const product = await ProductModel.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        // Delete the image file if it exists
        if (product.image) {
            const imagePath = path.join(__dirname, '../uploads', product.image);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        res.status(200).json({ success: true, message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error while deleting product', error: error.message });
    }
};

// Search products by name or description (case-insensitive)
export const searchProducts = async (req, res) => {
    try {
        const { query } = req.params;
        const products = await ProductModel.find({
            $or: [
                { name: { $regex: query, $options: "i" } }, // 'i' for case-insensitive
                { description: { $regex: query, $options: "i" } }
            ]
        });

        const modifiedProducts = products.map((product) => ({
            ...product.toObject(),
            image: product.image ? `${req.protocol}://${req.get('host')}/uploads/${product.image}` : '',
        }));

        res.status(200).json({ success: true, data: modifiedProducts });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error while searching products', error: error.message });
    }
};

