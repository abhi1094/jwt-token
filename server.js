const express = require ('express');
const path = require('path');
const connectDb = require('./config/db')

connectDb();



const app = express();
app.use(express.json());

app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/post', require('./routes/api/post'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/users', require('./routes/api/users'));


const PORT = process.env.PORT || 5000;

app.get('/', function (req, res) {
    res.send('hello world')
  });

app.listen(PORT, () => console.log(`APP started on ${PORT}`));
