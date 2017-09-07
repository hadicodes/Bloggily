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

//****** RESTFUL ROUTES********
//*****************************
// INDEX ROUTE
app.get("/", function (req, res) {
    res.redirect("/blogs");
});

// INDEX ROUTE
app.get("/blogs", function (req, res) {
    Blog.find({}, function (err, blogs) {
        if (err) {
            console.log("ERROR!")
        } else {
            res.render("index", {
                blogs: blogs
            });
        }
    })
});

// NEW ROUTE
app.get('/blogs/new', function (req, res) {
    res.render("new");
});

// CREATE ROUTE
app.post("/blogs", function (req, res) {
    // create blog
    Blog.create(req.body.blog, function (err, newBlog) {
        if (err) {
            res.render("new");
        } else {
            // Then redirect to index
            res.redirect("/blogs");
        }
    });
});

// SHOW ROUTE
app.get("/blogs/:id", function(req, res){
    res.send("show page");
});

app.listen(process.env.PORT || 3000, function () {
    console.log('SUCCESS SERVER running on PORT')
});