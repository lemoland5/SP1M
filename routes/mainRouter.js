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
const projectsRouter = require('./projects/projectsRouter')
const loginRouter = require('./login/loginRouter')
const registerRouter = require('./login/registerRouter')
const dziennikRouter = require('./dziennik/dziennikRouter')
const profileRouter = require('./dziennik/profileRouter')

router.use(express.json())

router.use('/', indexRouter)
router.use('/news', newsRouter)
router.use('/contact', contactRouter)
router.use('/food', foodRouter)
router.use('/docs', docsRouter)
router.use('/kadra', kadraRouter)
router.use('/wymagania', wymaganiaRouter)
router.use('/history', historyRouter)
router.use('/projects', projectsRouter)
router.use('/login', loginRouter)
router.use('/register', registerRouter)
router.use('/dziennik', dziennikRouter)
router.use('/profile', profileRouter)

router.use('/download', (req, res) => {
    const file = __dirname + "/../public/" + req.body.file;

    console.log(req.body);

    res.set({
        'Location': "URL://"
    });
    res.download(file);
})


module.exports = router;