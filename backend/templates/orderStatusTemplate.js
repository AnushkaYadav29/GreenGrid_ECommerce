const orderStatusTemplate = (order) => {
  return `
  <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:20px;">

    <h1 style="color:#2E7D32;">
      GreenGrid 🌱
    </h1>

    <h2>Order Status Updated</h2>

    <p>Hello <strong>${order.user.name}</strong>,</p>

    <p>Your order status has been updated.</p>

    <table style="width:100%;border-collapse:collapse;margin-top:20px;">
      <tr>
        <td><strong>Order ID</strong></td>
        <td>${order._id}</td>
      </tr>

      <tr>
        <td><strong>Status</strong></td>
        <td style="color:#2E7D32;font-weight:bold;">
          ${order.orderStatus}
        </td>
      </tr>

      <tr>
        <td><strong>Payment</strong></td>
        <td>${order.paymentMethod}</td>
      </tr>

      <tr>
        <td><strong>Total</strong></td>
        <td>₹${order.totalPrice}</td>
      </tr>
    </table>

    <hr>

    <p>
      Thank you for shopping with GreenGrid.
    </p>

  </div>
  `;
};

module.exports = orderStatusTemplate;