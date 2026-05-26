
const dotenv = require('dotenv');
const express = require('express');
const app = express();
const connectDB = require('./config/db');

dotenv.config();
app.use(express.json());
connectDB()
const PORT = process.env.PORT;

app.listen(process.env.PORT, () => {
    console.log(`Te conectaste al puerto ${PORT}`);
});
