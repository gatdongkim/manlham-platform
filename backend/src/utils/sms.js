import twilio from "twilio";

const client = twilio(
  process.env.TWILIO_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export const sendSMS = async (to, message) => {
  await client.messages.create({
    body: message,
    from: process.env.TWILIO_PHONE,
    to,
  });
};
export const sendVerificationCode = async (to, code) => {
  const message = `Your verification code is: ${code}`;
  await sendSMS(to, message);
}