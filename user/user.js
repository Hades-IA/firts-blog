const Sequelize = require("sequelize");
const Connection = require("../database/database");

const User = Connection.define("users", {
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            isEmail: true
        }
    }, password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true

        }
    }
});

User.sync({ force: false })
module.exports = User;