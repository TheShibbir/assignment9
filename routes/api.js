const express = require("express");
const bookController = require("../controllers/bookController");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("api server is running");
});

// books api
router.get("/book", bookController.getBook);
router.post("/book", bookController.createBook);
router.get("/book/:id", bookController.singleBook);
router.put("/book/:id", bookController.updateBook);
router.delete("/book/:id", bookController.deleteBook);

module.exports = router;