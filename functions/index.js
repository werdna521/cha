const axios = require('axios');

exports.handler = (event, context, callback) => {
  const { x, y } = JSON.stringify(event.body);

  axios
    .post('https://melissa205.000webhostapp.com/recipe/post.php', {
      x,
      y,
    })
    .then(() => {
      callback(null, {
        status: 200,
        message: 'Insert successful.',
      });
    })
    .catch((err) => {
      callback(null, {
        status: 400,
        message: 'Bad Request',
      });
    });
};
