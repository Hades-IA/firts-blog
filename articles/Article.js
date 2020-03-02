const Sequelize = require("sequelize");
const connection = require("../database/database");
const Category = require("../categores/category")


const Article = connection.define("articles", {
    title: {
        type: Sequelize.STRING,
        allowNull: false

    }, slug: {
        type: Sequelize.STRING,
        allowNull: false
    }, body: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});
Category.hasMany(Article)//1-P-varios
Article.belongsTo(Category)//1-P-1

Article.sync({ force: false })
module.exports = Article;