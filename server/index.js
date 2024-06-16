const express = require('express');
const { ThirdwebStorage } = require('@thirdweb-dev/storage');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = 5000;

const corsOptions = {
  origin: ['http://127.0.0.1:3001', 'http://localhost:5174', 'http://localhost:3000'],
  optionsSuccessStatus: 200 // For legacy browser support
}

app.use(cors(corsOptions));

// health check
app.get('/', async (req, res) => {
    res.status(200).json({ message: 'Server is running' });
  })
  
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});