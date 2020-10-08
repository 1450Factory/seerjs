const express = require('express')
const {{toCamelCase name}}sController = require('../controllers/{{toCamelCase name}}sController')

const router = express.Router()

router.get('/', {{toCamelCase name}}sController.getAll)
router.get('/:id', {{toCamelCase name}}sController.get)
router.get('/find/:key/:value', {{toCamelCase name}}sController.find)
router.post('/', {{toCamelCase name}}sController.create)
router.put('/:id', {{toCamelCase name}}sController.update)
router.delete('/:id', {{toCamelCase name}}sController.delete)

module.exports = router
