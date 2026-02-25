const nodemailer = require('nodemailer');

// Create transporter
let transporter = null;

const initializeTransporter = () => {
  const hasValidCredentials = 
    process.env.EMAIL_USER && 
    process.env.EMAIL_PASSWORD &&
    process.env.EMAIL_USER !== 'your_email@gmail.com';

  if (hasValidCredentials) {
    try {
      transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD
        }
      });
      console.log('✅ Email service initialized');
    } catch (error) {
      console.warn('Email service initialization failed. Email features will be disabled.');
    }
  }
};

// Initialize on module load
initializeTransporter();

exports.sendOTP = async (email, otp) => {
  try {
    // Development mode: Just log OTP to console
    if (process.env.NODE_ENV === 'development') {
      console.log('\n=================================');
      console.log(`📧 OTP for ${email}: ${otp}`);
      console.log('=================================\n');
      return { success: true, message: 'OTP logged to console (dev mode)' };
    }

    // Production mode: Send via email
    if (!transporter) {
      console.error('Email transporter not initialized. Check EMAIL_USER and EMAIL_PASSWORD in .env');
      throw new Error('Email service not configured');
    }

    const mailOptions = {
      from: `"Happily Tails" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Your Verification Code - Happily Tails',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4CAF50;">Happily Tails</h2>
          <p>Your verification code is:</p>
          <h1 style="background-color: #f5f5f5; padding: 20px; text-align: center; letter-spacing: 5px;">
            ${otp}
          </h1>
          <p>This code will expire in 10 minutes.</p>
          <p>If you didn't request this code, please ignore this email.</p>
          <hr style="margin-top: 30px; border: none; border-top: 1px solid #ddd;">
          <p style="color: #888; font-size: 12px;">This is an automated message, please do not reply.</p>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent to ${email}: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Email Error:', error.message);
    
    // In development, still allow login by logging OTP
    if (process.env.NODE_ENV === 'development') {
      console.log('\n=================================');
      console.log(`📧 OTP for ${email}: ${otp} (Email failed, using console)`);
      console.log('=================================\n');
      return { success: true, message: 'OTP logged to console (email failed)' };
    }
    
    throw new Error('Failed to send OTP email');
  }
};
