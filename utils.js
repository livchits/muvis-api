const { existsSync } = require('fs');

function formatDate(dateString) {
  const options = { month: 'long', day: 'numeric', year: 'numeric' };
  const date = new Date(dateString);
  const formatedDate = new Intl.DateTimeFormat('en-US', options).format(date);
  return formatedDate;
}

function capitalize(word) {
  const letters = word.toLowerCase().split('');
  letters[0] = letters[0].toUpperCase();
  const capitalizeWord = letters.join('');
  return capitalizeWord;
}

function fileNotExists(filePath) {
  return !existsSync(filePath);
}

module.exports = { capitalize, formatDate, fileNotExists };
