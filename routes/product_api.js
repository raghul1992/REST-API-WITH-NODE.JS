const express = require ('express');
const router = express.Router();
const mongoose = require("mongoose");
const Product = require('../model/product');
const Category = require('../model/category');
const Brand = require('../model/brand');

// add a new product to the db

router.post('/newProduct', function (req, res, next) {

const p = new Product( req.body);

    Product.create(p ).then(function (product) {
        if (product) {
            var product_res = (new Product(product)).toJSON();
            product_res.status = 'success';
            console.log(product_res);
            res.send(product_res);
        } else {
            res.send({ status: 'failed' });
        }
    }).catch(next);
});

// add a new category to the db
router.post('/newCategory', function(req, res,next){
    console.log('new category');
    console.log(req.body);
    Category.create(req.body).then(function (category) {
        if (category) {
            var category_res = (new Category(req.body)).toJSON();
            category_res.status = 'success';
            console.log(category_res);
            res.send(category_res);
        } else {
            res.send({ status:'failed'});
        }
}).catch(next);
});


// add a new brand to the db
router.post('/newBrand', function (req, res, next) {
    
    Brand.create(req.body).then(function (brand) {
        if (brand) {
            var brand_res = (new Brand(req.body)).toJSON();
            brand_res.status = 'success';
            console.log(brand_res);
            res.send(brand_res);
        } else {
            res.send({ status: 'failed' });
        }
    }).catch(next);
});



// get all brand from the db
router.get('/brands', function (req, res, next) {
    Brand.find(null, function (err, brands) {
        if (err) { throw err }
        res.status(200).send(brands);
    }).catch(next);
});

// get all categories from the db
router.get('/categories', function (req, res, next) {
    Category.find(null, function (err, categories) {
        if (err) { throw err }
        res.status(200).send(categories);
    }).catch(next);
});


// get all products from the db
router.get('/products', function (req, res, next) {
    Product.find(null, function (err, products) {
        if (err) { throw err }
        res.status(200).send(products);
    }).catch(next);
});

// get all product of a category from the db
router.get('/products/:category_id', function (req, res, next) {
    console.log(req.params.category_id);
    var objectidvariable = req.params.category_id;
    var query = { "category_id": objectidvariable };
    Product.find(query, function (err, product_res) {
        if (err) { throw err }
        res.status(200).send(product_res);
    }).catch(next);
});



router.get('/search/:keyword', function (req, res, next) {
    
    var objectidvariable = req.params.keyword;

    console.log(objectidvariable);
    var query = {$or: [
        { "name": { "$regex": objectidvariable, "$options": "i" } },
        { "description": { "$regex": objectidvariable, "$options": "i" } },
        { "short_description": { "$regex": objectidvariable, "$options": "i" } }
    ]};
    
    var name_query = { "name": { "$regex": objectidvariable, "$options": "i" } };
    
    Product.find(query, function (err, product_res) {
       
        Brand.find(name_query, function (err, brand_res) {
           
            Category.find(name_query, function (err, cat_res) {

                res.status(200).send({products : product_res, brands : brand_res, categories : cat_res});         
            
            }).catch(next);
        }).catch(next);
    }).catch(next);
});

module.exports = router;
