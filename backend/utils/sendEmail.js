const transporter = require("../config/email");

const sendEmail = async ({ to, subject, html }) => {
  const mailOptions = {
    from: `"GreenGrid" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;