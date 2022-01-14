//setting view engine here for project
const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

app.engine('.hbs', exphbs({
    extname: '.hbs',
    layoutsDir: 'views/_layouts',
    partialsDir: 'views/_partials'
}));
app.set('view engine', '.hbs');

//declare middleware with routes (as controller in MVC model)

app.use('/admin',require('./routes/user.route'));
app.use('/admin',require('./routes/ndql.route'));
app.use('/admin',require('./routes/district.route'));
// async function main(){
//     const dbcv=require('./utils/dbCovid');
//     var str=`select * from "User"`
//     var rs= await dbcv.load(str);
app.use('/admin', require('./routes/sp.route'));
app.use('/admin', require('./routes/province.route'));
app.use('/admin', require('./routes/ward.route'));
app.use('/admin', require('./routes/ttndt.route'));
app.use('/admin', require('./routes/ddcl.route'));
app.use('/admin', require('./routes/package.route'));
app.use('/admin', require('./routes/product_package.route'));
app.use('/admin', require('./routes/lsmh.route'));

// async function main() {
//     const dbcv = require('./utils/dbCovid');
//     var str = `select * from "User"`
//     var rs = await dbcv.load(str);
//     console.log(rs);
// }
// main();


// default handle and do not edit here.Thank you
app.get('/', function(req, res) {
    res.render('home');
});

const PORT = 3000;
app.listen(PORT, function() {
    console.log(`Server is listened at http://localhost:${PORT}`)
})