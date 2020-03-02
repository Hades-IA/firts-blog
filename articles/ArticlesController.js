const express = require('express');
const router = express.Router();
const Category = require("../categores/category");
const Article = require("./Article");
const slugify = require("slugify");
const admAuth = require("../middleweres/admmiddlewere");
//get
router.get("/adm/articles", admAuth, (req, res) => {
    Article.findAll({
        order: [['id', 'DESC']],
        include: [{ model: Category }]
    }).then(articles => {
        res.render("admin/article/list", {
            article: articles
        })
    })

});

router.get("/adm/articles/new", admAuth, (req, res) => {
    Category.findAll().then(categories => {
        res.render("admin/article/new", {
            category: categories
        })
    })

});


router.get("/admin/article/edit/:id", admAuth, (req, res) => {
    let id = req.params.id
    if (id == undefined) {
        res.redirect("/");

    }


    if (id != undefined && !isNaN(id)) {
        Category.findAll().then(category => {
            Article.findByPk(id).then(articleid => {
                if (articleid != undefined) {
                    res.render("admin/article/edit", {
                        article: articleid,
                        category: category
                    })
                }
            })
        });

    } else {//se n for um NULL
        res.redirect("/");

    };


});

router.get("/articles/page/:num", (req, res) => {
    let page = req.params.num;
    let offset;
    let limit = 5;
    if (isNaN(page) || page == undefined) {
        res.redirect("/")
    } else {
        offset = parseInt(page) * limit
    }
    Article.findAndCountAll({
        limit: limit,
        offset: offset,
        order: [["id", "DESC"]]
    }).then(articles => {
        let next;
        if (offset + limit >= articles.count) {
            next = false
        } else {
            next = true
        }
        let count = articles.count;

        let tamanho = (count / limit) * -1;
        let result = {
            articles: articles,
            next: next,
            page: parseInt(page),
            pagesNum: tamanho

        }
        res.render("admin/article/page", {
            result: result,
        });
    }).catch(() => {
        res.redirect("/")
    })
});



//post

router.post("/article/save", admAuth, (req, res) => {
    let title = req.body.title;
    let body = req.body.body;
    let category = req.body.categories;

    Article.create({
        title: title,
        slug: slugify(title),
        body: body,
        categoryId: category
    }).then(() => {
        res.redirect("/adm/articles")
    })
})



router.post("/article/delete", admAuth, (req, res) => {
    let id = req.body.id;
    if (id != undefined) {
        if (!isNaN(id)) {
            Article.destroy({
                where: {
                    id: id
                }
            }).then(() => { res.redirect("/adm/articles") });
        } else {//se n for um numero
            res.redirect("/");
        }
    } else {//se n for um NULL
        res.redirect("/");
    };
});


router.post("/article/editsave", admAuth, (req, res) => {
    let id = req.body.id;
    let title = req.body.title;
    let body = req.body.body;
    let categoryId = req.body.categories;
    Article.update({ title: title, slug: slugify(title), body: body, categoryId: categoryId }, {
        where: {
            id: id
        }
    }).then(() => {
        res.redirect("/adm/articles")
    });
});






module.exports = router;