const server = require("./src/server");
const { conn } = require('./src/db.js');
const PORT = 3001;
const routes = require('./src/routes/index.js');
const { firstload } = require('./src/utils/countries')

server.use('/', routes);

conn.sync({ force: true }).then(() => {
  firstload();
  server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  })
}).catch(error => console.error(error))


