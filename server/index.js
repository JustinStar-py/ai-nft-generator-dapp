const express = require('express');
const { ThirdwebStorage } = require('@thirdweb-dev/storage');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = 5000;

const corsOptions = {
  origin: ['http://localhost:3001', 'http://localhost:5174', 'http://localhost:3000'],
  optionsSuccessStatus: 200 // For legacy browser support
}

app.use(cors(corsOptions));

// parse application/x-www-form-urlencoded
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));


// set storage
const storage = new ThirdwebStorage({
     secretKey: process.env.THIRDWEB_SECRET_KEY
});

// upload image to IPFS
app.post('/upload-image-to-ipfs', async (req, res) => {
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

// upload NFT data to IPFS
app.post('/upload-nft-data-to-ipfs', async (req, res) => {
   const { name, description, image, attributes } = req.body;
 
   // save image in local storage
   const filePath = path.join(__dirname, 'public', 'nft-images', `${Date.now()}.png`);
   fs.writeFileSync(filePath, image, 'base64');
   
   // save image to IPFS
   const cid = await storage.upload(fs.readFileSync(filePath));
   const url = storage.resolveScheme(cid);

   const nftMetadata = {
     name,
     description,
     image: url,
     attributes
   };

   // save NFT data to IPFS
   const cid2 = await storage.upload(JSON.stringify(nftMetadata));
   const url2 = storage.resolveScheme(cid2);
  
   res.status(200).json({ url2 });
})

// health check
app.get('/', async (req, res) => {
    res.status(200).json({ message: 'Server is running' });
  })
  
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});