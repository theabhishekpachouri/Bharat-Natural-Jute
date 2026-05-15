const Product = require('./product.model');
const Review = require('../reviews/review.model'); 

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Products are not fetch " });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        
        if (product) {
            // Product milne par uske reviews bhi dhoondo
            const reviews = await Review.find({ product: req.params.id }).sort({ createdAt: -1 });
            
            // Dono ko bundle karke bhejo
            res.json({ product, reviews });
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

exports.createProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        res.status(400).json({ message: "Invalid Data" });
    }
};