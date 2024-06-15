import React from 'react';
import { Box, Grid, TextField, 
    Button, Paper, 
    Typography} from '@mui/material';

const MyComponent = () => {
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
                '.MuiInputBase-root': {
                    backgroundColor: '#f5f5f5',
                    color: '#000000',
                    borderRadius: 3,
                    textTransform: 'none',
                  },
                '.MuiInputLabel-root': {
                    fontFamily: 'Montserrat Alternates',
                    color: '#000000',
                  }
              }}
            />
            <Button variant="contained" sx={{ 
                marginTop: 1, 
                width: '100%', 
                borderRadius: 3, 
                textTransform: 'none',
                backgroundColor: '#f5f5f5',
                color: '#000000',
                fontFamily: 'Montserrat Alternates',
                fontWeight: 'bolder',
                transition: 'all 0.2s ease',
                ':hover': {
                  backgroundColor: '#f5f5f5',
                  color: '#000000',
                  fontFamily: 'Montserrat Alternates',
                  fontWeight: 'bolder',
                  fontSize: 17
                }
              }}>Generate</Button>
              <Button variant="contained" sx={{
                marginTop: 1,
                width: '100%',
                borderRadius: 3,
                textTransform: 'none',
                backgroundColor: '#f5f5f5',
                color: '#000000',
                fontFamily: 'Montserrat Alternates',
                fontWeight: 'bolder',
                transition: 'all 0.2s ease',
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
              src="https://media.wired.com/photos/63a230c5bc8f933da1fe8493/master/pass/Business_YearEndReview_AI-ART.jpg"
              alt="Placeholder"
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px' }}
            />
          </Paper>
        </Grid>
      </Grid>
      <Grid container position={'absolute'} zIndex={1} sx={{ bottom: 0, top: '90%' }}> 
         <Typography variant="h6" fontFamily={"Montserrat Alternates"} fontWeight={"bolder"} sx={{ ml: '5%' }} color="azure">
            Network : Active 
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
