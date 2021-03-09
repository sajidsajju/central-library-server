const express = require("express");
const router = express.Router();
const api = require("../api");

router.post("/register", api.createUser);
router.post("/login", api.loginUser);

router.get("/books", api.getBooks);

router.get("/book/:id", api.getBook);
router.post("/book", api.addBook);
router.put("/book/:id", api.editBook);
router.delete("/book/:id", api.deleteBook);

module.exports = router;
