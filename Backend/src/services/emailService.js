import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const sendEmail = async (to, subject, text) => {
        try {
                const transporter = nodemailer.createTransport({
                        service: "gmail",
                        auth: {
                                user: process.env.EMAIL_USER,
                                pass: process.env.EMAIL_PASS, // ✅ FIXED: Use App Password if Gmail blocks login
                        },
                });

                const mailOptions = {
                        from: process.env.EMAIL_USER,
                        to,
                        subject,
                        text,
                };

                const info = await transporter.sendMail(mailOptions);
                console.log("✅ Email sent:", info.response);
                return { success: true, message: "Email sent successfully" };
        } catch (error) {
                console.error("❌ Error sending email:", error);
                return { success: false, message: "Error sending email" };
        }
};

export default sendEmail;
