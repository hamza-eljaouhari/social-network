
const express           = require('express');
const router            = express.Router();
const mainController    = require('../controllers/mainController')
const webMiddleware     = require('../middleware/web');

router.get('/',webMiddleware.checkJWT,mainController.index)

module.exports = router;