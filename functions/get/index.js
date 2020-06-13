const axios = require('axios');

const algorithm = (x, y, numPoints) => {
  console.log(JSON.stringify(x), JSON.stringify(y), numPoints);
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

    return {
      statusCode: 200,
      body: JSON.stringify({
        result: algorithm(
          data.map(({ x }) => x),
          data.map(({ y }) => y),
          data.length,
        ),
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
