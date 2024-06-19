import React from 'react';
import { Box, Grid, TextField, 
    Button, Paper, CircularProgress,
    Typography, Modal} from '@mui/material';
import axios from 'axios';
import { Buffer } from 'buffer';
import ERC721ABI from '../assets/abi/ERC721ABI.json';
import { useSimulateContract, useWriteContract} from 'wagmi';
import toast, { Toaster } from 'react-hot-toast';


const MintingModal = ({ open, handleClose, handleMint, nftMetadata, setNftMetadata }) => {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  const onMint = () => {
    setNftMetadata({ ...nftMetadata, name, description });
    handleMint(name, description);
    setName('');
    setDescription('');
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="minting-modal-title">
      <Box sx={boxStyle}>
        <Typography id="minting-modal-title" variant="h6" component="h2" fontWeight="bolder" fontFamily="Zen Dots">
          Mint New NFT
        </Typography>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          required
          margin="normal"
          sx={{
            '& .MuiInputBase-root': {
              fontFamily: 'Montserrat Alternates',
              fontWeight: 'bolder',
              fontSize: 17,
              borderRadius: 3,
           }}}
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          margin="normal"
          sx={{
            '& .MuiInputBase-root': {
               fontFamily: 'Montserrat Alternates',
               fontWeight: 'bolder',
               fontSize: 17,
               borderRadius: 3,
            }}}
        />
        <Button variant="contained" color="primary" onClick={onMint} sx={buttonStyle}>
          Confirm
        </Button>
        <Button variant="contained" onClick={handleClose} sx={cancellButtonStyle}>
          Cancel
        </Button>
      </Box>
    </Modal>
  );
};

const boxStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid azure',
  boxShadow: 24,
  borderRadius: 3,
  p: 4,
};

const buttonStyle = {
  marginTop: 1,
  width: '100%',
  borderRadius: 3,
  textTransform: 'none',
  backgroundColor: '#f5f5f5',
  color: '#000000',
  fontFamily: 'Montserrat Alternates',
  fontWeight: 'bolder',
  transition: 'all 0.2s ease',
  padding: 1,
  ':hover':  {
      backgroundColor: '#f5f5f5',
      color: '#000000',
      fontFamily: 'Montserrat Alternates',
      fontWeight: 'bolder',
      fontSize: 17
  }
}

const cancellButtonStyle = {
  marginTop: 1,
  width: '100%',
  borderRadius: 3,
  textTransform: 'none',
  backgroundColor: '#f5f5f5',
  color: 'crimson',
  fontFamily: 'Montserrat Alternates',
  fontWeight: 'bolder',
  transition: 'all 0.2s ease',
  padding: 1,
  ':hover':  {
      backgroundColor: 'crimson',
      color: '#f5f5f5',
      fontFamily: 'Montserrat Alternates',
      fontWeight: 'bolder',
      fontSize: 17
      }
}

