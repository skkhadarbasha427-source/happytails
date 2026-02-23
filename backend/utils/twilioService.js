const twilio = require('twilio');

// Initialize Twilio client only if credentials are provided
let client = null;
if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
  client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );
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
