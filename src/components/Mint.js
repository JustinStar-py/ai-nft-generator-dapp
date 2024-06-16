import React from 'react';
import { Box, Grid, TextField, 
    Button, Paper, CircularProgress,
    Typography} from '@mui/material';
import axios from 'axios';

const MyComponent = () => {
  const [textInput, setTextInput] = React.useState('');
  const [imgUrl, setImgUrl] = React.useState('');
  const [isGenerating, setIsGenerating] = React.useState(false);

  const handleGenerate = async () => {
    // async function query(data) {
    //     setIsGenerating(true);
    //     const model1 = "ehristoforu/dalle-3-xl-v2";
    //     const model2 = "stabilityai/stable-diffusion-xl-base-1.0";
    //     const model3 = "stabilityai/stable-diffusion-2";
        
    //     const response = await fetch(
    //         "https://api-inference.huggingface.co/models/" + model2,
    //         {
    //             headers: { Authorization: "Bearer " + process.env.REACT_APP_HUGGINGFACE_API_KEY },
    //             method: "POST",
    //             body: JSON.stringify(data),
    //         }
    //     );
    //     const result = await response.blob();

    //     return result;
    // }
    // query({"inputs": textInput}).then((response) => {
    //     const url = URL.createObjectURL(response);
    //     setImgUrl(url);
    //     setIsGenerating(false);
    // });
    setImgUrl("https://airnfts.s3.amazonaws.com/nft-images/20220323/Doodles13_1648015508946.png");
  };

  React.useEffect(() => {
    // post image to server and get response
    if (imgUrl !== '' && imgUrl !== undefined) {
      const postImage = async () => {
        await axios.post('http://localhost:5000/upload-to-ipfs', { 
          image: imgUrl
        }).then((response) => {
           console.log(response);
        })
      }
      postImage();
    }
  }, [imgUrl]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Grid container spacing={2} alignItems="center" justifyContent="center" width="100%" zIndex={1} sx={{ alignItems: 'flex-start' }}>
        <Grid item>
          <Paper elevation={3} sx={{ width: 475, height: 300, padding: 2, borderRadius: 4, backgroundColor: '#ffffff52' }}>
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
               disabled={isGenerating}
               sx={{ 
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
                   ':hover': {
                     backgroundColor: '#f5f5f5',
                     color: '#000000',
                     fontFamily: 'Montserrat Alternates',
                     fontWeight: 'bolder',
                     fontSize: 17
                   }
                 }}>
                {isGenerating ? <div>
                  Generating...
                  <CircularProgress size={15} thickness={8} sx={{ verticalAlign: 'middle', m: 1 }} />
                </div> : 'Generate Image'}
              </Button>
              <Button variant="contained"
               disabled={isGenerating}
               sx={{
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
                 ':hover': {
                   backgroundColor: '#f5f5f5',
                   color: '#000000',
                   fontFamily: 'Montserrat Alternates',
                   fontWeight: 'bolder',
                   fontSize: 17
                 }
               }}>Mint it!</Button>
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
         <Typography fontFamily={"monospace, sans-serif"} fontWeight={"bolder"} sx={{ mr: 'auto', ml: 'auto', mt: '2%' }} color="black">
            Network Status : Active 
            <img width="15px" height="15px" src="https://cdn3.emoji.gg/emojis/1193_lightgreen_circle.png" alt="Placeholder" style={{ marginLeft: '5px', verticalAlign: 'middle' }} />
         </Typography>
      </Grid>
      <Grid container position={'absolute'} sx={{ bottom: 0, top: '0%', width: '100%', height: '10%', opacity: 0.1 }}> 
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
    </Box>
  );
};

export default MyComponent;
