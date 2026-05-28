
const dotenv = require('dotenv');
const express = require('express');
const app = express();
const connectDB = require('./config/db');
const auth = require('./routes/auth.routes');

dotenv.config();
connectDB()
app.use(express.json());

app.use('/api/auth', auth);

const PORT = process.env.PORT;

app.listen(process.env.PORT, () => {
    console.log(`Te conectaste al puerto ${PORT}`);
});
