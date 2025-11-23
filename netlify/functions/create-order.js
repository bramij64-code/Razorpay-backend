const Razorpay = require("razorpay");

exports.handler = async (event, context) => {
  try {
    const { amount } = JSON.parse(event.body);

    const razorpay = new Razorpay({
      key_id: "rzp_test_RijubWMRKaDIPB",     // তোমার key_id বসাও
      key_secret: "BwUK1BbSywE3PZ07yHt741r0"           // তোমার key_secret বসাও
    });

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: "receipt123"
    };

    const order = await razorpay.orders.create(options);

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, order })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: err.message })
    };
  }
};
