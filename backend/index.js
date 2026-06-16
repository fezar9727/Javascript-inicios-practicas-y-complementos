const dotenv = require('dotenv');
const express = require('express');
const app = express();
const connectDB = require('./config/db');
const auth = require('./routes/auth.routes');
const task = require('./routes/task.routes'); // Importa las rutas relacionadas con la tarea de task-crud-mongoose
const cors = require('cors');


dotenv.config();
connectDB();
app.use(cors());
app.use(express.json());

app.use('/api/auth', auth)
app.use('/api/task', task); // <-- Registra las rutas de la tarea de task-crud-mongoose bajo el endpoint /api/task

const PORT = process.env.PORT;


app.listen(PORT, () => {
    console.log(`Te conectaste al puerto ${ PORT }`)
});