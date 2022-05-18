const express = require('express');
const fs = require('fs');
const readTalker = require('../helpers/fileFunction');

const route = express.Router();

const middlewares = require('../middlewares');

route.get('/', (_req, res) => {
  const talker = readTalker();
  if (!talker || talker === '') {
    return res.status(200).json([]);
  }
  return res.status(200).json(talker);
});

route.get('/:id', (req, res) => {
  const { id } = req.params;
  const talker = readTalker();
  const talkerById = talker.filter((t) => t.id === parseInt(id, 10)); 
  if (!talkerById.length) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  res.status(200).json(talker[0]);
});

route.post('/', middlewares.authorization, middlewares.nameValidation,
middlewares.ageValidation, middlewares.talkValidation,
 middlewares.watchedAtRateValidation, (req, res) => {
  const { name, age, talk } = req.body;
  const { watchedAt, rate } = talk;
  const talker = readTalker();
  const id = talker.length + 1;
  const newTalker = [...talker, { name, age, id, talk: { watchedAt, rate } }];
  fs.writeFileSync('talker.json', JSON.stringify(newTalker));
  return res.status(201).json({ name, age, id, talk: { watchedAt, rate } });
});

route.put('/:id', middlewares.authorization, middlewares.nameValidation,
middlewares.ageValidation, middlewares.talkValidation,
 middlewares.watchedAtRateValidation, (req, res) => {
  const { id } = req.params;
  const { name, age, talk: { watchedAt, rate } } = req.body;
  const talker = readTalker();
  const newTalker = [...talker.filter((t) => t.id !== id),
   { name, age, id, talk: { watchedAt, rate } }];
  fs.writeFileSync('talker.json', JSON.stringify(newTalker));
  return res.status(200).json({ name, age, id, talk: { watchedAt, rate } });
});

module.exports = route;