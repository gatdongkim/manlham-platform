// backend/src/utils/email.js
import nodemailer from "nodemailer";

/**
 * Core Email Sender
 */
export const sendEmail = async ({ to, subject, html }) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail', // ✅ Optimized for Gmail App Passwords
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false // Prevents connection drops in local development
    }
  });

  // ✅ Log status to terminal to help you debug the "Something went wrong" error
  try {
    await transporter.verify();
    console.log("✅ Mail Server Connected Successfully");
  } catch (err) {
    console.error("❌ Mail Auth Error:", err.message);
    throw new Error("Email service is currently unavailable.");
  }

  return await transporter.sendMail({
    from: `"Manlham Tech Support" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
};

/**
 * Template: Email Verification
 */
export const generateVerificationEmail = (name, verificationLink) => {
  return `
    <div style="background-color: #f8f9fd; padding: 40px 20px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
      <div style="max-width: 500px; margin: 0 auto; background-color: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 10px 40px rgba(79, 70, 229, 0.05); border: 1px solid #f0f0f0;">
        
        <div style="background-color: #111827; padding: 30px; text-align: center;">
           <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 900; letter-spacing: -1px; font-style: italic;">MANLHAM</h1>
        </div>

        <div style="padding: 40px 30px;">
          <h2 style="color: #111827; font-size: 22px; font-weight: 800; margin-top: 0; letter-spacing: -0.5px;">Verify your email</h2>
          <p style="color: #4b5563; font-size: 16px; line-height: 24px; margin-bottom: 30px;">
            Hi <strong>${name}</strong>, <br/><br/>
            Welcome to the Manlham community! To get started and access your portal, please confirm your email address by clicking the button below.
          </p>

          <div style="text-align: center; margin-bottom: 30px;">
            <a href="${verificationLink}" style="display: inline-block; background-color: #4f46e5; color: #ffffff; padding: 16px 32px; font-size: 14px; font-weight: 700; text-decoration: none; border-radius: 12px; text-transform: uppercase; letter-spacing: 1px; box-shadow: 0 4px 15px rgba(79, 70, 229, 0.3);">
              Verify My Account
            </a>
          </div>

          <p style="color: #9ca3af; font-size: 13px; line-height: 20px;">
            If the button doesn't work, copy and paste this link into your browser:<br/>
            <a href="${verificationLink}" style="color: #4f46e5; text-decoration: none; word-break: break-all;">${verificationLink}</a>
          </p>
        </div>

        <div style="padding: 20px 30px; background-color: #f9fafb; border-top: 1px solid #f0f0f0; text-align: center;">
          <p style="color: #6b7280; font-size: 12px; margin: 0;">
            &copy; 2025 Manlham Tech Support. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  `;
};