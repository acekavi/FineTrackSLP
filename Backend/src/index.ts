import express from 'express';
import bodyParser from 'body-parser';
import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize('FineTrackDB_dev', 'root', 'root', {
    host: 'localhost',
    dialect: 'postgres'
});

const app = express();
app.use(bodyParser.json());

// Define a simple model
const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

// Sync the database
sequelize.sync();

// Routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/users', async (req, res) => {
    const { name, email } = req.body;
    try {
        const user = await User.create({ name, email });
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/users', async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
