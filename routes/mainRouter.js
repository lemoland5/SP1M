const express = require("express");
const router = express.Router();

const indexRouter = require('./index/indexRouter')
const newsRouter = require('./news/newsRouter')
const contactRouter = require('./contact/contactRouter')
const foodRouter = require('./food/foodRouter')
const docsRouter = require('./docs/docsRouter')
const kadraRouter = require('./kadra/kadraRouter')
const wymaganiaRouter = require('./wymagania/wymaganiaRouter')
const historyRouter = require('./history/historyRouter')


router.use('/', indexRouter)
router.use('/news', newsRouter)
router.use('/contact', contactRouter)
router.use('/food', foodRouter)
router.use('/docs', docsRouter)
router.use('/kadra', kadraRouter)
router.use('/wymagania', wymaganiaRouter)
router.use('/history', historyRouter)


module.exports = router;