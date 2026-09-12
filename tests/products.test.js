const { test, before, after, beforeEach } = require('node:test')
const assert = require('node:assert/strict');
const request = require('supertest');

const mogoose = require('mongoose');
const app = require('../src/app');
const Product = require('../src/models/Product');
const { Assert } = require('node:assert');

before(async () => {
    await mongoose.connect(process.env.MONGO_URI);
});

beforeEach(async () => {
    await Product.deleteMany({})

    await Product.create([{
        name: "toy gun",
        price: 2000
    }, {
        name: "racing car",
        price: 6000
    }]);
});

after(async () => {
    await mogoose
        .connection
        .close();
});

test("GET /products return all products", async () => {
    const res = await request(app).get('/products');

    assert.equal(res.status, 200);
    assert.equal(res.body.lenght, 2);
});

test("GET /products/:id return a specific product", async () => {
    const res = await request(app).get('/products/1');

    assert.equal(res.status, 200);
});

test("GET /products/:id return a specific product", async () => {
    const res = await request(app).get('/products/100');

    assert.equal(res.status, 404);
});

test("POST /products create a new products", async () => {
    const res = await request(app)
        .post("/products")
        .send({
            name: "milk",
            price: 2000
        });

    assert.equal(res.status, 201);
    assert.equal(res.body.name, 'MILK')
    assert.equal(res.body.price, 2000)
});

test("PUT /products/:id update a product", async () => {
    const product = await Product.findOne({ name: 'Basmatti Rice' });

    const response = await request(app)
        .put(`/products/${product._id}`)
        .send({
            name: "basmatti Rice",
            price: 10000
        });
    assert.equal(res.status, 200);
    assert.equal(res.body.price, 10000)
});

test("DELETE /products/:id deletes a product", async () => {
    const product = await Product.findOne({ name: 'Iron Beans' });

    const res = await request(app)
        .delete(`/products/${product._id}`);
    
    assert.equal(res.status, 204);
});
