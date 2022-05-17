const loginValidation = require('./loginValidation');
const nameValidation = require('./nameValidaton');
const authorization = require('./authorization');
const ageValidation = require('./ageValidation');
const { talkValidation, watchedAtRateValidation } = require('./talkValidation');

module.exports = {
  loginValidation,
  nameValidation,
  authorization,
  ageValidation,
  talkValidation,
  watchedAtRateValidation,
};