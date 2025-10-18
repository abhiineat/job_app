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
app.get('/users', async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});