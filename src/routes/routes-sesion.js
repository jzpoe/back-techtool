const express = require('express');
const { registrar } = require('../controllers/inicio-sesion');
const router = express.Router()



router.post('/register', registrar )



module.exports = router


