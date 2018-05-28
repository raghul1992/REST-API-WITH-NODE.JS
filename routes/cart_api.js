const express = require ('express');
const router = express.Router();
const Cart = require('../model/cart');
const User = require('../model/user');
const Product = require('../model/product');

var mongoose = require('mongoose');
var ObjectId = require('mongoose').Types.ObjectId;
 
// cart to db

router.post('/addToCart', function (req, res, next) {
    console.log('cart');
    console.log(req.body.user_id);
    console.log(req.body.product_id);
    Cart.findOne({ user_id: new ObjectId(req.body.user_id), product_id: new ObjectId(req.body.product_id) }).then(function (cart_item) {

        if (cart_item) {
            Cart.findOneAndUpdate({ user_id: new ObjectId(req.body.user_id), product_id: new ObjectId(req.body.product_id) }, req.body, function (err, place) {
               
                var cart_res = (new Cart(req.body)).toJSON();
                cart_res.status = 'success';
                console.log(cart_res);
                res.send(cart_res);
              });
        } else {
            Cart.create(req.body).then(function (cart_new) {
                var cart_res = (new Cart(cart_new)).toJSON();
                cart_res.status = 'success';
                console.log(cart_res);
                res.send(cart_res);
            });
        }
    }).catch(next);

});

// delete a cart

router.delete('/deleteFromCart', function (req, res, next) {
    Cart.findOne({ user_id: req.body.user_id, product_id: req.body.product_id }, function (err, docs) {
        if (err) return res.status(500).send(err);
        if (docs) {
            Cart.findByIdAndRemove(docs._id, (errs, address) => {
                if (errs) return res.status(500).send(errs);
                const response = {
                    message: "Cart successfully deleted"
                   
                };
                return res.status(200).send(response);
            });
        } else {
            const response = {
                message: "failed, id provided doesnot exist."
            };
            return res.status(500).send(response);
        }
    });

});


// get all cart

router.get('/getCart/:id', function (req, res, next) {
    console.log('get cart');
    console.log(req.params.id);

    Cart.find({ user_id: req.params.id }).populate({ path: 'product_id', model: Product }).exec(function (err, carts) {
        if (err) return res.status(500).send(err);
        if (carts) {
            res.send(carts);
            // var ids = carts.map(function (doc) { return doc.product_id; });
            // console.log(ids)
            // Product.find({ '_id': { $in: ids } }, function (err, docs) {
            //     res.send(docs);
            // });

        } else {
            const response = {
                message: "empty cart"
            };
            return res.status(500).send(response);
        }
    });
});

module.exports = router;
