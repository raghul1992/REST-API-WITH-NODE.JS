const express = require ('express');
const router = express.Router();
const User = require('../model/user');


// add a new user to the db
router.post('/register', function(req, res,next){

    if (req.body.password) {
        User.create(req.body).then(function (user) {
            var user_res = (new User(req.body)).toJSON();
            user_res.status = 'success';
            console.log(user_res);
            res.send(user_res);
        }).catch(next);

    } else {
        res.send({ status: 'failed, password cannot be empty'});
    }

});



// google process
router.post('/googleLogin', function (req, res, next) {
    User.findOne({ email: req.body.email }).then(function (user) {
        if (user) {
            var login_res = (user).toJSON();
            login_res.status = 'success';
            console.log(login_res);
            res.send(login_res);
        }
        else {
            User.create(req.body).then(function (user) {
                var user_res = (new User(req.body)).toJSON();
                user_res.status = 'success';
                console.log(user_res);
                res.send(user_res);
            }).catch(next);
        }
    }).catch(next);

});


// login
router.post('/login', function (req, res, next) {
    console.log('login');
    console.log(req.body.password);
    console.log(req.body.email);
    User.findOne({ email: req.body.email }).then(function (user) {

        if (user) {
            if (req.body.password == user.password) {
                var login_res = (user).toJSON();
                login_res.status = 'success';
                console.log(login_res);
                res.send(login_res);
            }
            else {
                res.send({ status: 'failed, wrong password' })
            }
        } else {
            res.send({ status: 'failed, email doesn\'t exist please register' })
        }
        
    }).catch(next);

});
 

// update a user in the db
router.put('/editProfile', function (req, res, next) {
    console.log('edit profile');
    User.findOne({ email: req.body.email }).then(function (user) {
        if (req.body.password == user.password) {
            var myquery = { email: req.body.email };
            User.updateOne(myquery, req.body, function (err, response) {
                if (err) {
                    res.send({ status: 'failed' });
                } else {
                    console.log(response);
                    res.send({ status: 'success' });
                    //var edit_res = (user).toJSON();
                    //edit_res.status = 'success';
                    //console.log(edit_res);
                    //res.send(edit_res);

                }
            }).catch(next);
        }
        else {
            res.send({ status: 'failed , wrong password' })
        }
    });

});


// update password
router.put('/changePassword', function (req, res, next) {

    User.findOne({ email: req.body.email }).then(function (user) {
        if (req.body.oldPassword == user.password) {
            var myquery = { email: req.body.email };
            var newvalues = { $set: { password: req.body.newPassword,  } };
            User.updateOne(myquery, newvalues, function (err, response) {
                if (err) {
                    res.send({ status: 'failed' });
                } else {
                    console.log(response);
                    res.send({ status: 'success' });
                }
            }).catch(next);
        }
        else {
            res.send({ status: 'failed ,old wrong password' })
        }
    });

});


// delete a user from the db
router.delete('/user/:id', function (req, res, next) {
    User.updateOne({ _id: req.params.id }).then(function (user) {
  res.send(user);
});
//    res.send({type: 'DELETE'});
  //  console.log(req.params.id);

});

module.exports = router;
