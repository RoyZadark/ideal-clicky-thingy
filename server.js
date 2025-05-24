const express = require('express');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// ✅ Replace this with your actual Google Apps Script Web App URL
const GAS_URL = 'https://script.google.com/macros/s/AKfycbzo9oT7B8xPuPsBo8-4yvDMjNuSXTE-4AKRzZu78w1-bGFrLJUPE3P-TJUTbEyWTmFD/exec';

app.post('/', async (req, res) => {
  try {
    const response = await fetch(GAS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });

    const text = await response.text();
    res.status(response.status).send(text);
  } catch (error) {
    console.error('Relay Error:', error);
    res.status(500).send('Relay server encountered an error.');
  }
});

app.get('/', (req, res) => {
  res.send('✅ Relay is active. You can POST here from LSL.');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Relay server listening on port ${port}`);
});
