// In-memory database for testing
let orders = [
    { id: 1, bookId: 101, userId: 1, quantity: 1, status: "Shipped" },
    { id: 2, bookId: 105, userId: 2, quantity: 3, status: "Processing" }
];

// GET all orders
const getAllOrders = (req, res) => {
    res.status(200).json(orders);
};

// GET a single order by ID
const getOrderById = (req, res) => {
    const order = orders.find(o => o.id === parseInt(req.params.id));
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.status(200).json(order);
};

// POST a new order
const createOrder = (req, res) => {
    const newOrder = {
        id: orders.length ? orders[orders.length - 1].id + 1 : 1,
        bookId: req.body.bookId,
        userId: req.body.userId,
        quantity: req.body.quantity || 1,
        status: req.body.status || "Pending"
    };
    orders.push(newOrder);
    res.status(201).json(newOrder);
};

// Export the controller functions
module.exports = {
    getAllOrders,
    getOrderById,
    createOrder
};