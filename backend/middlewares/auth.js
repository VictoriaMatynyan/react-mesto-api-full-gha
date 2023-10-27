const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized');

const { JWT_SECRET, NODE_ENV } = process.env;

// module.exports = (req, res, next) => {
//   let payload;
//   try {
//     const { cookies } = req;
//     // достаём авторизационный заголовок, потому что автотесты не пропускают куки
//     const { authorization } = req.headers;

//     if ((authorization && authorization.startsWith('Bearer ')) || (cookies && cookies.jwt)) {
//       const token = authorization ? authorization.replace('Bearer ', '') : cookies.jwt;
//       // верифицируем токен
//       // явно указываем условие NODE_ENV === 'production' чтобы выбрать правильный секретный ключ
//       payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'secret-key');
//       // расширяем объект пользователя - записываем в него payload
//       req.user = payload;
//       next();
//     } else {
//       next(new UnauthorizedError('Неверные авторизационные данные'));
//     }
//   } catch (error) {
//     next(new UnauthorizedError('Неверные авторизационные данные'));
//   }
// };

// авторизация на чистых куках (автотесты не пропускают)
// module.exports = (req, res, next) => {
//   let payload;
//   try {
//     const { cookies } = req;
//     if ((cookies && cookies.jwt)) {
//       const token = cookies.jwt;
//       payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'secret-key');
//       req.user = payload;
//       next();
//     } else {
//       next(new UnauthorizedError('Неверные авторизационные данные'));
//     }
//   } catch (error) {
//     next(new UnauthorizedError('Неверные авторизационные данные'));
//   }
// };

module.exports = (req, res, next) => {
  if (req.cookies.jwt) {
    const token = req.cookies.jwt;
    try {
      const payload = jwt.verify(token, JWT_SECRET);
      req.user = payload;
    } catch (error) {
      next(new UnauthorizedError('Необходима авторизация'));
      return;
    }
  } else {
    next(new UnauthorizedError('Необходима авторизация'));
    return;
  }
  next();
};

// на случай, если нужно будет откатиться на хранение токена в headers:
// module.exports = (req, res, next) => {
//   let payload;
//   try {
//     const { authorization } = req.headers;
//     if ((authorization && authorization.startsWith('Bearer '))) {
//       const token = authorization.replace('Bearer ', '');
//       payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'secret-key');
//       req.user = payload;
//       next();
//     } else {
//       next(new UnauthorizedError('Неверные авторизационные данные'));
//     }
//   } catch (error) {
//     next(new UnauthorizedError('Неверные авторизационные данные'));
//   }
// };
