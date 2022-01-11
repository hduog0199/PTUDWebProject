var express = require('express');
var exphbs  = require('express-handlebars');

var app = express();

app.engine('.hbs', exphbs({
    extname: '.hbs',
    layoutsDir:'views/_layouts',
    partialsDir:'views/_partials'
}));
app.set('view engine', '.hbs');

app.get('/', function (req, res) {
    res.render('home');
});

const PORT=3000;
app.listen(PORT,function()
{
    console.log(`Server is listened at http://localhost:${PORT}`)
})