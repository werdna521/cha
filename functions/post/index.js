const axios = require('axios');

exports.handler = async (event, context, callback) => {
  const { x, y } = event.queryStringParameters;
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
    return {
      statusCode: 200,
      body: JSON.stringify({
        data: 'Insert successful.',
      }),
    };
  } catch (e) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        data: 'Bad Request.',
      }),
    };
  }
};
