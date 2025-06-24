import User from "../models/users.js"; // Ensure correct path
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const registerUser = async (req, res) => {
        try {
                const { name, email, password } = req.body;

                if (!name || !email || !password) {
                        return res.status(400).json({ message: "All fields are required" });
                }

                // Check if user already exists
                const userExists = await User.findOne({ email });
                if (userExists) {
                        return res.status(400).json({ message: "User already exists" });
                }

                // Hash password
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);

                // Create user
                const newUser = new User({
                        name,
                        email,
                        password: hashedPassword,
                });

                await newUser.save();

                // Generate token
                const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
                        expiresIn: "30d",
                });

                res.status(201).json({
                        message: "User registered successfully",
                        user: {
                                id: newUser._id,
                                name: newUser.name,
                                email: newUser.email,
                                token,
                        },
                });
        } catch (error) {
                console.error(error);
                res.status(500).json({ message: "Server error" });
        }
};


// Login user
export const loginUser = async (req, res) => {
        try {
                const { email, password } = req.body;

                // Check if user exists
                const user = await User.findOne({ email });
                if (!user) {
                        return res.status(404).json({ message: "Invalid email or password" });
                }

                // Validate password
                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch) {
                        return res.status(400).json({ message: "Invalid email or password" });
                }

                // Generate JWT token
                const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
                        expiresIn: "7d",
                });

                res.json({
                        message: "Login successful",
                        user: {
                                id: user._id,
                                name: user.name,
                                email: user.email,
                                token,
                        },
                });
        } catch (error) {
                console.error("Error logging in:", error);
                res.status(500).json({ message: "Error logging in", error: error.message });
        }
};

// Get user by ID
export const getUserById = async (req, res) => {
        try {
                console.log("🔍 Fetching user with ID:", req.user._id);

                const user = await User.findById(req.user._id).select("-password");

                if (!user) {
                        console.error("❌ User not found!");
                        return res.status(404).json({ message: "User not found" });
                }

                console.log("✅ User Data Found:", user);
                res.json(user);
        } catch (error) {
                console.error("❌ Error fetching user:", error);
                res.status(500).json({ message: "Server error fetching user" });
        }
};

// 
export const getUserProfile = async (req, res) => {
        try {
                const user = await User.findById(req.user._id).select("-password");
                if (!user) return res.status(404).json({ message: "User not found" });
                res.json(user);
        } catch (error) {
                res.status(500).json({ message: "Server error fetching user profile" });
        }
};

export const updateUserProfile = async (req, res) => {
        try {
                const user = await User.findById(req.user._id);
                if (!user) return res.status(404).json({ message: "User not found" });

                user.name = req.body.name || user.name;
                user.email = req.body.email || user.email;
                user.phone = req.body.phone || user.phone;
                user.address = req.body.address || user.address;

                if (req.body.password) {
                        const salt = await bcrypt.genSalt(10);
                        user.password = await bcrypt.hash(req.body.password, salt);
                }

                const updatedUser = await user.save();
                res.json(updatedUser);
        } catch (error) {
                res.status(500).json({ message: "Server error updating profile" });
        }
};


// Get all users (Admin only)
export const getAllUsers = async (req, res) => {
        try {
                const users = await User.find().select("-password");
                res.status(200).json(users);
        } catch (error) {
                res.status(500).json({ message: "Error fetching users", error });
        }
};


// Delete user (Admin only)

export const deleteUser = async (req, res) => {
        try {
                const user = await User.findById(req.params.id);

                if (!user) {
                        return res.status(404).json({ message: "User not found" });
                }

                await user.deleteOne(); // Correct method to delete the user

                res.status(200).json({ message: "User removed successfully" });
        } catch (error) {
                console.error("Error deleting user:", error);
                res.status(500).json({ message: "Server error. Unable to delete user." });
        }
};


// update user (Admin only)
export const updateUser = async (req, res) => {
        const user = await User.findById(req.params.id);

        if (user) {
                user.name = req.body.name || user.name;
                user.email = req.body.email || user.email;
                user.role = req.body.isAdmin !== undefined ? req.body.isAdmin : user.isAdmin;

                const updatedUser = await user.save();
                res.json({
                        _id: updatedUser.id,
                        name: updatedUser.name,
                        email: updatedUser.email,
                        role: updatedUser.isAdmin,
                });
        } else {
                res.status(404);
                throw new Error("User not found");
        }
};

// create user (Admin only)
export const createUser = async (req, res) => {
        try {
                const { name, email, password, address, phone, role } = req.body;

                // Check if the user already exists
                const existingUser = await User.findOne({ email });

                if (existingUser) {
                        return res.status(400).json({ message: "User already exists" });
                }
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);

                // Create a new user (password will be hashed in the model)
                const newUser = new User({
                        name,
                        email,
                        password: hashedPassword, // No need to hash here; it's handled in the model
                        address,
                        phone,
                        role: role || "customer",
                });

                await newUser.save();

                res.status(201).json({ message: "User created successfully", user: newUser });
        } catch (error) {
                res.status(500).json({ message: "Server error", error });
        }
};


export const adminLogin = async (req, res) => {
        const { email, password } = req.body;

        try {
                // Check if admin exists
                const admin = await User.findOne({ email });

                if (!admin) {
                        return res.status(404).json({ message: "Admin not found" });
                }

                // Directly compare passwords (Since it's stored in plain text)
                // const isMatch = await admin.matchPassword(password);
                // if (!isMatch) {
                //         return res.status(401).json({ message: "Invalid credentials" });
                // }

                // Generate a JWT Token
                const token = jwt.sign({ id: admin._id, role: "admin" }, process.env.JWT_SECRET, {
                        expiresIn: "1d",
                });

                res.status(200).json({ token, admin });
        } catch (error) {
                res.status(500).json({ message: "Server Error", error });
        }
};

