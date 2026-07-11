import nodemailer from "nodemailer";

// code from nodemailer documentation


// Create a transporter using smtp ses etc
// test run with my email
 

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    family: 4, // Force IPv4
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
// to verify
try {
    await transporter.verify();
    console.log("Server is ready to take our messages");
  } catch (err) {
    console.error("Verification failed:", err);
  }


export default transporter;