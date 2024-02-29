import nodemailer from 'nodemailer';
import dotenv from "dotenv"
dotenv.config();


const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
  
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWPRD,
    },
  });
console.log("next step")
console.log(options.email)
  const mailOptions = {
    from: "krutheesh7@gmail.com",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  console.log("last step")
  try {
    const a = await transporter.sendMail(mailOptions);
  } catch (error) {
    
    console.log(error.message,error.code)
    throw new Error(error.message)
  }
 
 
 
 
};

export default sendEmail
