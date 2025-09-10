const multer = require('multer');

const upload = multer({ dest: '/tmp' });

module.exports = upload;


