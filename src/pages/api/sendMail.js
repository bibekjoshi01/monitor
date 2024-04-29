import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, subject, message } = req.body;

    // Create a nodemailer transporter using your email provider's SMTP settings
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "merakitechs.np@gmail.com",
        pass: "password",
      },
    });

    // Send email
    const mailOptions = {
      from: "merakitechs.np@gmail.com",
      to: email,
      subject: subject,
      text: message,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ message: "Error sending email" });
      } else {
        console.log("Email sent:", info.response);
        res.status(200).json({ message: "Email sent successfully!" });
      }
    });
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
