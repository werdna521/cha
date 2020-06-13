const axios = require('axios');

exports.handler = async (event, context, callback) => {
  const { x, y } = JSON.parse(event.body);
  console.log(event);
  try {
    await axios.post(
      'https://melissa205.000webhostapp.com/recipe/post.php',
      {
        x,
        y,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    console.log('good');
    return callback(null, {
      status: 200,
      message: 'Insert successful.',
    });
  } catch (e) {
    return callback(null, {
      status: 400,
      message: 'Bad request.',
    });
  }
};
