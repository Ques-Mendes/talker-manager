const express = require('express');

const fs = require('fs');

const route = express.Router();

const middlewares = require('../middlewares');

route.get('/', (_req, res) => {
  const talker = JSON.parse(fs.readFileSync('talker.json', 'utf-8'));
  res.status(200).json(talker);
  if (!talker.length) return res.status(200).json([]);
});

route.get('/:id', (req, res) => {
  const { id } = req.params;
  const talker = JSON.parse(fs.readFileSync('talker.json', 'utf-8'));
  const talkerById = talker.filter((t) => t.id === parseInt(id, 10)); 

  if (!talkerById.length) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  res.status(200).json(talker[0]);
});

route.post('/', middlewares.authorization, middlewares.nameValidation,
middlewares.ageValidation, middlewares.talkValidation, (req, res) => {
  const { name, age, talk } = req.body;
  const { watchedAt, rate } = talk;
  const talker = JSON.parse(fs.readFileSync('talker.json', 'utf-8'));
  const id = talker.length + 1;
  const newTalker = [...talker, { name, age, id, talk: { watchedAt, rate } }];
  fs.writeFileSync('talker.json', JSON.stringify(newTalker));
  return res.status(201).json({ name, age, id, talk: { watchedAt, rate } });
});

module.exports = route;