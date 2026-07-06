"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
// Initialize Sequelize for MySQL via XAMPP
// Assuming default XAMPP configuration: root user, no password, localhost:3306
const sequelize = new sequelize_1.Sequelize('wedding_db', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false, // Set to console.log to see SQL queries
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});
exports.default = sequelize;
