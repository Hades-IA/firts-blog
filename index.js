//constantes
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const session = require("express-session");
const admAuth = require("./middleweres/admmiddlewere")
// routers
const categoresController = require('./categores/CategoresController');
const articlesController = require('./articles/ArticlesController');
const usersController = require("./user/UserController")

//session
app.use(session({
    secret: "dragondbsenhasecret",
    cookie: { maxAge: 3600000 }
}))//maxAge é mile segundo e 1s tem mil mile segundo .então uma hora tem 3600000


//tabelas
const Category = require("./categores/category");
const Article = require("./articles/Article");
const User = require("./user/user")

//vews engine
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use(express.static('public'))


//db
connection.authenticate().then(() => {
    console.log("conecatado ao DB")
}).catch((err) => {
    console.log(`erro no DB:  ${err}`)
})








//rotas
app.get('/', (req, res) => {
    Article.findAll({
        limit: 5,
        order: [["id", "DESC"]]
    }
    ).then(article => {

        res.render('index', {
            article: article
        })

    })

});

app.get("/article/:slug", (req, res) => {
    let slug = req.params.slug
    Article.findOne({
        where: {
            slug: slug
        }
    }).then(article => {
        if (article != undefined) {

            res.render('article', {
                article: article
            })

        } else {
            res.redirect("/")
        }

    })
});

app.get("/categorias", (req, res) => {
    Category.findAll().then(categoria => {
        res.render("category", {
            category: categoria
        })
    })
});

app.get("/categorias/:slug", (req, res) => {
    let slug = req.params.slug;
    if (slug == undefined) {
        res.redirect("/")
    }
    Category.findOne({
        where: {
            slug: slug
        },
        include: [{ model: Article }]
    }).then(category => {
        if (category != undefined) {

            res.render("category-articles", {
                article: category.articles
            })

        }
    })
});


app.get("/articles", (req, res) => {
    Article.findAll().then(article => {

        res.render('index', {
            article: article
        })

    })
});

app.get("/home/adm", admAuth, (req, res) => {
    Article.findAll().then(article => {

        res.render('admindex', {
            article: article
        })

    })
})

//sesion rotas

/*
app.get("/sesao", (req, res) => {
    req.session.nome = "aro"
    res.redirect("/leitura")
})

app.get("/leitura", (req, res) => {
    res.json({
        nome: req.session.nome
    })
})
*/
//router

app.use("/", categoresController)
app.use("/", articlesController)
app.use("/", usersController)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('conectado na porta ' + PORT)
});