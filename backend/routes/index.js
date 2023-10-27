// для улучшения структуры и упрощения масштабирования приложения создаём корневой роутер
const router = require('express').Router();
const authRouter = require('./auth');
const userRouter = require('./users');
const cardRouter = require('./cards');
const auth = require('../middlewares/auth');
const { logout } = require('../controllers/users');

// // краш-тест сервера для ревью
// router.get('/crash-test', () => {
//   setTimeout(() => {
//     throw new Error('Сервер сейчас упадёт');
//   }, 0);
// });

router.use('/', authRouter);

// защищаем роуты авторизацией
router.use('/users', auth, userRouter);
router.use('/cards', auth, cardRouter);
// добавляем роут для выхода из аккаунта
router.get('/signout', auth, logout);

module.exports = router;

// P.S. не забыть передать токен в заголовке Authorization в Postman!
// P.S.S. после сохранения токена в req.cookies, можно ничего не передавать в заголовок
