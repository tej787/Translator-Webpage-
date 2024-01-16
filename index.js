const axios = require('axios');
const express = require('express');
const cors = require('cors');

const app = express();

// Apply CORS middleware
app.use(cors());
app.use(express.json()); // Parse JSON in the request body

app.listen(4000, () => {
  console.log('Server Works !!! At port 4000');
});

app.post('/translate', async (req, res) => {
  try {
    // Extract parameters from request body
    const { inputText, inputLanguage, outputLanguage } = req.body;
    console.log(inputText, inputLanguage, outputLanguage);
    // Check if inputText is provided
    if (!inputText) {
      return res.status(400).send('Input text is required');
    }

    const data = await fetchData(inputText, inputLanguage, outputLanguage);
    // X

    // Find the match with id 0
    const desiredMatch =  data.matches.find(match => match.id === 0)||data.matches[0];

    if (desiredMatch) {
      res.status(200).json({ translatedText: desiredMatch.translation });
    } else {
      res.status(404).json({ error: 'Translation not found for the specified id' });
    }
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const fetchData = async (data, inputLanguage, outputLanguage) => {
  const options = {
    method: 'GET',
    url: 'https://translated-mymemory---translation-memory.p.rapidapi.com/get',
    params: {
      langpair: `${inputLanguage}|${outputLanguage}`,
      q: `${data}`,
      mt: '1',
      onlyprivate: '0',
      de: 'a@b.c',
    },
    headers: {
      'X-RapidAPI-Key': 'e4c6e3d3d3msh5f778f753d55914p162d3djsn8aeee885230c',
      'X-RapidAPI-Host': 'translated-mymemory---translation-memory.p.rapidapi.com'
    },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error.message);
    throw new Error('Failed to fetch data from the translation API');
  }
};