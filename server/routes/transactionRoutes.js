const express = require("express");
const router = express.Router();
const {Auth} = require("../middleware/authMiddleware")
const { getUserTransactions, createTransaction,deleteTransaction,updateTransaction} = require("../controllers/dashBoardController");
const { ErrorHandler } = require("../middleware/ServerErrorHandler");

router.get("/", Auth,getUserTransactions,ErrorHandler);
router.post("/", Auth, createTransaction, ErrorHandler);
router.delete("/", Auth, deleteTransaction, ErrorHandler);
router.patch("/", Auth, updateTransaction, ErrorHandler);

module.exports = router
