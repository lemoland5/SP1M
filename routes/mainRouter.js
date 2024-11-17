const express = require("express");
const router = express.Router();

const indexRouter = require('./index/indexRouter')
const newsRouter = require('./news/newsRouter')
const contactRouter = require('./contact/contactRouter')
const foodRouter = require('./food/foodRouter')
const docsRouter = require('./docs/docsRouter')
const kadraRouter = require('./kadra/kadraRouter')


router.use('/', indexRouter)
router.use('/news', newsRouter)
router.use('/contact', contactRouter)
router.use('/food', foodRouter)
router.use('/docs', docsRouter)
router.use('/kadra', kadraRouter)


module.exports = router;