const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors'); // Import the cors package

const app = express();
const port = process.env.PORT || 3000;

// Allow CORS connections from http://localhost:4200
// const corsOptions = {
//   origin: 'http://localhost:4200',
// };
app.use(cors());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// API routes
// Serve static files from the 'images' directory
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));


app.get('/translations', (req, res) => {
  const { languageCode } = req.query;
  const filePath = path.join(__dirname, 'public', languageCode, '_translations.json');

  try {
    const translations = require(filePath);
    res.status(200).json(translations);
  } catch (error) {
    res.status(404).json({ error: 'Translations not found.' });
  }
});

app.get('/galery', (req, res) => {
  const { languageCode } = req.query;
  const filePath = path.join(__dirname, 'public', languageCode, '_galery.json');

  try {
    const galery = require(filePath);
    res.status(200).json(galery);
  } catch (error) {
    res.status(404).json({ error: 'Galery not found.' });
  }
});

app.get('/categories', (req, res) => {
  const { languageCode } = req.query;
  const filePath = path.join(__dirname, 'public', languageCode, '_sidebar.json');

  try {
    const sidebarContent = require(filePath);
    res.status(200).json(sidebarContent);
  } catch (error) {
    res.status(404).json({ error: 'Sidebar content not found.' });
  }
});

app.get('/entry', (req, res) => {
  const { id, languageCode } = req.query;
  const filePath = path.join(__dirname, 'public', languageCode, `${id}.md`);

  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    res.status(200).send(content);
  } catch (error) {
    res.status(404).json({ error: 'Entry not found.' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
