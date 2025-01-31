const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

mongoose.connect('mongodb://mongodb:27017/expresso', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Connecté à MongoDB');
})
.catch((err) => {
    console.log('Erreur de connexion à MongoDB:', err);
});

const localSchema = new mongoose.Schema({
    name: String,
    number: Number,
    ward: String
});

const Local = mongoose.model('Local', localSchema);

const teacherSchema = new mongoose.Schema({
    name: String,
    local_id: {
	type: mongoose.Schema.Types.ObjectId,
	ref: 'Local'
    }
});

const Teacher = mongoose.model('Teacher', teacherSchema);

app.get('/', (req, res) => {
   res.send("Hello from Expresso!");
});

// Add a local
app.post('/local', async (req, res) => {
    try {
        const { name, number, ward } = req.body;
        const local = new Local({ name, number, ward });
        await local.save();
        res.status(201).json(local);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all locals
app.get('/local', async (req, res) => {
    try {
        const locals = await Local.find();
        res.status(200).json(locals);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(3000, '0.0.0.0', () => {
   console.log('Jackpot!');
});

