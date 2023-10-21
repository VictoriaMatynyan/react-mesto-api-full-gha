// 'http://projectmesto.nomoredomainsrocks.ru'
// const allowedCors = [
//   'http://mestoproject.nomoredomainsrocks.ru',
//   'https://mestoproject.nomoredomainsrocks.ru',
//   'http://localhost:3000',
//   'https://localhost:3000',
//   'http://127.0.0.1:3000',
//   'https://127.0.0.1:3000',
//   'http://localhost:5173',
//   'https://localhost:5173',
//   'http://158.160.59.207',
//   'https://158.160.59.207',
// ];

// module.exports = (req, res, next) => {
//   // сохраняем источник запроса в переменную origin
//   const { origin } = req.headers;
//   // сохраняем тип запроса (HTTP-метод) в соответствующую переменную
//   const { method } = req;

//   const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
//   const requestHeaders = req.headers['access-control-request-headers'];
//   // проверяем, что источник запроса есть среди разрешённых
//   if (allowedCors.includes(origin)) {
//     // устанавливаем заголовок, который разрешает браузеру запросы с этого источника
//     res.header('Access-Control-Allow-Origin', origin);
//   }
//   // если предварительный запрос - добавляем нужные заголовки
//   if (method === 'OPTIONS') {
//     // разрешаем кросс-доменные запросы любых типов (по умолчанию)
//     res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
//     // разрешаем кросс-доменные запросы с этими заголовками
//     res.header('Access-Control-Allow-Headers', requestHeaders);
//     // завершаем обработку запроса и возвращаем результат клиенту
//     return res.end();
//   }
//   return next();
// };
// module.exports = (req, res, next) => {
//   const { origin } = req.headers;
//   const { method } = req;
//   const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
//   const requestHeaders = req.headers['access-control-request-headers'];
//   if (allowedCors.includes(origin)) {
//     res.header('Access-Control-Allow-Origin', origin);
//     res.header('Access-Control-Allow-Credentials', true);
//   }
//   if (method === 'OPTIONS') {
//     res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
//     res.header('Access-Control-Allow-Headers', requestHeaders);
//     return res.end();
//   }
//   return next();
// };
const cors = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');

  const { method } = req; // Сохраняем тип запроса (HTTP-метод) в соответствующую переменную
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    // разрешаем кросс-доменные запросы с этими заголовками
    res.header('Access-Control-Allow-Headers', requestHeaders);
    // завершаем обработку запроса и возвращаем результат клиенту
    return res.end();
  }

  return next();
};

module.exports = cors;
