const express = require('express');
const app = express();

app.get('/', (req, res) => {
   res.send("Hello from Expresso!");
});

app.listen(3000, '0.0.0.0', () => {
   console.log('Jackpot!');
});

