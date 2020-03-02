const express = require("express");
const router = express.Router();
const User = require("./user");
const bcrypt = require('bcryptjs');
const { check, validationResult } = require("express-validator");
const admAuth = require("../middleweres/admmiddlewere");





router.get("/adim/users", (req, res) => {
    res.render()
})


router.get("/adim/users/create", (req, res) => {

    res.render("admin/user/create")
})

router.get("/admin-login", (req, res) => {
    res.render("admin/user/login")
})

router.get("/logout/adm", admAuth, (req, res) => {
    req.session.admuser = undefined;
    res.redirect("/admin-login")
})

//post
router.post("/createuser/save", [
    check("email").isEmail(),
    check("password").isLength({ min: 5, max: 16 })
], (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    const erros = validationResult(req);

    if (!erros.isEmpty()) {
        return res.status(422).json({ errors: erros.array() });

    }
    else {
        User.findOne({
            where: { email: email }
        }).then(user => {
            if (user == undefined) {
                let salt = bcrypt.genSaltSync(10);
                let hash = bcrypt.hashSync(password, salt)

                User.create({
                    email: email,
                    password: hash
                }).then(() => {

                    res.redirect("/");
                }).catch(() => {
                    res.redirect("/")
                })

            } else {
                res.redirect("/adim/users/create")
            }
        })

    }



})

router.post("/adm-login/login", [check("email").isEmail(), check("password").isLength({ min: 5, max: 16 })],
    (req, res) => {
        let email = req.body.email;
        let password = req.body.password;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.redirect("/")
        } else {
            User.findOne({
                where: {
                    email: email
                }
            }).then(user => {
                if (user != undefined) {
                    const autenticando = bcrypt.compareSync(password, user.password);
                    if (autenticando) {

                        req.session.admuser = {
                            id: user.id,
                            email: user.email
                        }
                        res.redirect("/home/adm");


                    } else {
                        res.redirect("/adm-login")
                    }
                } else {
                    res.redirect("/adm-login")
                }
            })

        }

    })







module.exports = router;