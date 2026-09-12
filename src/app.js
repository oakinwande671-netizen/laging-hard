const express = require('express');
const Product = require('./models/Product');

const app = express();
app.use(express.json());

// fetch all products
app.get('/products', async (req, res) => {
    try {
        const products = await Product.find();

        res.status(200).json(products);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error");
    }
});

// fetch a single product by id
app.get('/products/:id', async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);

      if (!product) {
        return res.status(404).send("Product not found");
      }

      res.status(200).json(product);
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal server error");
    }
});

// make a new product
app.post('/products', async (req, res) => {
    const { name, price } = req.body;

    if (!name || !price) {
        return res.status(400).send("Bad request");
    }

    try {
        const product = await Product.create({
            name, price
        });
    
        res.status(201).json(product)
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error");
    }
});

// update a product
app.put('/products/:id', async (req, res) => {
    const { name, price } = req.body;

    if (!name || !price) {
      return res.status(400).send("Bad request");
    }

    try {
        const product = await Product.findByIdAndUpdate(req.params.id, {
            name, 
            price
        },
        {
            new: true,
        });

        if (!product) {
            return res.status(404).send("Product not found")
        }

        res.status(200).json(product)
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error");
    }
});

// delete a product
app.delete("/products/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
        return res.status(404).send("Product not found")
    }

    res.status(204).send()

    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
});

module.exports = app;