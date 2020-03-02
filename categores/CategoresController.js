const express = require('express');
const router = express.Router();
const Category = require("./category");
const slugify = require("slugify");
const admAuth = require("../middleweres/admmiddlewere");

//rotas get


router.get("/admin/cetegories/new", admAuth, (req, res) => {
    res.render("admin/category/new")
})



router.get("/admin/categories", admAuth, (req, res) => {
    Category.findAll().then(category => { res.render("admin/category/list", { categorys: category }); });

});



router.get("/admin/category/edit/:id", admAuth, (req, res) => {
    let id = req.params.id;
    if (isNaN(id)) {
        res.redirect("/")
    };
    Category.findByPk(id).then(categoryid => {
        if (categoryid != undefined) {
            res.render("admin/category/edit", {
                category: categoryid
            })
        } else {
            res.redirect("/")
        }
    }).catch(err => {
        res.redirect("/")
    });
});

// rotas posts

router.post("/category/editsave", admAuth, (req, res) => {
    let id = req.body.id;
    let title = req.body.title;
    Category.update({ title: title, slug: slugify(title) }, {
        where: {
            id: id
        }
    }).then(() => {
        res.redirect("/admin/categories")
    });
});

router.post("/category/delete", admAuth, (req, res) => {
    let id = req.body.id;
    if (id != undefined) {
        if (!isNaN(id)) {
            Category.destroy({
                where: {
                    id: id
                }
            }).then(() => { res.redirect("/admin/categories") });
        } else {//se n for um numero
            res.redirect("/");
        }
    } else {//se n for um NULL
        res.redirect("/");
    };
});


router.post("/category/save", admAuth, (req, res) => {
    let title = req.body.title;
    if (title != undefined) {
        Category.create({
            title: title,
            slug: slugify(title)
        }).then(() => {
            res.redirect("/admin/categories")
        }).catch((err) => {
            console.log(err)
        }
        );
    } else {
        res.redirect("/")
    }

});


module.exports = router;