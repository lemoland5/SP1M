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
const logoutRouter = require('./login/logoutRouter')
const dziennikRouter = require('./dziennik/dziennikRouter')
const profileRouter = require('./dziennik/profileRouter')
const ocenyPanelRouter = require('./dziennik/ocenyPanelRouter')
const frekwencjaPanelRouter = require('./dziennik/frekwencjaPanelRouter')
const uwagiPanelRouter = require('./dziennik/uwagiPanelRouter')
const ocenyRouter = require('./dziennik/ocenyRouter')
const frekwencjaRouter = require('./dziennik/frekwencjaRouter')
const uwagiRouter = require('./dziennik/uwagiRouter')
const pracePanelRouter = require('./dziennik/pracePanelRouter')
const praceRouter = require('./dziennik/praceRouter')
const zastepstwaPanelRouter = require('./dziennik/zastepstwaPanelRouter')
const zastepstwaRouter = require('./dziennik/zastepstwaRouter')
const confirmPanelRouter = require('./dziennik/confirmPanelRouter')
const wiadomosciRouter = require('./dziennik/wiadomosciRouter')
const uczniowieRouter = require('./dziennik/uczniowieRouter')

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
router.use('/logout', logoutRouter)
router.use('/ocenyPanel', ocenyPanelRouter)
router.use('/frekwencjaPanel', frekwencjaPanelRouter)
router.use('/uwagiPanel', uwagiPanelRouter)
router.use('/oceny', ocenyRouter)
router.use('/frekwencja', frekwencjaRouter)
router.use('/uwagi', uwagiRouter)
router.use('/pracePanel', pracePanelRouter)
router.use('/prace', praceRouter)
router.use('/zastepstwaPanel', zastepstwaPanelRouter)
router.use('/zastepstwa', zastepstwaRouter)
router.use('/confirmPanel', confirmPanelRouter)
router.use('/wiadomosci', wiadomosciRouter)
router.use('/uczniowie', uczniowieRouter)

router.use('/download', (req, res) => {
    const file = __dirname + "/../public/" + req.body.file;

    console.log(req.body);

    res.set({
        'Location': "URL://"
    });
    res.download(file);
})


module.exports = router;