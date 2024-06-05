const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 4000;
const dotEnv = require('dotenv');
dotEnv.config();
const cors = require('cors')


app.use(cors())
// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Task Schema
const taskSchema = new mongoose.Schema({
    name: String
});

const Task = mongoose.model('assignment_vijender', taskSchema);

// Middleware
app.use(express.json());


app.post('/add', async (req, res) => {
    try {
        const { tasks } = req.body;
        // Insert the tasks into MongoDB directly
        await Task.insertMany(tasks);
        res.status(200).send('Tasks added to MongoDB');
    } catch (error) {
        console.error('Error adding tasks:', error);
        res.status(500).send('Error adding tasks');
    }
});

app.get('/fetchAllTasks', async(req,res)=>{
    try {
        const response = await Task.find()
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message})
    }
})


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
