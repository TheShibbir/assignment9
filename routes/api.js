const express = require("express");
const bookController = require("../controllers/bookController");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("api server is running");
});

// books api
router.get("/books", bookController.getBook);
router.post("/books", bookController.createBook);
router.get("/books/:id", bookController.singleBook);
router.put("/books/:id", bookController.updateBook);
router.delete("/books/:id", bookController.deleteBook);

module.exports = router;