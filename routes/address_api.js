const express = require ('express');
const router = express.Router();
const Address = require('../model/address');
const User = require('../model/user');

var mongoose = require('mongoose');

 
// add a new product to the db
router.post('/newAddress', function (req, res, next) {
    Address.create(req.body).then(function (address) {
        if (address) {
            var address_res = (new Address(req.body)).toJSON();
            address_res.status = 'success';
            console.log(address);
            res.send(address);
        } else {
            res.send({ status: 'failed' });
        }
    }).catch(next);
});

// edit a product by id in the db
router.put('/editAddress/:id', function (req, res, next) {
    Address.findByIdAndUpdate({ _id: req.params.id }, req.body).then(function () {
        Address.findOne({ _id: req.params.id }).then(function (address) {
            res.send(address);
        });
    }).catch(next);
});


// delete a address by id in the db
router.delete('/deleteAddress/:id', function (req, res, next) {
    Address.findOne({ _id: req.params.id}, function (err, docs) {
        if (err) return res.status(500).send(err);
        if (docs) {
            Address.findByIdAndRemove(req.params.id, (errs, address) => {
                if (errs) return res.status(500).send(errs);
                const response = {
                    message: "address successfully deleted",
                    id: address._id
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

// get all address of a user from the db
router.get('/getAddress/:user_id', function (req, res, next) {
    console.log(req.params.user_id);
    var objectidvariable = req.params.user_id;
    var query = { "user_id": objectidvariable };
    Address.find(query, function (err, address_res) {
        if (err) { throw err }
        res.status(200).send(address_res);
    }).catch(next);
});



module.exports = router;
