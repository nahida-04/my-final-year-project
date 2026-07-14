import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

/* ================================
   PLACE ORDER (COD)
================================ */
const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    if (!userId || !items || items.length === 0) {
      return res.json({
        success: false,
        message: "Invalid order data"
      });
    }

    const orderData = {
      userId,
      items, // already structured [{productId, name, price, quantity}]
      address,
      amount,
      paymentMethod: "COD",
      payment: false,
      createdAt: Date.now()
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    // Clear user cart after order
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({
      success: true,
      message: "Order Placed Successfully",
      order: newOrder
    });

  } catch (error) {
    console.log("PlaceOrder Error:", error);
    res.json({
      success: false,
      message: error.message
    });
  }
};

/* ================================
   STRIPE (placeholder)
================================ */
const placeOrderStripe = async (req, res) => {
  res.json({
    success: false,
    message: "Stripe not implemented yet"
  });
};

/* ================================
   RAZORPAY (placeholder)
================================ */
const placeOrderRazorpay = async (req, res) => {
  res.json({
    success: false,
    message: "Razorpay not implemented yet"
  });
};

/* ================================
   GET ALL ORDERS (ADMIN)
================================ */
const allOrder = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      orders
    });

  } catch (error) {
    console.log("AllOrder Error:", error);
    res.json({
      success: false,
      message: error.message
    });
  }
};

/* ================================
   USER ORDERS
================================ */
const userOrder = async (req, res) => {
  try {
    const { userId } = req.body;

    const orders = await orderModel
      .find({ userId })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      orders
    });

  } catch (error) {
    console.log("UserOrder Error:", error);
    res.json({
      success: false,
      message: error.message
    });
  }
};

/* ================================
   UPDATE ORDER STATUS (ADMIN)
================================ */
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    if (!orderId || !status) {
      return res.json({
        success: false,
        message: "Missing data"
      });
    }

    await orderModel.findByIdAndUpdate(orderId, { status });

    res.json({
      success: true,
      message: "Status Updated"
    });

  } catch (error) {
    console.log("UpdateStatus Error:", error);
    res.json({
      success: false,
      message: error.message
    });
  }
};

export {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  allOrder,
  userOrder,
  updateStatus
};