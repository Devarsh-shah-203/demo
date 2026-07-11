import transporter from "../config/mailer.js";
import nodemailer from "nodemailer";
import ApiError from "../utils/ApiError.js";

import WelcomeEmail from "../templates/WelcomeEmail.template.js";
import {appointmentConfirmationTemplate} from "../templates/appointmentConfirmation.template.js";

export const sendEmail = async ({
    to,
    subject,
    html,
}) => {
    console.log("Patient email:", to);
    if (!to) {
        throw new ApiError(
            400,
            "Recipient email is required."
        );
    }

    await transporter.sendMail({
        from: process.env.SMTP_FROM,
        to,
        subject,
        html,
    });

};

export const appointmentConfirmationEmail = async ({
    email,
    name,
    date,
    time,
    doctorName,
    queueNo,
    queuePos
}) => {
    await sendEmail({
        to: email,
        subject: "Appointment Confirmed ✅",
        html: appointmentConfirmationTemplate({email,
            name,
            date,
            time,
            doctorName,
            queueNo,
            queuePos})
    });
};

export const signupEmail = async (email, name) => {
    await sendEmail({
        to:email,
        subject:"Welcome to Our Platform",
        html:WelcomeEmail({name})
    })
}

 export const SendVerificationCode = async (UserMail) => {
  const code = String(Math.floor(100000 + Math.random() * 900000));

  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_USER, // sender address
      to: UserMail, // list of recipients
      subject: "Forgot Password", // subject line
      text: `Your verifiaction code : ${code}`, // plain text body
      html: `<b> Your verifiaction code : ${code}</b>`, // HTML body
    });

    console.log("Message sent: %s", info.messageId);
    // Preview URL is only available when using an Ethereal test account
    //console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (err) {
    console.error("Error while sending mail:", err);
  }

  return code;
};