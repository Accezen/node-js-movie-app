const express = require("express");
const router = express.Router();
const fs = require("fs");
const multer = require('multer');
const mainController = require("../controllers/mainController");
const path = require('path');

// where to store the image
const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, __dirname + "/" + "../public/images")
    },
    filename:(req, file, cb) => {
        console.log(file)
        cb(null, Date.now() + path.extname(file.originalname))
    }
});

// Upload middleware
const upload = multer({storage: storage});


// view all movies from the json file 
router.get('/', async(req, res) =>{
    fs.readFile(__dirname + "/" + "../movies.json", 'utf8', function(err, data){
        res.render("index", {data});
    });
});

//route that calls the vewDetails function from the controllers
router.get('/index/:id', mainController.viewDetails);

//route that calls the deleteMovie function from the controllers
router.get('/delete/:id', mainController.deleteMovie);

router.post('/add', upload.single('movie_image'),mainController.addMovie);

// route that calls the renderData function
router.get('/edit/:id', mainController.renderData);

router.post('/update/:id',upload.single('image'), mainController.updateData);

//execute when page trying to accesed is not available on routes
router.use((req, res) => {
    res.render("404", { title : "404 | Page not Found"})
});

module.exports = router;