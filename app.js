//setting view engine here for project
const express = require('express');
const exphbs = require('express-handlebars');
const express_handlebars_sections = require('express-handlebars-sections');
const session = require('express-session')
require('express-async-errors')
const app = express();

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { 

  }
}))

app.engine('.hbs', exphbs({
    extname: '.hbs',
    layoutsDir: 'views/_layouts',
    partialsDir: 'views/_partials',
    helpers: {
        section: express_handlebars_sections()
    }
}));
app.set('view engine', '.hbs');
app.use(express.urlencoded({extended:true}));
app.use('/public',express.static('public'));
//
app.use(async function(req,res,next){
    if(!req.session.isAuthenticated)
    {
        res.locals.lcIsAuthenticated=false;
    }
    else{
        res.locals.lcIsAuthenticated=true;
        res.locals.lcAuthUser=req.session.authUser;
        res.locals.isAdmin=req.session.authUser.Permission===2;
        res.locals.isManager=req.session.authUser.Permission===1;
        res.locals.isEndUser=req.session.authUser.Permission===0;
    }
    next();
});
//declare middleware with routes (as controller in MVC model)

app.use('/authentication', require('./routes/auth.private.route'));
//1.Chức năng cho admin:
app.use('/admin', require('./routes/user.admin.route'));
//2.Chức năng cho người quản lí
// app.use('/quanli',require('./routes/ndql.quanli.route'));
//3.Chức năng cho người được quản lí - user
// app.use('/admin', require('./routes/user.route'));
app.use('/admin', require('./routes/ndql.route'));
app.use('/admin', require('./routes/province.route'));
app.use('/admin', require('./routes/district.route'));
app.use('/admin', require('./routes/ward.route'));
app.use('/admin', require('./routes/sp.route'));
app.use('/admin', require('./routes/ttndt.route'));
app.use('/admin', require('./routes/ddcl.route'));
app.use('/admin', require('./routes/package.route'));
app.use('/admin', require('./routes/product_package.route'));
app.use('/admin', require('./routes/lsmh.route'));
//----------------------------------------------------------------------------------
// Below is default handle and do not edit here.Thank you
app.get('/', function(req, res) {
    res.render('home');
});
//default error handler
app.use(function(req,res)
{
    res.render('404',{
        layout:false
    })
}); 
//default async error handler
app.use(function errorHandler (err, req, res, next) {
    
    console.log(err);
    res.render('500',{
        layout:false
    })
  });
//
const PORT = 3000;
app.listen(PORT, function() {
    console.log(`Server is listened at http://localhost:${PORT}`)
});