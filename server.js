const express = require("express");
const mysql = require('mysql');
const myconn = require('express-myconnection');
const routes = require('./routes');

const app = express();
app.set('port', process.env.PORT || 9000);
const dbOptions = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '1234',
    database: 'library'
} 

//middlewares

app.use(myconn(mysql, dbOptions, 'single'));
app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE, PATCH');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE, PATCH');
    next();
});

//-----------

app.get('/', (req, res)=>{
    res.send('Welcome to my Api');
});

app.use('/api', routes);

app.listen(app.get('port'), ()=>{
    console.log("server running on port ", app.get('port'));
});