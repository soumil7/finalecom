import express from 'express';
import multer from 'multer';
import {
    addProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    searchProducts
} from '../Controller/ItemsController.js';

const itemsRouter = express.Router();

// Multer configuration to handle image uploads
const storage = multer.diskStorage({
    destination: "uploads", // Save files in the 'uploads' directory
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

// Route to create a new product with an image upload
itemsRouter.post('/items', upload.single("image"), addProduct);

// Route to get all products
itemsRouter.get('/items', getProducts);

// Route to get a single product by ID
itemsRouter.get('/items/:id', getProductById);

// Route to update a product by ID
itemsRouter.put('/items/:id', upload.single("image"), updateProduct);

// Route to delete a product by ID
itemsRouter.delete('/items/:id', deleteProduct);

// Route to search for products based on a query
itemsRouter.get('/items/search/:query', searchProducts);


export default itemsRouter;
