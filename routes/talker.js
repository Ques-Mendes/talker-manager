const express = require('express');

const fs = require('fs');

const route = express.Router();

route.get('/', (_req, res) => {
  const talker = JSON.parse(fs.readFileSync('talker.json', 'utf-8'));
  res.status(200).json(talker);
  if (!talker.length) return res.status(200).json([]);
});

route.get('/talker/:id', (req, res) => {
  const { id } = req.params;
  const talker = JSON.parse(fs.readFileSync('talker.json', 'utf-8'));
  const talkerById = talker.filter((t) => t.id === parseInt(id, 10)); 

  if (!talkerById.length) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  res.status(200).json(talker[0]);
});

module.exports = route;