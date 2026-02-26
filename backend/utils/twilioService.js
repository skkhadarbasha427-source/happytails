const twilio = require('twilio');

// Initialize Twilio client only if valid credentials are provided
let client = null;
const hasValidCredentials = 
  process.env.TWILIO_ACCOUNT_SID && 
  process.env.TWILIO_AUTH_TOKEN &&
  process.env.TWILIO_ACCOUNT_SID !== 'your_twilio_account_sid' &&
  process.env.TWILIO_AUTH_TOKEN !== 'your_twilio_auth_token';

if (hasValidCredentials) {
  try {
    client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );
  } catch (error) {
    console.warn('Twilio initialization failed. SMS features will be disabled.');
  }
}

exports.sendOTP = async (phoneNumber, otp) => {
  try {
    // Development mode: Just log OTP to console
    if (!client || process.env.NODE_ENV === 'development') {
      console.log('\n=================================');
      console.log(`📱 OTP for ${phoneNumber}: ${otp}`);
      console.log('=================================\n');
      return { success: true, message: 'OTP logged to console (dev mode)' };
    }

    // Production mode: Send via Twilio
    const message = await client.messages.create({
      body: `Your Happily Tails verification code is: ${otp}. Valid for 10 minutes.`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber
    });
    return message;
  } catch (error) {
    console.error('Twilio Error:', error);
    throw new Error('Failed to send OTP');
  }
};
