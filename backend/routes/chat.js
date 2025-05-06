const express = require('express');
const { Configuration, OpenAIApi } = require('openai');
const router = express.Router();

// Setup OpenAI configuration with your secret API key
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

// Create an instance of the OpenAI API client
const openai = new OpenAIApi(configuration);

// POST endpoint to interact with ChatGPT
router.post('/chat', async (req, res) => {
  const { message } = req.body;

  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: message,
      max_tokens: 150,
    });

    // Send back only the generated text
    res.json({ reply: response.data.choices[0].text });
  } catch (error) {
    // Send error response
    res.status(500).send('Error communicating with ChatGPT');
  }
});

// Export the router for use in your main server file
module.exports = router;
