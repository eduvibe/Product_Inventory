// routes/products.js
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Create a new product
router.post('/', async (req, res) => {
    console.log('POST /products - Body:', req.body);
    try {
        const product = new Product(req.body);
        await product.save();
        console.log('Product saved:', product);
        res.status(201).send(product);
    } catch (error) {
        console.error('Error saving product:', error);
        res.status(400).send(error);
    }
});

// Get all products
router.get('/', async (req, res) => {
    console.log('GET /products');
    try {
        const products = await Product.find();
        console.log('Products retrieved:', products);
        res.status(200).send(products);
    } catch (error) {
        console.error('Error retrieving products:', error);
        res.status(500).send(error);
    }
});

// Get a product by ID
router.get('/:id', async (req, res) => {
    console.log(`GET /products/${req.params.id}`);
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            console.log('Product not found');
            return res.status(404).send();
        }
        console.log('Product retrieved:', product);
        res.status(200).send(product);
    } catch (error) {
        console.error('Error retrieving product:', error);
        res.status(500).send(error);
    }
});

// Update a product by ID
router.patch('/:id', async (req, res) => {
    console.log(`PATCH /products/${req.params.id} - Body:`, req.body);
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!product) {
            console.log('Product not found');
            return res.status(404).send();
        }
        console.log('Product updated:', product);
        res.status(200).send(product);
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(400).send(error);
    }
});

// Delete a product by ID
router.delete('/:id', async (req, res) => {
    console.log(`DELETE /products/${req.params.id}`);
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            console.log('Product not found');
            return res.status(404).send();
        }
        console.log('Product deleted:', product);
        res.status(200).send(product);
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).send(error);
    }
});

module.exports = router;
