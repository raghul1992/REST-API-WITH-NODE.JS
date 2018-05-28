const express = require('express');
const router = express.Router();
const Review = require('../model/reviews');
const User = require('../model/user');
const Product = require('../model/product');

var mongoose = require('mongoose');
var ObjectId = require('mongoose').Types.ObjectId;

// review to db

router.post('/addRating', function (req, res, next) {
    console.log('rating');
    console.log(req.body.user_id);
    console.log(req.body.product_id);
    Review.findOne({ user_id: new ObjectId(req.body.user_id), product_id: new ObjectId(req.body.product_id) }).then(function (cart_item) {
       
        if (cart_item) {
            Review.updateOne({ user_id: new ObjectId(req.body.user_id), product_id: new ObjectId(req.body.product_id) }, req.body, function (err, respons) {
                if (err) {
                    res.send({ status: 'failed' });
                } else {

                    Review.findOne({ user_id: new ObjectId(req.body.user_id), product_id: new ObjectId(req.body.product_id) }, req.body, function (err, response) {
                       
                            
                            response.status = 'success';
                            console.log(response);
                            res.send(response);
                            update_product(req.body.product_id);
                        
                    });
                   
                }
            });
        } else {
            Review.create(req.body).then(function (cart_new) {
                var cart_res = (new Review(cart_new)).toJSON();
                cart_res.status = 'success';
                console.log(cart_res);
                res.send(cart_res);
                update_product(req.body.product_id);
            });
        }
    }).catch(next);

});

//delete a review

router.delete('/deleteReview', function (req, res, next) {
    Review.findOne({ user_id: req.body.user_id, product_id: req.body.product_id }, function (err, docs) {
        if (err) return res.status(500).send(err);

        if (docs) {
           
            Review.findByIdAndRemove(docs._id, (errs, address) => {
                if (errs) return res.status(500).send(errs);
                update_product(req.body.product_id);
                const response = {
                    message: "Review successfully deleted"

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


// get all review

router.get('/getReview/:id', function (req, res, next) {
    console.log('get review');
    console.log(req.params.id);
    Review.find({ product_id: req.params.id })
    .populate('product.name')
    .exec(
        function (err, carts) {
            if (err) return res.status(500).send(err);
            if (carts) {
                    res.send(carts);
    
            } else {
                const response = {
                    message: "no reviews"
                };
                return res.status(500).send(response);
            }
        });
});


function update_product(id){
    Review.find({ product_id: id }, function (err, wishes) {
        if (err) return res.status(500).send(err);
        if (wishes) {
            var ids = wishes.map(function (doc) { return doc.rating; });
            var sum = 0;
            for( var i = 0; i < ids.length; i++ ){
                sum += parseInt( ids[i], 10 ); 
            }
            var avg = sum/ids.length;
            console.log(avg);
            var count = ids.length;
            var myquery = { _id: id};
            Product.updateOne(myquery,  {$set: {"average_rating": avg,"review_count": count}},function(err,response){
                if (err) {
                    res.send({ status: 'failed' });
                } else {
                    console.log(response);
                }
            });
        } 
    });
}

module.exports = router;
