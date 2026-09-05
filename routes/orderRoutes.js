const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../middlewares/authMiddleware');

let orders = [
    { id: 1, bookId: 101, userId: 1, quantity: 1, status: "Shipped" },
    { id: 2, bookId: 105, userId: 2, quantity: 3, status: "Processing" }
];

router.get('/', authenticateUser, (req, res) => res.status(200).json(orders));
router.get('/:id', authenticateUser, (req, res) => {
    const order = orders.find(o => o.id === parseInt(req.params.id));
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.status(200).json(order);
});
router.post('/', authenticateUser, (req, res) => {
    const newOrder = {
        id: orders.length ? orders[orders.length - 1].id + 1 : 1,
        bookId: req.body.bookId,
        userId: req.body.userId,
        quantity: req.body.quantity || 1,
        status: req.body.status || "Pending"
    };
    orders.push(newOrder);
    res.status(201).json(newOrder);
});

module.exports = router;