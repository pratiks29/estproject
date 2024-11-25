// src/components/TemperatureImageDisplay.js
import React from 'react';
import { Box, Typography } from '@mui/material';

export default function TemperatureImageDisplay({ output, onlyText = false, onlyImage = false }) {
  let imageUrl;
  let threat;
  let description;

  if (output >= 10 && output <= 15.9) {
    imageUrl = '/20-26.png';
    threat = 'Moderate zone';
    description = 'If the Earths average temperature reaches 16 degrees Celsius, it would signal a significant rise from historical norms, with widespread implications for ecosystems, sea levels, and weather patterns. Even a small increase in global temperature can lead to accelerated melting of polar ice caps and glaciers, causing sea levels to rise and threatening coastal communities. Warmer oceans would fuel more intense and frequent storms, hurricanes, and flooding, while droughts and heatwaves would become more common in other regions. Biodiversity would suffer as species struggle to adapt to rapid temperature changes, leading to habitat loss and disruptions in food chains. Agriculture could face challenges as traditional crop yields decline in certain areas, threatening food security. Overall, an average temperature of 16 degrees Celsius would push the planet closer to extreme climate scenarios, with urgent consequences for both natural and human systems.';
  } else if (output > 15.9 && output <= 16.2) {
    imageUrl = '/26-28.png';
    threat = 'Safe zone';
    description = 'If the Earths average temperature reaches 16 degrees Celsius, it would signal a significant rise from historical norms, with widespread implications for ecosystems, sea levels, and weather patterns. Even a small increase in global temperature can lead to accelerated melting of polar ice caps and glaciers, causing sea levels to rise and threatening coastal communities. Warmer oceans would fuel more intense and frequent storms, hurricanes, and flooding, while droughts and heatwaves would become more common in other regions. Biodiversity would suffer as species struggle to adapt to rapid temperature changes, leading to habitat loss and disruptions in food chains. Agriculture could face challenges as traditional crop yields decline in certain areas, threatening food security. Overall, an average temperature of 16 degrees Celsius would push the planet closer to extreme climate scenarios, with urgent consequences for both natural and human systems.';
  } else if (output > 16.2 && output <= 16.5) {
    imageUrl = '/28-30.png';
    threat = 'Safe zone';
    description = 'If Earths global temperature rises to between 16.2 and 16.7 degrees Celsius, it would place the planet in an unprecedented and potentially irreversible climate crisis. This increase would likely lead to severe consequences such as rapid ice melt in polar regions, significantly rising sea levels, and the displacement of millions living in coastal and low-lying areas. Ecosystems around the globe would face intense stress, with coral reefs, tropical forests, and polar habitats particularly vulnerable, leading to the loss of biodiversity as many species struggle to survive. Agricultural patterns would be deeply impacted, making it difficult to grow staple crops in traditional regions, thereby threatening global food security. Extreme weather events, such as hurricanes, droughts, and heatwaves, would become more frequent and intense, overwhelming infrastructure and emergency systems worldwide. This range of temperature increase emphasizes the urgency for global climate action to prevent severe disruptions to both human societies and natural ecosystems.';
  } else if (output > 16.5 && output <= 16.7) {
    imageUrl = '/30-32.png';
    threat = 'Here are the names of each image in the picture:';
    description = `
      - Jakobshavn Glacier (Greenland)
      - Adelie Penguin
      - Australian Mountain Ash
      - Emperor Penguin
      - Fox and Franz Josef Glaciers
      - Glacier National Park Glacier
      - Himalayan Glaciers
      - Lake Titicaca
      - Lake Winnipeg
      - Mexican Gray Wolf
      - Mountain Ash
      - Pine Island Glacier
      - Polar Bear
      - Polylepis rugulosa
      - Snow Bunting
      - Snow Leopard`;
  } else if (output > 16.7 && output <= 17) {
    imageUrl = '/32-34.png';
    threat = 'Here are the names of each image in the picture:';
    description = `
      - Alpine Marmot
      - Amazon Rainforest
      - Amazon River
      - Bluebunch Wheatgrass
      - Boreal Forests
      - Clouded Leopard
      - European Olive Tree
      - Monkey Puzzle Tree
      - Quiver Tree
      - Red Panda
      - Sunderbans Mangrove Forests`;
  } else if (output > 17 && output <= 36) {
    imageUrl = '/34-36.png';
    threat = 'Here are the names of each image in the picture:';
    description = `
      - American Pika
      - Giant Sequoia
      - Golden Toad
      - Great Salt Lake
      - Hawaiian Silversword
      - Indus River
      - Japanese Larch
      - Kakapo Parrot
      - Lake Baikal
      - Lake Chad`;
  } else if (output > 36 && output <= 38) {
    imageUrl = '/36-38.png';
    threat = 'Here are the names of each image in the picture:';
    description = `
      - Baobab Tree
      - Black Spruce
      - Clown Fish
      - Colorado River
      - Dead Sea
      - European Rabbit
      - Iberian Lynx
      - Lake Victoria
      - Leatherback Sea Turtle
      - Panda
      - Snow Lotus
      - Staghorn Coral
      - Thwaites Glacier
      - Yangtze River`;
  } else if (output > 38 && output <= 40) {
    imageUrl = '/38-40.png';
    threat = 'Here are the names of each image in the picture:';
    description = `
      - Alpine Blue-Sow Thistle
      - Bethelem Lily
      - Congo Rainforest
      - Daintree Rainforest
      - Fraser Fir
      - Ganges River Dolphin
      - Great Bear Lake
      - Lake Tanganyika
      - Mountain Gorilla
      - Rio Grande
      - Rocky Mountain Bristlecone Pine
      - Saiga Antelope
      - Western Prairie Fringed Orchid
      - Royal Bengal Tiger`;
  } else {
    imageUrl = '/default.jpg';
    threat = 'Unknown';
    description = 'Weather conditions are unknown for this range.';
  }

  if (onlyText) {
    return (
      <Box
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          padding: 2,
          borderRadius: 2,
          boxShadow: 1,
          maxWidth: '100%',
          fontFamily: 'Lato, sans-serif',
        }}
      >
        <Typography variant="h6" fontWeight="bold" sx={{ fontFamily: 'Lato, sans-serif' }}>
          {threat}
        </Typography>
        <Typography variant="body1" color="textSecondary" sx={{ whiteSpace: 'pre-line', fontFamily: 'Lato, sans-serif' }}>
          {description}
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      sx={{
        fontFamily: 'Lato, sans-serif',
      }}
    >
      {!onlyImage && (
        <Box
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            padding: 2,
            borderRadius: 2,
            boxShadow: 3,
            marginBottom: 2,
          }}
        >
          <Typography variant="h6" fontWeight="bold" sx={{ fontFamily: 'Lato, sans-serif' }}>
            {threat}
          </Typography>
          <Typography variant="body1" color="textSecondary" sx={{ whiteSpace: 'pre-line', fontFamily: 'Lato, sans-serif' }}>
            {description}
          </Typography>
        </Box>
      )}
      {!onlyText && (
        <Box
          component="img"
          src={imageUrl}
          alt={description}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: 2,
            boxShadow: 3,
          }}
        />
      )}
    </Box>
  );
}
