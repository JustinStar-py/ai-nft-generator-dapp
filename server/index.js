const express = require('express');
const { ThirdwebStorage } = require('@thirdweb-dev/storage');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 5000;

const corsOptions = {
  origin: ['http://localhost:3001', 'http://localhost:5174', 'http://localhost:3000'],
  optionsSuccessStatus: 200 // For legacy browser support
}

app.use(cors(corsOptions));

// parse application/x-www-form-urlencoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// set storage
const storage = new ThirdwebStorage({
     secretKey: 'NTtwl_tcUjvVL9z1_5EQrmTr1qPOnnJAiYprBYcuRsi-FZAk6u-bVbKIuwFgJIMfp482IXkFHUROclhMQK6ufw'
});

// upload image to IPFS
app.post('/upload-to-ipfs', async (req, res) => {
  // get image from request
  const { image } = req.body;
  
  // // download image from url
  const buf = await (await fetch(image)).arrayBuffer();

  // convert to base64
  const base64 = Buffer.from(buf).toString('base64');

  // save image in local storage
  const filePath = path.join(__dirname, 'public', 'nft-images', `${Date.now()}.png`);
  fs.writeFileSync(filePath, base64, 'base64');
  
  // // save image to IPFS
  const cid = await storage.upload(fs.readFileSync(filePath));
  const url = storage.resolveScheme(cid);
 
  res.status(200).json({ url });
});

// health check
app.get('/', async (req, res) => {
    res.status(200).json({ message: 'Server is running' });
  })
  
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});