const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: [true, "Product name is required"], 
        trim: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    price: { 
        type: Number, 
        required: true, 
        default: 0 
    },
    category: { 
        type: String, 
        required: true,
        enum: ['Backpacks', 'Hand-Painted Bags', 'Pouches', 'Totes'] 
    },
    images: [{ 
        type: String, 
        required: true 
    }], 
    stock: { 
        type: Number, 
        required: true, 
        default: 0 
    },
    isPersonalizable: { 
        type: Boolean, 
        default: false 
    }, 
    rating: { 
        type: Number, 
        default: 0 
    },
    numReviews: { 
        type: Number, 
        default: 0 
    }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);