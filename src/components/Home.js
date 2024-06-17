// src/MainComponent.js
import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Grid, Paper, Button, keyframes } from '@mui/material';
import mainGif from '../assets/img/pic.gif';
import leftArrowGif from '../assets/img/left-arrow.gif';

// translate right to left animation by keyframes
const translateRightToLeft = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
`;

const MainComponent = () => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleMouseMove = (event) => {
    const { clientX, clientY } = event;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    const deltaX = clientX - centerX;
    const deltaY = clientY - centerY;

    const rotationFactor = 3; // Increase this factor to increase speed and angle
    setRotation({
      x: (deltaY / centerY) * 15 * rotationFactor,
      y: (deltaX / centerX) * 15 * rotationFactor,
    });
  };

  const handleScroll = (event) => {
    console.log(event.target.scrollTop);
    setScrollPosition(event.target.scrollTop);
  };

  return (
    <Box onMouseMove={handleMouseMove} onScroll={handleScroll} sx={{ height: '100vh', overflow: 'auto' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '100vh',
          padding: '20px',
        }}
      >
        <Typography variant="h2" fontFamily={"Montserrat Alternates"} fontWeight={"bolder"} sx={{ ml: '5%' }} color="azure">
            Generate NFT
        </Typography>
        <img
          src={mainGif}
          alt="Animated Fox"
          style={{
            position: 'absolute',
            right: '13%',
            top: '50%',
            transform: `translate(-50%, -50%) rotateY(${rotation.y}deg) rotateX(${rotation.x}deg)`,
            width: '550px',
            height: '550px',
            transition: 'transform 0.1s ease-out',
            filter: `hue-rotate(${scrollPosition / 10}deg)`,
          }}
        />
         <Typography variant="h2" fontFamily={"Montserrat Alternates"} fontWeight={"bolder"} sx={{ mr: '5%' }} color="azure">
            Then mint it!
        </Typography>
        <Button 
          variant="contained"
          href="/mint"
          sx={{ 
            position: 'absolute',
            backgroundColor: 'transparent',
            right: '43%',
            bottom: '5%',
            fontSize: '1.4rem',
            border: '2px solid azure',
            borderRadius: '25px',
            fontFamily: 'Montserrat Alternates',
            fontWeight: 'bolder',
            transform: `translateX(-${scrollPosition*2}px)`,
            opacity: scrollPosition < 150 ? 1 : 0.6,
            transition: 'color 0.2s ease-in-out, background-color 0.2s ease-in-out, padding 0.2s ease-in-out, position 0.5s ease-in-out, opacity 0.5s ease-in-out, transform 0.5s ease-in-out',
            '&:hover': {
              backgroundColor: 'azure',
              color: 'lightslategrey',
              px: '30px',
            }
           }}
        >
           Launch DApp
           <img src={leftArrowGif} alt="Arrow" style={{ width: '30px', height: '30px', marginLeft: '10px' }} />
        </Button>
      </Box>
      <Container sx={{ marginTop: '50px'}}>
        <Grid container spacing={4} justifyContent="center">
          <Typography variant="h1" fontFamily={"Zen Dots"} color="snow" sx={{ 
              transition: 'all 0.2s ease-in-out',
              transform: scrollPosition > 310 ? 'translateX(0px)' : `translateX(-${scrollPosition}px)`, 
              opacity: scrollPosition > 280 ? 1 : 0.1 }}>
                 MINT IT! FREE! MINT IT! FREE! MINT IT! FREE! MINT IT! FREE! MINT IT! FREE!
          </Typography>
        </Grid>
      </Container>
      <Container sx={{ marginTop: '50px' }}>
        <Grid container spacing={6} justifyContent="center">
          <Grid item xs={12} sm={6}>
            <Paper elevation={3} sx={{ padding: '75px', textAlign: 'center', mx: 5, borderRadius: '10px' }}>
              <Typography variant="h4" fontFamily={"Zen Dots"}>Open-Source</Typography>
              <Typography fontFamily={"Montserrat Alternates"}>We are open source at Github and we are looking for contributors. <a href="https://github.com/OpenZeppelin/openzeppelin-contracts">Github</a></Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper elevation={3} sx={{ padding: '75px', textAlign: 'center', mx: 5, borderRadius: '10px' }}>
              <Typography variant="h4" fontFamily={"Zen Dots"}>Free to use</Typography>
              <Typography fontFamily={"Montserrat Alternates"}>We dont need any fees. but you can donate us.</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper elevation={3} sx={{ padding: '75px', textAlign: 'center', mx: 5, borderRadius: '10px' }}>
              <Typography variant="h4" fontFamily={"Zen Dots"}>Models</Typography>
              <Typography fontFamily={"Montserrat Alternates"}>We have some models for creating images based on these models.</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper elevation={3} sx={{ padding: '75px', textAlign: 'center', mx: 5, borderRadius: '10px' }}>
              <Typography variant="h4" fontFamily={"Zen Dots"}>ERC721</Typography>
              <Typography fontFamily={"Montserrat Alternates"}>Our NFT contract is ERC721.  ERC721 is a standard for non-fungible tokens in the EVM chains.<b/>
                 <a href="https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol">Read more</a>
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <Container sx={{ marginTop: '50px' }}>
      </Container>
      <Container sx={{ marginTop: '50px' }}>
        <Grid container spacing={4} justifyContent="center">
          <Typography variant="h1" fontFamily={"Zen Dots"} color="snow" sx={{ textAlign: 'center', mt: '60px' }}>Do you need Help?</Typography>
        </Grid>
      </Container>
      <Container sx={{ my: '50px' }}>
        <Grid container spacing={4} justifyContent="center">
          <Typography variant="h3" fontFamily={"Zen Dots"} color="snow" sx={{ textAlign: 'center', mt: '60px' }}>
            <a href="https://t.me/P2P_JS">Telegram</a>
          </Typography>
        </Grid>
      </Container>
    </Box>
  );
};

export default MainComponent;
