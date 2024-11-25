// src/components/Questionnaire.js
"use client"
import React, { useState } from 'react';
import { Box, Typography, Radio, RadioGroup, FormControlLabel, FormControl, Button, CircularProgress } from '@mui/material';

const questions = [
  {
    question: "How often do you use a car for daily transportation?",
    options: [
      "Never, I use public transport, cycle, or walk",
      "Occasionally (1-2 times a week)",
      "Frequently (3-5 times a week)",
      "Daily",
    ]
  },
  {
    question: "What type of car do you usually drive?",
    options: [
        "i dont own a car",
      "Electric or hybrid",
      "Small, fuel-efficient (compact car)",
      "Medium to big size car",
    
    ]
  },
  {
    question: "How many flights do you take per year?",
    options: [
      "None",
      "1-2 short-haul flights",
      "1-2 long-haul flights",
      "More than 3 flights",
    ]
  },
  {
    question: "What type of energy do you use most at home?",
    options: [
      "100% renewable (solar, wind)",
      "Mostly renewable",
      "Mostly non-renewable (natural gas, oil)",
      "All non-renewable",
    ]
  },
  {
    question: "How often do you eat animal-based products (meat, dairy, eggs)?",
    options: [
      "Rarely or never (plant-based diet)",
      "A few times a week",
      "Daily",
      "Multiple times a day",
    ]
  },
  {
    question: "How energy-efficient is your home lighting?",
    options: [
      "All LED or energy-efficient bulbs",
      "Mostly energy-efficient bulbs",
      "Some energy-efficient, some traditional bulbs",
      "Mostly or all traditional bulbs",
    ]
  },
  {
    question: "How often do you buy new clothes?",
    options: [
      "Once or twice a year",
      "Every few months",
      "Monthly",
      "Weekly",
    ]
  },
  {
    question: "How often do you recycle and compost?",
    options: [
      "Always (both recycling and composting)",
      "Frequently recycle, but rarely compost",
      "Sometimes recycle",
      "Rarely or never recycle or compost",
    ]
  },
  {
    question: "How do you heat and cool your home?",
    options: [
      "Minimal heating/cooling, use fans/blankets as needed",
      "Energy-efficient heating/cooling systems",
      "Regular heating/cooling system, used moderately",
      "Regular heating/cooling system, used extensively",
    ]
  },
  {
    question: "How often do you use single-use plastics (plastic bags, bottles, etc.)?",
    options: [
      "Rarely or never, I use reusable alternatives",
      "Occasionally, but I try to reduce",
      "Frequently, but I recycle most items",
      "Often, without recycling",
    ]
  }
];
export default function Questionnaire() {
    const [answers, setAnswers] = useState(Array(questions.length).fill(null));
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [submitted, setSubmitted] = useState(false);
    const [totalScore, setTotalScore] = useState(0);
    const [carbonFootprint, setCarbonFootprint] = useState('');
    const [loading, setLoading] = useState(false);
  
    const handleOptionChange = (option) => {
      const updatedAnswers = [...answers];
      updatedAnswers[currentQuestion] = option;
      setAnswers(updatedAnswers);
  
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        handleSubmit();
      }
    };
  
    const handleSubmit = () => {
      let score = 0;
      answers.forEach((answer, index) => {
        if (answer !== null) {
          score += questions[index].options.indexOf(answer) + 1;
        }
      });
  
      setTotalScore(score);
      categorizeCarbonFootprint(score);
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setSubmitted(true);
      }, 3000);
    };
  
    const categorizeCarbonFootprint = (score) => {
      if (score >= 0 && score <= 16) {
        setCarbonFootprint("Low Carbon Footprint: You have very eco-friendly habits. Estimated 1-4 tons CO₂/year");
      } else if (score >= 17 && score <= 24) {
        setCarbonFootprint("Moderate-Low Carbon Footprint: Moderately eco-friendly habits, with room for improvement. Estimated 4-8 tons CO₂/year");
      } else if (score >= 25 && score <= 32) {
        setCarbonFootprint("Moderate-High Carbon Footprint: Your habits contribute significantly to your carbon footprint. Estimated 8-12 tons CO₂/year");
      } else if (score >= 33 && score <= 40) {
        setCarbonFootprint("High Carbon Footprint: High environmental impact, consider lifestyle changes. Estimated 12+ tons CO₂/year");
      }
    };
  
    return (
      <Box
        sx={{
          backgroundImage: `url('/earthb2.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          fontFamily: 'Lato, sans-serif', // Apply Lato font to the container
        }}
      >
        <Box
          sx={{
            maxWidth: 800,
            width: '100%',
            padding: 3,
            borderRadius: 2,
            boxShadow: 3,
            textAlign: 'center',
            backgroundColor: 'rgba(144, 201, 186, 0.9)', // Soft pastel blue with slight transparency
          }}
        >
          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" height="200px">
              <CircularProgress />
              <Typography variant="h6" sx={{ marginLeft: 2, fontFamily: 'Lato, sans-serif' }}>
                Calculating your carbon footprint...
              </Typography>
            </Box>
          ) : submitted ? (
            <Box>
              <Typography variant="h6" sx={{ fontFamily: 'Lato, sans-serif', fontWeight:'700', fontSize:'30px'}}>Total Score: {totalScore}/40</Typography>
              <Typography variant="h6" sx={{ marginTop: 2, color: totalScore >= 25 ? 'red' : totalScore >= 17?'yellow': 'green',  fontFamily: 'Lato, sans-serif', fontWeight:'600' , fontSize:'28px'}}>
                {carbonFootprint}
              </Typography>
            </Box>
          ) : (
            <Box>
              <Typography variant="h5" gutterBottom sx={{ fontFamily: 'Lato, sans-serif', fontWeight: '500' }}>
                Question {currentQuestion + 1} of {questions.length}
              </Typography>
              <Typography variant="h6" gutterBottom sx={{ fontFamily: 'Lato, sans-serif', fontWeight: '700' }}>
                {questions[currentQuestion].question}
              </Typography>
              <FormControl component="fieldset">
                <RadioGroup
                  value={answers[currentQuestion] || ""}
                  onChange={(e) => handleOptionChange(e.target.value)}
                >
                  {questions[currentQuestion].options.map((option, optIndex) => (
                    <FormControlLabel
                      key={optIndex}
                      value={option}
                      control={<Radio />}
                      label={option}
                      sx={{ fontFamily: 'Lato, sans-serif' }}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
              <Typography variant="body2" sx={{ marginTop: 2, color: 'gray', fontFamily: 'Lato, sans-serif' }}>
                Please select an option to continue.
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    );
  }
  