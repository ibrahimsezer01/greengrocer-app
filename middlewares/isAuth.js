function isAuth(req, res, next) {
    // session kontrolü
    if (!req.session.isAuth) {
        // sayfaya yönlendirme
        return res.redirect("/login?returnUrl=" + req.originalUrl);
    }
    // doğrulama sonrası middleware'e devam et
    next();
}

module.exports = isAuth;
