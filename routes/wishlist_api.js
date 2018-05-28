const express = require ('express');
const router = express.Router();
const Wishlist = require('../model/wishlist');
const User = require('../model/user');
const Product = require('../model/product');

var mongoose = require('mongoose');
var ObjectId = require('mongoose').Types.ObjectId;
 
// wish to db

router.post('/addToWishlist', function (req, res, next) {
    console.log('wishlist');
    console.log(req.body.user_id);
    console.log(req.body.product_id);
    Wishlist.findOne({ user_id: new ObjectId(req.body.user_id), product_id: new ObjectId(req.body.product_id) }).then(function (wish_item) {

        if (wish_item) {
            Wishlist.find({ user_id: wish_item.user_id }, function (err, wishes) {
                if (err) return res.status(500).send(err);
                if (wishes) {
                    var ids = wishes.map(function (doc) { return doc.product_id; });
                    console.log(ids);
                    res.send(ids);
                } else {
                    const response = {
                        message: "empty wishlist"
                    };
                    return res.status(500).send(response);
                }
            });
        } else {
            Wishlist.create(req.body).then(function (wish_new) {

                Wishlist.find({ user_id: wish_new.user_id }, function (err, wishes) {
                    if (err) return res.status(500).send(err);
                    if (wishes) {
                        var ids = wishes.map(function (doc) { return doc.product_id; });
                        console.log(ids);
                        res.send(ids);
                    } else {
                        const response = {
                            message: "empty wishlist"
                        };
                        return res.status(500).send(response);
                    }
                });

            });
        }
    }).catch(next);

});

// delete a wish

router.delete('/deleteFromWishlist', function (req, res, next) {
    Wishlist.findOne({ user_id: req.body.user_id, product_id: req.body.product_id }, function (err, docs) {
        if (err) return res.status(500).send(err);
        if (docs) {
            Wishlist.findByIdAndRemove(docs._id, (errs, address) => {
                Wishlist.find({ user_id: address.user_id }, function (err, wishes) {
                    if (err) return res.status(500).send(err);
                    if (wishes) {
                        var ids = wishes.map(function (doc) { return doc.product_id; });
                        console.log(ids);
                        res.send(ids);
                    } else {
                        const response = {
                            message: "empty wishlist"
                        };
                        return res.status(500).send(response);
                    }
                });
            });
        } else {
            const response = {
                message: "failed, id provided doesnot exist."
            };
            return res.status(500).send(response);
        }
    });

});


// get all wishes

router.get('/getWishlist/:id', function (req, res, next) {
    console.log('get wishlist');
    console.log(req.params.id);
    Wishlist.find({ user_id: req.params.id }, function (err, wishes) {
        if (err) return res.status(500).send(err);
        if (wishes) {
            var ids = wishes.map(function (doc) { return doc.product_id; }); 
                console.log(ids);
                res.send(ids);
        } else {
            const response = {
                message: "empty wishlist"
            };
            return res.status(500).send(response);
        }
    });

});


// get all wishlist

router.get('/getAllWishlistDetails/:id', function (req, res, next) {
    console.log('get wishlist');
    console.log(req.params.id);
    Wishlist.find({ user_id: req.params.id }, function (err, carts) {
        if (err) return res.status(500).send(err);
        if (carts) {
            var ids = carts.map(function (doc) { return doc.product_id; });
            console.log(ids);
            console.log(ids)
            Product.find({ '_id': { $in: ids } }, function (err, docs) {
                res.send(docs);
            });
            
        } else {
            const response = {
                message: "empty wishlist"
            };
            return res.status(500).send(response);
        }
    });

});




module.exports = router;