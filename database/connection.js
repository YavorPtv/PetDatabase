// connection.js

const { Sequelize } = require('sequelize');

// Replace 'database_name', 'username', and 'password' with your actual database credentials
const sequelize = new Sequelize('mydatabase', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    dialectOptions: {
        // Additional options
    }
});

// Test the connection
async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

// Call the testConnection function to check if the connection works
testConnection();

module.exports = sequelize;