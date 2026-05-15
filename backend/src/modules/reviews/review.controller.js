const Review = require('./review.model');
const Product = require('../products/product.model');

exports.addReview = async (req, res) => {
    const { rating, comment, productId } = req.body;
    
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const review = await Review.create({
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
        product: productId
    });

    const reviews = await Review.find({ product: productId });
    product.numReviews = reviews.length;
    product.rating = reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;
    await product.save();

    res.status(201).json(review);
};

exports.getProductReviews = async (req, res) => {
    const reviews = await Review.find({ product: req.params.productId })
        .populate('user', 'name avatar') 
        .sort({ createdAt: -1 });
    
    res.json(reviews);
};