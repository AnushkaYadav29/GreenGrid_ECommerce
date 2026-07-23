const orderConfirmationTemplate = (order) => {

  const productRows = order.orderItems
    .map(
      (item) => `
      <tr>
        <td style="padding:10px;border:1px solid #ddd;">
          ${item.product.name}
        </td>

        <td style="padding:10px;border:1px solid #ddd;text-align:center;">
          ${item.quantity}
        </td>

        <td style="padding:10px;border:1px solid #ddd;text-align:right;">
          ₹${item.price}
        </td>
      </tr>
    `
    )
    .join("");

  return `
  <div style="font-family:Arial,sans-serif;max-width:700px;margin:auto;">

      <h1 style="color:#2E7D32;">
          GreenGrid 🌱
      </h1>

      <h2>
          Order Confirmation
      </h2>

      <p>
          Hello <strong>${order.user.name}</strong>,
      </p>

      <p>
          Thank you for shopping with GreenGrid.
          Your order has been placed successfully.
      </p>

      <hr>

      <p>
          <strong>Order ID:</strong>
          ${order._id}
      </p>

      <table
      style="
      width:100%;
      border-collapse:collapse;
      margin-top:20px;
      ">

      <thead>

      <tr style="background:#2E7D32;color:white;">

          <th style="padding:10px;">Product</th>

          <th style="padding:10px;">Qty</th>

          <th style="padding:10px;">Price</th>

      </tr>

      </thead>

      <tbody>

      ${productRows}

      </tbody>

      </table>

      <h3 style="margin-top:25px;">
          Order Summary
      </h3>

      <p>
          Total :
          <strong>
          ₹${order.totalPrice}
          </strong>
      </p>

      <p>
          Payment :
          ${order.paymentMethod}
      </p>

      <p>
          Status :
          ${order.orderStatus}
      </p>

      <h3>
          Shipping Address
      </h3>

      <p>
          ${order.shippingAddress.fullName}
      </p>

      <p>
          ${order.shippingAddress.address}
      </p>

      <p>
          ${order.shippingAddress.city},
          ${order.shippingAddress.state}
      </p>

      <p>
          ${order.shippingAddress.postalCode}
      </p>

      <p>
          ${order.shippingAddress.country}
      </p>

      <hr>

      <p>
      We'll notify you once your order is shipped.
      </p>

      <p>
      Thank you for choosing GreenGrid 🌿
      </p>

  </div>
  `;
};

module.exports = orderConfirmationTemplate;