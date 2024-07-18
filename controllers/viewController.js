const { Distribusi, Review } = require('./../models');
const catchAsync = require('./../utils/catchAsync');

//**************************** EXPORTED FUNCTIONS *********************************/
exports.getBlankPage = (req, res) => {
  res.status(200).render('blank', {
    title: 'Blank Page',
  });
};

exports.getDistribusiPage = catchAsync(async (req, res, next) => {
  const resultQuery = await Distribusi.findAll();
  const resultQueryArr = resultQuery.map((instance) => instance.dataValues);

  res.status(200).render('distribusi', {
    title: 'Halaman Distribusi Kata',
    modelName: 'distribusi',
    distribusiObjArr: resultQueryArr,
  });
});

exports.getReviewPage = catchAsync(async (req, res, next) => {
  const resultQuery = await Review.findAll();
  const resultQueryArr = resultQuery.map((instance) => instance.dataValues);

  res.status(200).render('review', {
    title: 'Halaman Klasifikasi Review',
    modelName: 'review',
    reviewObjArr: resultQueryArr,
    distribusiObjArr: (await Distribusi.findAll()).map((instance) => instance.dataValues),
  });
});
