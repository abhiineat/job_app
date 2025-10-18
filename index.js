require("dotenv").config({ path: "./.env" });
const express = require('express');
const prisma = require('./db');
const app = express();
const PORT = 3000;
const authRoutes = require('./routes/authRoutes');
const jobRoutes = require('./routes/jobRoutes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/auth', authRoutes);
app.use('/jobs', jobRoutes);
app.get('/', (req, res) => {
    res.send('Welcome to the Prisma Express API');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});