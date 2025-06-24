import jwt from "jsonwebtoken";
import User from "../models/users.js";

export const protect = async (req, res, next) => {
        let token = req.headers.authorization;

        console.log("🔹 Token Received in Backend:", token);

        if (token && token.startsWith("Bearer ")) {
                try {
                        token = token.split(" ")[1];
                        console.log("✅ Extracted Token:", token);

                        const decoded = jwt.verify(token, process.env.JWT_SECRET);
                        console.log("✅ Decoded Token:", decoded);

                        req.user = await User.findById(decoded.id).select("-password");

                        if (!req.user) {
                                console.log("❌ User Not Found in Database!");
                                return res.status(401).json({ message: "User not found, authorization denied" });
                        }

                        console.log("✅ User Authenticated:", req.user);
                        next();
                } catch (error) {
                        console.error("❌ Token Verification Failed:", error);
                        return res.status(401).json({ message: "Invalid token, authorization denied" });
                }
        } else {
                console.log("❌ No Token Found in Request Headers!");
                return res.status(401).json({ message: "anauthrized access. Please login first!" });
        }
};

// Middleware to check admin role
export const admin = (req, res, next) => {
        if (req.user && req.user.role === "admin") {
                next();
        } else {
                res.status(403).json({ message: "Access denied, admin only" });
        }
};
