const talkValidation = (req, res, next) => {
  const { talk } = req.body;
  if (!talk || !talk.watchedAt || talk.rate === undefined) {
    return res.status(400).json(
      { message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' },
    );
  }
  next();
};

const watchedAtRateValidation = (req, res, next) => {
  const { talk: { rate, watchedAt } } = req.body;
  if (rate < 1 || rate > 5 || rate === 0) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  const validDate = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/; // Regex from SO
  if (!validDate.test(watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
}; 

module.exports = { talkValidation, watchedAtRateValidation };