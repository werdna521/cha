const axios = require('axios');

const algorithm = (x, y, numPoints) => {
  let area = 0;
  let j = numPoints - 1;

  for (let i = 0; i < numPoints; ++i) {
    area += (x[j] + x[i]) * (y[j] - y[i]);
    j = i;
  }
  return area / 2;
};

exports.handler = async (event, context, callback) => {
  try {
    const {
      data: { data },
    } = await axios.get('https://melissa205.000webhostapp.com/recipe/get.php');

    const calculated = algorithm(
      data.map(({ x }) => x),
      data.map(({ y }) => y),
      data.length,
    );

    await axios.post('https://melissa205.000webhostapp.com/recipe/clear.php');

    await axios.post(
      'https://melissa205.000webhostapp.com/recipe/calculate.php',
      {
        value: calculated,
      },
      { 'Content-Type': 'application/json' },
    );

    return {
      statusCode: 200,
      body: JSON.stringify({
        data: 'Delete successful.',
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
