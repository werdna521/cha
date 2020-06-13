const axios = require('axios');

exports.handler = (event, context, callback) => {
  const { x, y } = JSON.stringify(event.body);

  axios
    .post(
      'https://melissa205.000webhostapp.com/recipe/post.php',
      {
        x,
        y,
      },
      { 'Content-Type': 'application/json' },
    )
    .then(() => {
      return {
        status: 200,
        message: 'Insert successful.',
      };
    })
    .catch((err) => {
      console.log(err);
      return {
        status: 400,
        message: 'Bad Request',
      };
    });
};
