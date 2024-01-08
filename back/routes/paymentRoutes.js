const { Router } = require("express");
const { check } = require("express-validator");
const { isAuthenticated } = require("../middleware/isAuthenticated");
const { processPaymet, sendStripeApiKey } = require("../controllers/paymentStripeController");
const router = Router();

router.post("/process",[
    isAuthenticated
],processPaymet);
router.get("/stripeapi",[
    isAuthenticated
],sendStripeApiKey);

module.exports = router;