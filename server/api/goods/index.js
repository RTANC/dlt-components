const express = require('express')
const router = express.Router()

const { getGoodsCategory } = require('./category/goods.category.controller')

router.get('/category', getGoodsCategory)

module.exports = router