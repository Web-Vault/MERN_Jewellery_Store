import Contact from "../models/contact.js";

// Create a new contact message
export const createContactMessage = async (req, res) => {
        try {
                const { name, email, message } = req.body;

                if (!name || !email || !message) {
                        return res.status(400).json({ message: "All fields are required" });
                }

                const contact = new Contact({ name, email, message });
                await contact.save();

                res.status(201).json({ message: "Message sent successfully", contact });
        } catch (error) {
                res.status(500).json({ message: "Error sending message", error });
        }
};

// Get all contact messages (Admin only)
export const getAllContactMessages = async (req, res) => {
        try {
                const messages = await Contact.find().sort({ createdAt: -1 });
                res.status(200).json(messages);
        } catch (error) {
                res.status(500).json({ message: "Error fetching messages", error });
        }
};

// Get a single contact message by ID
export const getContactMessageById = async (req, res) => {
        try {
                const { id } = req.params;
                const message = await Contact.findById(id);

                if (!message) {
                        return res.status(404).json({ message: "Message not found" });
                }

                res.status(200).json(message);
        } catch (error) {
                res.status(500).json({ message: "Error fetching message", error });
        }
};

// Delete a contact message (Admin only)
export const deleteContactMessage = async (req, res) => {
        try {
                const { id } = req.params;
                const message = await Contact.findById(id);

                if (!message) {
                        return res.status(404).json({ message: "Message not found" });
                }

                await message.deleteOne();
                res.status(200).json({ message: "Message deleted successfully" });
        } catch (error) {
                res.status(500).json({ message: "Error deleting message", error });
        }
};
