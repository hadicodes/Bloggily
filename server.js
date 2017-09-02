const mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    express = require('express'),
    app = express();

// mongoose configuration
mongoose.connect('mongodb://localhost/bloggily');
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

// Mongoose Model Config
const blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {
        type: Date,
        default: Date.now
    }
});
const Blog = mongoose.model("Blog", blogSchema);


// Blog.create({
//     title: "Smile blog",
//     image: "https://www.haskell.org/happy/Happy.gif",
//     body: "This is Happy dude who loves happiness"
// });

// Restful Routes
app.get("/", function(req, res){
    Blog.find({}, function(err, blogs){
        if (err) {
            console.log("ERROR!")
        } else {
            res.render("index", {blogs: blogs});
        }
    })
});




app.listen(process.env.PORT || 3000, function () {
    console.log('SUCCESS SERVER running on PORT')
});
