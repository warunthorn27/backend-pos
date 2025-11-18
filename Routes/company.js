const express = require('express')
const router = express.Router()


const { read, list ,create, remove ,update} = require('../Controllers/company')

router.get("/comp", list)

router.get("/comp/:id", read)

router.post("/comp",create)

router.put("/comp/:id",update)

router.delete("/comp/:id",remove)

module.exports = router