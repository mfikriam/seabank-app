/* eslint-disable */

function naiveBayes(distribution, textArr) {
  const classNegative = 0.499;
  const classPositive = 0.501;

  const includedWords = [];

  distribution.forEach((dist) => {
    const word = dist.kata;
    if (textArr.includes(word)) {
      includedWords.push(dist);
    }
  });

  if (includedWords.length === 0) return 'positif';

  let negative = classNegative;
  let positive = classPositive;

  includedWords.forEach((data) => {
    negative *= data.negatif;
    positive *= data.positif;
  });

  if (negative > positive) {
    return 'negatif';
  }

  return 'positif';
}

//***************** Exported Functions ********************/
export const classification = (distribution, text) => {
  // Remove non-alphabet characters
  const cleanedText = text.toLowerCase().replace(/[^a-zA-Z ]/g, '');

  // Split text to each word
  const textArr = cleanedText.split(' ');

  // Get sentimen
  const sentimen = naiveBayes(distribution, textArr);

  return sentimen;
};
