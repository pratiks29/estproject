"use client";
import React, { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material'; // Added Button import here
import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    '/images/Carousel Images/AdobeStock_296957200_Preview.jpeg',
    '/images/Carousel Images/AdobeStock_322042044_Preview.jpeg',
    '/images/Carousel Images/AdobeStock_482765252_Preview.jpeg',
    '/images/Carousel Images/AdobeStock_496784045_Preview.jpeg',
    '/images/Carousel Images/AdobeStock_577384856_Preview.jpeg',
    '/images/Carousel Images/AdobeStock_818812388_Preview.jpeg',
    '/images/Carousel Images/AdobeStock_857536179_Preview.jpeg',
    '/images/Carousel Images/GW1.jpg',
    '/images/Carousel Images/pxclimateaction-4684217_1920.jpg',
    '/images/Carousel Images/pexels-markusspiske-2559749.jpg',
    '/images/Carousel Images/women-are-sitting-holding-seedlings-are-dry-land-warming-world.jpg'
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [images.length]);

  return (
    <>
      {/* Apply Jost font globally */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Jost:wght@400;500;700&display=swap');
        * {
          font-family: 'Jost', sans-serif;
        }
      `}</style>

      <Box sx={{ backgroundColor: '#f0f4f8' }}>
        
        {/* Hero Section */}
        <Box sx={{
          height: '80vh',
          backgroundImage: 'url("/Banner.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          textAlign: 'center',
        }}>
          <Typography 
            variant="h2" 
            sx={{ 
              fontFamily: 'Jost', 
              fontSize: '80px',
              fontWeight: 500,
              color: '#2D4E1C',
              letterSpacing: '0.1em',
              mb: 1
            }}
          >
            PLANET PULSE
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              fontFamily: 'Jost', 
              fontWeight: 400, 
              fontSize: { xs: '1.2rem', md: '1.5rem' },
              color: 'black', 
              letterSpacing: '0.2em',
              mb: 3
            }}
          >
            ENDLESS POTENTIAL
          </Typography>
          <Button variant="contained" color="success" size="large" sx={{ mt: 2 }}>Explore</Button>
        </Box>

        {/* Services Section */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 10, py: 5, backgroundColor: 'white', height: '80vh' }}>
  {/* Service 1 */}
  <Box
    sx={{
      textAlign: 'center',
      width: '28%',
      padding: 2,
      boxShadow: 3,
      borderRadius: '8px',
      backgroundColor: 'white',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      '&:hover': {
        backgroundColor:'#d5dcf5',
        transform: 'scale(1.05)',
        boxShadow: '0px 10px 16px rgba(0, 0, 0, 0.2)', // Adjust shadow for a more pronounced pop-out effect
      },
    }}
  >
    <Link href="/temperature" passHref>
      <Image src="/tempchekr.jpg" width={406} height={210} alt="Temperature Checker" style={{ borderRadius: '8px', cursor: 'pointer' }} />
    </Link>
  </Box>

  {/* Service 2 */}
  <Box
    sx={{
      textAlign: 'center',
      width: '28%',
      padding: 2,
      boxShadow: 3,
      borderRadius: '8px',
      backgroundColor: 'white',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      '&:hover': {
        backgroundColor:'#d5dcf5',
        transform: 'scale(1.05)',
        boxShadow: '0px 10px 16px rgba(0, 0, 0, 0.2)',
      },
    }}
  >
    <Link href="/timeline" passHref>
      <Image src="/timeline.jpg" width={416} height={210} alt="Global Impact Timeline" style={{ borderRadius: '8px', cursor: 'pointer' }} />
    </Link>
  </Box>

  {/* Service 3 */}
  <Box
    sx={{
      textAlign: 'center',
      width: '28%',
      padding: 2,
      boxShadow: 3,
      borderRadius: '8px',
      backgroundColor: 'white',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      '&:hover': {
        backgroundColor:'#d5dcf5',
        transform: 'scale(1.05)',
        boxShadow: '0px 10px 16px rgba(0, 0, 0, 0.3)',
      },
    }}
  >
    <Link href="/questionnaire" passHref>
      <Image src="/carbonfprint.jpg" width={406} height={210} alt="Carbon Footprint Quiz" style={{ borderRadius: '8px', cursor: 'pointer' }} />
    </Link>
  </Box>
</Box>


        {/* About Us Section */}
        <Box sx={{ py: 5, px: 3, backgroundColor: '#f9f9f9' }}>
  <Typography variant="h4" sx={{ fontWeight: 'bold', textAlign: 'center', mb: 4, fontFamily:'Jost' }}>Description</Typography>

  {/* Temperature Checker Section */}
  <Box sx={{ textAlign: 'center', mb: 5, px: 2, }}>
    <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>Temperature Checker</Typography>
    <Typography variant="body1" color="textSecondary" fontSize='18px'>
      A temperature checker app that leverages AI to predict future Earth temperatures provides a powerful tool for understanding climate change trends. By analyzing vast datasets from historical temperature records, greenhouse gas emissions, ocean currents, and atmospheric changes, the app's AI algorithms generate predictive models for future global temperatures. Users can input their location or observe global predictions to see potential temperature shifts over the coming years. This app not only raises awareness about the potential impacts of climate change but also offers insights into how different environmental policies and actions might alter these predictions. By visualizing these future scenarios, users are empowered with knowledge that supports proactive, sustainable choices to help curb climate change.
    </Typography>
  </Box>

  {/* Carbon Footprint Quiz Section */}
  <Box sx={{ textAlign: 'center', mb: 5, px: 2 }}>
    <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>Carbon Footprint Quiz</Typography>
    <Typography variant="body1" color="textSecondary" fontSize={'18px'}>
      Welcome to the Carbon Footprint Quiz! This interactive quiz is designed to help you understand the environmental impact of your daily choices—from transportation and energy use to waste and food consumption. By calculating your carbon footprint, you gain insights into how your actions contribute to CO₂ emissions and climate change. With this knowledge, you can identify areas where small changes can make a big difference for the planet. Whether you’re looking to live more sustainably or just curious about your carbon impact, this quiz offers valuable information to guide eco-friendly decisions that support a healthier, more sustainable future.
    </Typography>
  </Box>

  {/* Earth Timeline Section */}
  <Box sx={{ textAlign: 'center', mb: 5, px: 2 }}>
    <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2}}>Earth Timeline</Typography>
    <Typography variant="body1" color="textSecondary" fontSize={'18px'}>
      Introducing the Earth Timeline, a dynamic tool designed to take you through the major climate events that have shaped our planet over the years. From the dawn of the industrial era to recent record-breaking temperatures, this timeline provides a clear view of the environmental milestones and challenges we’ve faced. You'll see key moments such as the rise in CO₂ emissions, the impact of deforestation, notable climate treaties, and extreme weather events that have redefined our understanding of climate change. By tracing this journey, the Earth Timeline emphasizes how human activity has influenced the climate and highlights the urgency for action. This timeline serves as a powerful reminder of where we’ve been, where we are, and the choices we can make to secure a more sustainable future.
    </Typography>
  </Box>
</Box>

        {/* Carousel Section */}
        <Box
          sx={{
            
            height: '70vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            position: 'relative',
            backgroundColor: '#1d3557',
            color: 'white',
          }}
        >
          <Typography variant="h4" sx={{ fontFamily:'Jost',mb: 3 }}>The Damage humans have done...</Typography>
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              height: '100%',
              transform: `translateX(-${currentImageIndex * 100}%)`,
              transition: 'transform 1s ease',
            }}
          >
            {images.map((src, index) => (
              <Box key={index} sx={{
                minWidth: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <Image src={src} alt={`Carousel image ${index + 1}`} width={800} height={600} style={{ borderRadius: '8px' }} />
              </Box>
            ))}
          </Box>
        </Box>

        {/* Call to Action Section */}
        <Box sx={{ py: 5, backgroundColor: '#1d3557', color: '#fff', textAlign: 'center' }}>
          <Typography variant="h4" sx={{ fontFamily:'Jost',fontWeight: 'bold' }}>There is no Planet B...</Typography>
          <Typography variant="body1" sx={{ fontFamily:'Jost',maxWidth: '800px', mx: 'auto', mb: 3 }}>
            Pratik Singh -- Rugved Thakare -- Mrinal Pandey -- Ayush Pandey -- Ashish Lakhmani
          </Typography>
          
        </Box>
      </Box>
    </>
  );
}
