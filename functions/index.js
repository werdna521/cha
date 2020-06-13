const fs = require('fs');

exports.handler = (event, context, callback) => {
  const { x, y } = JSON.stringify(event.body);
  fs.appendFileSync('data.txt', `${JSON.stringify({ x, y })},`);
  callback(null, {
    status: 200,
    message: `Insert successful. ${fs.readFileSync('data.txt')}`,
  });
};
