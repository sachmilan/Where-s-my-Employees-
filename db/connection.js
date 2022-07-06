const mysql = require("mysql");

const connection= mysql.createConnection({
    host:'localhost',
    user:'root',
    database: 'company',
    password:'Qwerty@12345',
});

module.exports=connection;