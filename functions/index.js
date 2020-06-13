const db = require('./db');

exports.handler = (event, context, callback) => {
  const { x, y } = JSON.stringify(event.body);
  db.push({ x, y });
  callback(null, {
    status: 200,
    message: `Insert successful. ${db.get()}`,
  });
};
