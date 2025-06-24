import sendEmail from "./emailService.js"; // ✅ Correct import

console.log("📩 EMAIL_USER:", process.env.EMAIL_USER);
console.log("🔑 EMAIL_PASS:", process.env.EMAIL_PASS ? "Loaded" : "❌ Not Loaded");

sendEmail(
        "aryansoni0516@gmail.com",
        "Test Email",
        "If you receive this, email sending works!"
).then((res) => console.log(res));
