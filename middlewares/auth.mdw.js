module.exports={
    restrict:function(req,res,next){
        if(!req.session.isAuthenticated)
        {
            return res.redirect('/authentication/login');
        }
        console.log(req.session.isAdmin);
        next();
    }
}