function admAuth(req, res, next) {
    if (req.session.admuser != undefined) {

        next();
    } else {
        res.redirect("/");
    }
};

module.exports = admAuth;