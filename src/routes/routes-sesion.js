const express = require('express');
const { registrar, sesion } = require('../controllers/inicio-sesion');
const router = express.Router()



router.post('/register', registrar )
router.post('/sesion', sesion )


module.exports = router


