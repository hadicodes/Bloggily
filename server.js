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
        type: date,
        default: Date.now
    }
});
const Blog = mongoose.model("Blog", blogSchema);

// Restful Routes

app.listen(process.env.PORT, process.env.IP, function () {
    console.log('SUCCESS SERVER running on PORT')
});


// title
// image
// body
// created