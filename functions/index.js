const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);

exports.handler = (event, context, callback) => {
  const { x, y } = JSON.stringify(event.body);

  db.defaults({ data: [] }).write();
  db.get('data').push({ x, y }).write();

  callback(null, {
    status: 200,
    message: `Insert successful. ${JSON.stringify(db.get('data').value())}`,
  });
};
