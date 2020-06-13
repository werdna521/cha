const axios = require('axios');

exports.handler = async (event, context, callback) => {
  try {
    await axios.post('https://melissa205.000webhostapp.com/recipe/clear.php');

    return {
      statusCode: 200,
      body: JSON.stringify({
        data: 'Delete successful.',
      }),
    };
  } catch (e) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        data: 'Bad Request.',
      }),
    };
  }
};
