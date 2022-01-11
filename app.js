//setting view engine here for project
const express = require('express');
const exphbs  = require('express-handlebars');

const app = express();

app.engine('.hbs', exphbs({
    extname: '.hbs',
    layoutsDir:'views/_layouts',
    partialsDir:'views/_partials'
}));
app.set('view engine', '.hbs');

//

//declare middleware with routes (as controller in MVC model)

app.use('/admin',require('./routes/user.route'));

// default handle and do not edit here.Thank you
app.get('/', function (req, res) {
    res.render('home');
});

const PORT=3000;
app.listen(PORT,function()
{
    console.log(`Server is listened at http://localhost:${PORT}`)
})