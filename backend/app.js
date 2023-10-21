require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const centralizedErrorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/corsHandler');
const router = require('./routes/index');
const NotFoundError = require('./errors/notFound');
// 127.0.0.1 - вместо localhost, т.к. node -v = 18
const { PORT = 3000, MONGO_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

const app = express();

app.use(cors);

app.use(express.json()); // вместо body parser
app.use(cookieParser());

// подключаем логгер запросов
app.use(requestLogger);

// подключаем корневой роут для пользователей и карточек
app.use(router);
app.use('*', (req, res, next) => next(new NotFoundError('Запрашиваемый ресурс не найден')));

// подключаем логгер ошибок
app.use(errorLogger);

// обработчики ошибок валидации
app.use(errors());
app.use(centralizedErrorHandler);

async function init() {
  await mongoose.connect(MONGO_URL);
  await app.listen(PORT);
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
}

init();
