// MODULES
import express from 'express';
import expressHandlebars from 'express-handlebars';
import mysql from 'mysql2/promise';

// SERVER AND ITS ROOT DECLARATION
const app = express();
const root = import.meta.dirname;
app.use(express.static(root));

// LAYOUT CONFIG AND CONNECTION
const layoutSystem = expressHandlebars.create({
    defaultLayout: 'index',
    extname: 'hbs'
});

app.engine('hbs', layoutSystem.engine);

// DB CONNECT
const db_con = mysql.createConnection({
    host: 'localhost',
    database: 'cooking_app',
    user: 'root',
    password: ''
});

// ROUTING
app.get('/', async (req, res) => {
    let recordsAmount = 691;
    let randomId = Math.floor(Math.random()*recordsAmount+1);
    let db_query = `SELECT * FROM meals WHERE ID=${randomId}`;
    let db_response = (await db_con).query(db_query);
    let meal = (await db_response)[0][0];

    res.render('meal.hbs', { meal });
});

// SERVER LAUNCHING
app.listen(3000, () => console.log('Server is running...'));