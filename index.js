const express = require('express');
const path = require('path');
const logger = require('./middleware/logger');
const members = require('./Members');
const exphbs = require('express-handlebars');
const app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//Init middleware
// app.use(logger);

//Body parser middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//HomePage Route
app.get('/', (req, res) => res.render('index'))

//Set static folder
app.use(express.static(path.join(__dirname, 'public')))

// app.get('/', (req, res) => {
//     res.json(members);
// });

//Member API routes
app.use('/api/members', require('./routes/api/members'))

const PORT = process.env.PORT || 6000;

app.listen(PORT, () => {
    console.log(`Server Started on port ${PORT}`);
});