const express = require("express")
const router = express.Router();
const uploadMiddleware = require("../utils/handleStorage")
const { getItem, getItems, createItem, deleteItem } = require("../controllers/storage")
const { validatorGetItem } = require('../validators/storage')


router.get("/", getItems)

router.get("/:id", validatorGetItem, getItem)

router.post("/", uploadMiddleware.single("image"), createItem)

router.delete("/:id", validatorGetItem, deleteItem);

module.exports = router;