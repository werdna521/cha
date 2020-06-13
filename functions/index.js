const axios = require('axios');

exports.handler = async (event, context, callback) => {
  const { x, y } = JSON.stringify(event.body);
  console.log(event);
  try {
    await axios.post(
      'https://melissa205.000webhostapp.com/recipe/post.php',
      {
        x,
        y,
      },
      { 'Content-Type': 'application/json' },
    );
    console.log('good');
    callback(null, {
      status: 200,
      message: 'Insert successful.',
    });
  } catch (e) {
    return {
      status: 400,
      message: 'Bad request.',
    };
  }
};
