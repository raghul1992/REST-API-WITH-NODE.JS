const express = require('express');
const router = express.Router();
const Image = require('../model/image');
var multer = require('multer');


const Storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./Images");
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});
var imageFilter = function (req, file, cb) {
    // accept image files only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};


const upload = multer({ storage: Storage, fileFilter: imageFilter }); //Field name 


router.get("/", function (req, res) {
    res.sendFile("C:/Users/Rahul/Documents/rest-api-ecart/index.html");
});


router.post("/Upload", upload.single('image'),function (req, res) {
    console.log(req.file);
   
    response = {
        message: 'File uploaded successfully',
        filename: req.file.path
   };

   res.send(response);



});


module.exports = router;
