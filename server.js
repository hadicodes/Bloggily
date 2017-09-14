const mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    express = require('express'),
    app = express(),
    ejsLint = require('ejs-lint'),
    methodOverride = require('method-override');


// mongoose configuration
mongoose.connect('mongodb://localhost/bloggily');
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
// override with POST having ?_method=DELETE 
app.use(methodOverride('_method'));

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
app.get("/blogs/:id", function (req, res) {
    // find the campground with the provided id
    Blog.findById(req.params.id, function (err, foundBlog) {
        if (err) {
            console.log(err);
        } else {
            // render the show page for that campground
            res.render('show', {
                blog: foundBlog
            });
        }
    });
});




// EDIT ROUTE
app.get("/blogs/:id/edit", function (req, res) {
    Blog.findById(req.params.id, function (err, foundBlog) {
        if (err) {
            res.redirect("/blogs");
        } else {
            res.render("edit", {
                blog: foundBlog
            });
        }
    });
});


// Update Route
app.put("/blogs/:id", function (req, res) {
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
        if (err) {
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs/" + req.params.id);
        }
    });
});


app.delete("/blogs/:id", function(req, res){
    // destroy blog
    Blog.findByIdAndRemove(req.params.id, function(err){
        if (err) {
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs");
        }
    });
    // redirect
});




app.listen(process.env.PORT || 3000, function () {
    console.log('SUCCESS SERVER running on PORT')
});