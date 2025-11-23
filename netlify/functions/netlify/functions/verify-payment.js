const crypto = require("crypto");

exports.handler = async (event, context) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      JSON.parse(event.body);

    // এখানে তোমার Razorpay SECRET বসাবে (Key secret)
    const key_secret = "BwUK1BbSywE3PZ07yHt741r0";

    const sign = razorpay_order_id + "|" + razorpay_payment_id;

    const expected = crypto
      .createHmac("sha256", key_secret)
      .update(sign.toString())
      .digest("hex");

    if (expected === razorpay_signature) {
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true, message: "Payment Verified" })
      };
    } else {
      return {
        statusCode: 400,
        body: JSON.stringify({ success: false, message: "Invalid Signature" })
      };
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: err.message })
    };
  }
};
