const express = require('express');
require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./src/mongo');

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.static('uploads'));



const port = process.env.PORT || 3000;
console.log(port);

app.get('/', (req, res) => {
  res.status(200).json({ message: 'OK' });
});

app.get('/health', (req, res) => {
  res.status(200).json({ message: 'OK' });
});

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});