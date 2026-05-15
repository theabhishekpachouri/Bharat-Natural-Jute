const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');


const authRoutes = require('./modules/auth/auth.routes');
const productRoutes = require('./modules/products/product.routes');
const orderRoutes = require('./modules/orders/order.routes');
const reviewRoutes = require('./modules/reviews/review.routes');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);      
app.use('/api/products', productRoutes); 
app.use('/api/orders', orderRoutes);     
app.use('/api/reviews', reviewRoutes);  

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`System is Live on Port ${PORT}`));