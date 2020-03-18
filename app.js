const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const Sequelize = require('sequelize');

const db = require('./config/database')


// Test Db
db.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.log('Error:' + err))



const app = express();

//Handlebars

app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));



app.get('/', (req, res) =>
    res.send('INDEX')
);

const employeeRoutes = require('./routes/employeeRoute');

app.use('/employee', employeeRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));