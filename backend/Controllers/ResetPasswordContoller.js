import Student from "../models/Student.js";
import Professor from "../models/Professor.js";
import crypto from "crypto";
import bcrypt from 'bcryptjs';
import nodemailer from "nodemailer";


const sendEmail = async ({ to, subject, text }) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // Use 'Gmail' or a proper SMTP server
    auth: {
      user: process.env.EMAIL, // Your email
      pass: process.env.EMAIL_PASSWORD, // Your app password or email password
    },
  });

  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL, // Sender address
      to, // Receiver address
      subject, // Subject line
      text, // Plain text body
    });
    //console.log('Email sent:', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};




const createPasswordResetToken = function (user) {
    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    user.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // Token valid for 10 minutes
    return resetToken;
}

export const forgorpassfunc = async (req, res) => {
    const { email } = req.body;
    //console.log(email)
    try {
        const userS = await Student.findOne({ email });
        const userP = await Professor.findOne({ email });
        let user = null;
        if (!userS && !userP) {
            return res.status(404).json({ message: 'User not found' });
        }
        else if (!userS) {
            user = userP;
        }
        else user = userS;

        const resetToken = createPasswordResetToken(user);
        await user.save({ validateBeforeSave: false });

        //console.log(user.resetPasswordToken);
        //console.log(user.resetPasswordExpires);
        //console.log(resetToken);
        //console.log('Protocol:', req.protocol); // Should be 'http' or 'https'
        //console.log('Host:', req.get('host')); // Should be 'localhost:5000' or your domain

        const resetURL = `http://localhost:5174/reset-password/${resetToken}`;

        const message = `Forgot your password? Reset it here: ${resetURL}`;
        //console.log(message);
        await sendEmail({ to: email, subject: 'Password Reset', text: message });

        res.status(200).json({ message: 'Reset link sent to email.' });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong.' });
    }
}

export const resetpassfunc = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
    //console.log(token);
    //console.log(password)
  
    try {
      const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
      console.log(hashedToken)
      const userS = await Student.findOne({
        resetPasswordToken: hashedToken,
        resetPasswordExpires: { $gt: Date.now() },
      });

      const userP = await Professor.findOne({
        resetPasswordToken: hashedToken,
        resetPasswordExpires: { $gt: Date.now() },
      });

      let user=null;

      if (!userS && !userP) {
        return res.status(400).json({ message: 'Invalid or expired token.' });
      }
      else if (!userS) {
        user = userP;
      }
      else user = userS;

      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      user.password = hashPassword;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
  
      await user.save();
      res.status(200).json({ message: 'Password reset successful.' });
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong.' });
    }
  }
