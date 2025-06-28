module.exports = function emailVerificationTemplate(otp) {
    return `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>Verify your Syncode account</h2>
        <p>Use the following OTP to verify your email address:</p>
        <h1 style="color: #4CAF50;">${otp}</h1>
        <p>This OTP is valid for 5 minutes. If you didn’t request this, please ignore this email.</p>
        <br />
        <p>— The Syncode Team</p>
        </div>
    `;
};
