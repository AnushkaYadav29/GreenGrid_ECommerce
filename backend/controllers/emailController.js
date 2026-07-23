const asyncHandler = require("../utils/asyncHandler");
const sendEmail = require("../utils/sendEmail");

exports.sendTestEmail = asyncHandler(async (req, res) => {
  await sendEmail({
    to: process.env.EMAIL_USER,
    subject: "GreenGrid Email Test",
    html: `
      <h2>🎉 Congratulations!</h2>
      <p>Your GreenGrid email configuration is working successfully.</p>
    `,
  });

  res.status(200).json({
    success: true,
    message: "Test email sent successfully",
  });
});