const MyComponent = () => {
  const [isOpenMintingModal, setOpenMintingModal] = React.useState(false);
  const [textInput, setTextInput] = React.useState('');
  const [imgUrl, setImgUrl] = React.useState('');
  const [tokenURI, setTokenURI] = React.useState();
  const [nftMetadata, setNftMetadata] = React.useState({
    name: '',
    description: '',
    image: '',
    attributes: [],
  });
  const [isLoading, setIsLoading] = React.useState({
     method: '',
     status: false
  });
  const { writeContractAsync, status: writeStatus  } = useWriteContract()

  const handleGenerate = async () => {
    if (isLoading.status === true) return;
    async function query(data) {
        setIsLoading({ status: true, method: 'generate' });
        const model1 = "ehristoforu/dalle-3-xl-v2";
        const model2 = "stabilityai/stable-diffusion-xl-base-1.0";
        const model3 = "stabilityai/stable-diffusion-2";
        
        const response = await fetch(
            "https://api-inference.huggingface.co/models/" + model2,
            {
                headers: { Authorization: "Bearer " + process.env.REACT_APP_HUGGINGFACE_API_KEY },
                method: "POST",
                body: JSON.stringify(data),
            }
        );
        const result = await response.blob();

        return result;
    }
    query({"inputs": textInput}).then(async (response) => {
        const url = URL.createObjectURL(response);
        setImgUrl(url); 
        
        // convert image to base64
        const reader = new FileReader();
        reader.readAsDataURL(response);
        reader.onloadend = () => {
            const base64data = reader.result;
            setNftMetadata({
              ...nftMetadata,
              image: base64data.replace(/^data:image\/[a-z]+;base64,/, ""),
            });
        };

        setIsLoading({ status: false, method: '' });
    });
  };

  const handlePreviewMint = async () => {
     if (isLoading.status === true) return;
     setOpenMintingModal(true);
  }

  const handleMint = async (name, description) => {
    setIsLoading({ status: true, method: 'ipfs-upload' });
    await axios.post('http://localhost:5000/upload-nft-data-to-ipfs', {
      name,
      description,
      image: nftMetadata.image,
      attributes: nftMetadata.attributes
    }).then(async (response) => {
        if (response.status === 200) {
          setOpenMintingModal(false);
          setIsLoading({ ...isLoading, method: 'mint' });
          await writeContractAsync({
              abi: ERC721ABI,
              address: '0x0842AC2C94e6f8439B5256bCec61Cd68b2A7bbEf',
              functionName: 'mint',
              args: [response.data.url2]
          })
        }
    })
  }

  React.useEffect(() => {

    if (isLoading.method === 'mint') {
       if (writeStatus === 'success') {
           setOpenMintingModal(false);
           toast.success('NFT minted successfully!');
           setIsLoading({ status: false, method: '' });
       } else if (writeStatus === 'error') {
           setIsLoading({ status: false, method: '' });
           toast.error('NFT minting failed!');
       } else if (writeStatus === 'pending') {
           setIsLoading({ status: true, method: 'mint' });
           toast.loading('Sending transaction...');
       } 
    }
    
    if (isLoading.status) {
       if (isLoading.method === 'generate') {
        toast.loading('Generating image...');
      }  else if (isLoading.method === 'ipfs-upload') {
        toast.loading('Uploading image to IPFS...');
      }
    } else {
      toast.dismiss();
      setIsLoading({ status: false, method: '' });
    }
  
  }, [writeStatus, isLoading]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      <Toaster />
      <Grid container sx={{ height: '100%' }} position="absolute" alignItems="right" justifyContent="right" top={'10px'} right={'10px'} zIndex={1}>
        <w3m-button />
      </Grid> 
      <Grid container spacing={2} alignItems="center" justifyContent="center" width="100%" zIndex={1} sx={{ alignItems: 'flex-start' }}>
        <Grid item>
          <Paper elevation={3} sx={{ width: 475, height: 305, padding: 2, borderRadius: 4, backgroundColor: '#ffffff52' }}>
            <TextField
              value={textInput}
              onChange={(event) => setTextInput(event.target.value)}
              label="Your Prompt"
              multiline
              rows={6.5}
              style={{
                width: '100%',
                height: '70%',
                borderRadius: 12,
                backgroundColor: '#f5f5f5',
                boxSizing: 'border-box',
                padding: 10,
                fontSize: 16,
                '.MuiInputBaseRoot': {
                    backgroundColor: '#f5f5f5',
                    color: '#000000',
                    borderRadius: 3,
                    textTransform: 'none',
                  },
                '.MuiInputBaseRoot': {
                    fontFamily: 'Montserrat Alternates',
                    color: '#000000',
                  }
              }}
            />
            <Button variant="contained" 
               onClick={handleGenerate}
               sx={buttonStyle}>
                {isLoading.method === 'generate' ? <div>
                  <CircularProgress size={15} thickness={8} sx={{ verticalAlign: 'middle', m: 1 }} />
                </div> : 'Generate Image'}
              </Button>
              <Button 
                variant="contained"
                onClick={handlePreviewMint}
                sx={buttonStyle}> 
                    {/*  if method is mint show minting with progress , and then if no, if the method is ipfs-upload show 'ipfs uploading' ,if no show mint */}
                    {isLoading.method === 'mint' ? <div>
                      <CircularProgress size={15} thickness={8} sx={{ verticalAlign: 'middle', m: 1 }} />
                    </div> : 
                      isLoading.method === 'ipfs-upload' ? 
                        <div> 
                            <CircularProgress size={15} thickness={8} sx={{ verticalAlign: 'middle', m: 1 }} />
                        </div> : 'Mint it!'
                    }
                </Button>
          </Paper>
        </Grid>
        <Grid item>
          <Paper elevation={3} sx={{ width: 450, height: 450, padding: 2, borderRadius: 4, backgroundColor: '#ffffff52' }}>
            <img
              src={
                imgUrl || 'https://media.wired.com/photos/63a230c5bc8f933da1fe8493/master/pass/Business_YearEndReview_AI-ART.jpg'
              }
              alt="Placeholder"
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px' }}
            />
          </Paper>
        </Grid>
      </Grid>
      <Grid container position={'absolute'} zIndex={1} sx={{ bottom: 0, top: '90%' }}> 
         <Typography fontFamily={"monospace, sans-serif"} fontWeight={"bolder"} sx={{ mr: 'auto', ml: 'auto', mt: '2%' }} color="white">
            Network Status : Active 
            <img width="15px" height="15px" src="https://cdn3.emoji.gg/emojis/1193_lightgreen_circle.png" alt="Placeholder" style={{ marginLeft: '5px', verticalAlign: 'middle' }} />
         </Typography>
      </Grid>
      <Grid container position={'absolute'} sx={{ bottom: 0, top: '0%', width: '100%', height: '10%', opacity: 0.06 }}> 
         <Typography variant="h2" fontFamily={"Montserrat Alternates"} fontWeight={"bolder"} color="azure">
             GENERATE IT MINT IT FOR FREE GENERATE IT
         </Typography>
         <Typography variant="h2" fontFamily={"Montserrat Alternates"} fontWeight={"bolder"} color="azure">
             GENERATE IT MINT IT FOR FREE GENERATE IT
         </Typography>
         <Typography variant="h2" fontFamily={"Montserrat Alternates"} fontWeight={"bolder"} color="azure">
             GENERATE IT MINT IT FOR FREE GENERATE IT
         </Typography>
         <Typography variant="h2" fontFamily={"Montserrat Alternates"} fontWeight={"bolder"} color="azure">
             GENERATE IT MINT IT FOR FREE GENERATE IT
         </Typography>
         <Typography variant="h2" fontFamily={"Montserrat Alternates"} fontWeight={"bolder"} color="azure">
             GENERATE IT MINT IT FOR FREE GENERATE IT
         </Typography>
         <Typography variant="h2" fontFamily={"Montserrat Alternates"} fontWeight={"bolder"} color="azure">
             GENERATE IT MINT IT FOR FREE GENERATE IT
         </Typography>
         <Typography variant="h2" fontFamily={"Montserrat Alternates"} fontWeight={"bolder"} color="azure">
             GENERATE IT MINT IT FOR FREE GENERATE IT
         </Typography>
         <Typography variant="h2" fontFamily={"Montserrat Alternates"} fontWeight={"bolder"} color="azure">
             GENERATE IT MINT IT FOR FREE GENERATE IT
         </Typography>
         <Typography variant="h2" fontFamily={"Montserrat Alternates"} fontWeight={"bolder"} color="azure">
             GENERATE IT MINT IT FOR FREE GENERATE IT
         </Typography>
         <Typography variant="h2" fontFamily={"Montserrat Alternates"} fontWeight={"bolder"} color="azure">
             GENERATE IT MINT IT FOR FREE GENERATE IT
         </Typography>
      </Grid>

      {/* minting modal */}
      <MintingModal
        open={isOpenMintingModal}
        handleClose={() => setOpenMintingModal(false)}
        handleMint={handleMint}
        nftMetadata={nftMetadata}
        setNftMetadata={setNftMetadata}
      />
    </Box>
  );
};

export default MyComponent;
