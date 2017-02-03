const connect = require('connect');
const serverStatic = require('serve-static');
const port = process.env.PORT || 3000;

connect().use(serverStatic('./frontend')).listen(port, () => {
  console.log(`Server running on port ${port}`);
});
