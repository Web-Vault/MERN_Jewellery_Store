import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";

import User from "./src/models/users.js";
import Category from "./src/models/category.js";
import Product from "./src/models/products.js";
import Order from "./src/models/orders.js";
import Cart from "./src/models/cart.js";
import Wishlist from "./src/models/wishlist.js";
import Review from "./src/models/review.js";
import Contact from "./src/models/contact.js";
import Discount from "./src/models/discount.js";
import collection from "./src/models/collection.js";

dotenv.config();
connectDB();

const seedData = async () => {
        try {
                // 🗑 Clear existing data before inserting new records
                await User.deleteMany();
                await Category.deleteMany();
                await Product.deleteMany();
                await Order.deleteMany();
                await Cart.deleteMany();
                await Wishlist.deleteMany();
                await Review.deleteMany();
                await Contact.deleteMany();
                await Discount.deleteMany(); // Clear existing discounts
                await collection.deleteMany();

                // ✅ Insert Users
                const users = await User.insertMany([
                        { name: "Admin User", email: "admin@example.com", password: "123456", phone: "8758499499", address: "Rajkot, Gujarat", role: "admin" },
                        { name: "Aryan Lathigara", email: "aryanlathigara@gmail.com", password: "Aryan_0499", phone: "8758499499", address: "Rajkot, Gujarat", role: "customer" },
                        { name: "Jane Smith", email: "aryansoni0516@gmail.com", password: "Aryan_0499", phone: "8758499499", address: "Rajkot, Gujarat", role: "customer" },
                ]);

                // ✅ Insert Categories
                const categories = await Category.insertMany([
                        { name: "Rings", description: "Beautiful rings collection" },
                        { name: "Necklaces", description: "Elegant necklaces" },
                        { name: "Bracelets", description: "Stylish bracelets" },
                ]);

                // ✅ Insert Products
                const products = await Product.insertMany([
                        { name: "Gold Ring", description: "24K Gold Ring", price: 5000, stock: 10, category: categories[0]._id, images: ["/product_images/rring.png"] },
                        { name: "Golden earrings", description: "fabulous earring suitable for all ocassions", price: 6500, stock: 10, category: categories[0]._id, images: ["/product_images/rgearring.png"] },
                        { name: "Silver Necklace", description: "Sterling Silver Necklace", price: 2000, stock: 5, category: categories[1]._id , images: ["/product_images/rsnecklace.png"]},
                        { name: "Diamond Bracelet", description: "Genuine diamond bracelet", price: 8000, stock: 3, category: categories[2]._id , images: ["/product_images/rganklet.png"]},

                        { name: "Pearl Pendant", description: "Elegant pearl pendant for formal wear", price: 3000, stock: 8, category: categories[1]._id, images: ["/product_images/pearlpendant.png"] },
                        { name: "Rose Gold Chain", description: "Stylish rose gold chain necklace", price: 4500, stock: 6, category: categories[1]._id, images: ["/product_images/rosegoldchain.png"] },
                        { name: "Platinum Ring", description: "Luxury platinum ring for special occasions", price: 12000, stock: 2, category: categories[0]._id, images: ["/product_images/platinumring.png"] },
                        { name: "Emerald Studs", description: "Stunning emerald stud earrings", price: 7000, stock: 4, category: categories[2]._id, images: ["/product_images/emeraldstuds.png"] },
                        { name: "Men's Silver Bracelet", description: "Chunky men's bracelet in sterling silver", price: 3500, stock: 5, category: categories[2]._id, images: ["/product_images/mensbracelet.png"] },
                ]);

                // ✅ Insert Discounts and store them in a variable
                const discounts = await Discount.insertMany([
                        { code: "WELCOME10", type: "percentage", value: 10, minAmount: 100, expiryDate: new Date("2025-12-31"), usageLimit: 50, isActive: true },
                        { code: "FLAT50", type: "fixed", value: 50, minAmount: 300, expiryDate: new Date("2025-06-30"), usageLimit: 30, isActive: true },
                        { code: "SAVE20", type: "percentage", value: 20, minAmount: 200, expiryDate: new Date("2025-09-30"), usageLimit: 100, isActive: true }
                ]);

                // ✅ Use the stored discounts array
                const orders = await Order.insertMany([
                        {
                                user: users[0]._id,
                                items: [
                                        {
                                                product: products[0]._id,
                                                name: products[0].name,
                                                quantity: 1,
                                                price: products[0].price,
                                        },
                                ],
                                totalAmount: products[0].price,
                                paymentId: "TEST_PAYMENT_1",
                                discountCode: discounts[1].code, // ✅ Now correctly referencing the discount
                                paymentStatus: "Paid",
                                orderStatus: "Confirmed",
                        },
                        {
                                user: users[1]._id,
                                items: [
                                        {
                                                product: products[1]._id,
                                                name: products[1].name,
                                                quantity: 1,
                                                price: products[1].price,
                                        },
                                ],
                                totalAmount: products[1].price,
                                paymentId: "TEST_PAYMENT_2",
                                discountCode: discounts[1].code, // ✅ Now correctly referencing the discount
                                paymentStatus: "Unpaid",
                                orderStatus: "Pending",
                        },
                ]);

                // ✅ Insert Cart (Ensure Correct Schema)
                await Cart.insertMany([
                        {
                                userId: users[1]._id, // ✅ Ensure userId is correctly referenced
                                products: [
                                        {
                                                product: products[1]._id, // ✅ Ensure `product` field is correct
                                                name: products[1].name,
                                                price: products[1].price,
                                                quantity: 2,
                                        },
                                ],
                        },
                        {
                                userId: users[2]._id, // ✅ Ensure userId is correctly referenced
                                products: [
                                        {
                                                product: products[2]._id, // ✅ Ensure `product` field is correct
                                                name: products[2].name,
                                                price: products[2].price,
                                                quantity: 1,
                                        },
                                ],
                        },
                ]);

                // ✅ Insert Reviews
                await Review.insertMany([
                        { user: users[1]._id, product: products[0]._id, order: orders[0]._id, rating: 5, comment: "Amazing quality!" },
                        { user: users[2]._id, product: products[1]._id, order: orders[0]._id, rating: 4, comment: "Looks great, but slightly expensive." },
                ]);

                // ✅ Insert Contact Messages
                await Contact.insertMany([
                        { name: "Alice Johnson", email: "alice@example.com", message: "Can you provide more details on your return policy?" },
                        { name: "Bob Williams", email: "bob@example.com", message: "Do you offer gift wrapping?" },
                ]);

                const collectionData = await collection.insertMany([
                        {
                                collectionName: "Eternal Bridal",
                                collectionDescription: "Timeless elegance for your forever moment",
                                collectionBannerImage: "collectionBanner1.png",
                                collectionProducts: [
                                        {
                                                productName: "Handmade Rose Gold Earrings for Special Occasions",
                                                productImage: "product1.png",
                                                productPrice: 15000,
                                        },
                                        {
                                                productName: "Elegant Pearl Necklace with Diamond Pendant",
                                                productImage: "product2.png",
                                                productPrice: 25000,
                                        },
                                        {
                                                productName: "Gold-Plated Bridal Bracelet with Ruby Stones",
                                                productImage: "product3.png",
                                                productPrice: 18000,
                                        },
                                        {
                                                productName: "Crystal Embellished Tiara for Brides",
                                                productImage: "product4.png",
                                                productPrice: 12000,
                                        },
                                        {
                                                productName: "Luxury Wedding Ring with Sapphire",
                                                productImage: "product5.png",
                                                productPrice: 40000,
                                        }
                                ]
                        },
                        {
                                collectionName: "Royal Heritage",
                                collectionDescription: "A majestic touch to your regal attire",
                                collectionBannerImage: "collectionBanner2.png",
                                collectionProducts: [
                                        {
                                                productName: "Vintage Gold Choker with Emeralds",
                                                productImage: "product6.png",
                                                productPrice: 30000,
                                        },
                                        {
                                                productName: "Kundan Jhumka Earrings with Pearl Drops",
                                                productImage: "product7.png",
                                                productPrice: 22000,
                                        },
                                        {
                                                productName: "Designer Maang Tikka with Swarovski Crystals",
                                                productImage: "product8.png",
                                                productPrice: 15000,
                                        },
                                        {
                                                productName: "Traditional Polki Necklace Set",
                                                productImage: "product9.png",
                                                productPrice: 28000,
                                        },
                                        {
                                                productName: "Handcrafted Gold Bangles with Meenakari Work",
                                                productImage: "product10.png",
                                                productPrice: 35000,
                                        }
                                ]
                        },
                        {
                                collectionName: "Modern Minimalist",
                                collectionDescription: "Sleek and stylish jewelry for the contemporary soul",
                                collectionBannerImage: "collectionBanner3.png",
                                collectionProducts: [
                                        {
                                                productName: "Silver Hoop Earrings with Cubic Zirconia",
                                                productImage: "product11.png",
                                                productPrice: 12000,
                                        },
                                        {
                                                productName: "Rose Gold Chain Bracelet with Minimalist Design",
                                                productImage: "product12.png",
                                                productPrice: 14000,
                                        }
                                ]
                        }
                ]);

                // ✅ Insert Wishlist
                await Wishlist.insertMany([
                        {
                                user: users[1]._id,
                                products: [
                                        { product: products[0]._id, productModel: "Product" },
                                        { product: products[1]._id, productModel: "Product" },
                                ],
                        },
                        {
                                user: users[2]._id,
                                products: [
                                        { product: collectionData[0].collectionProducts[0]._id, productModel: "Collection" },
                                        { product: collectionData[0].collectionProducts[1]._id, productModel: "Collection" },
                                ],
                        },
                ]);

                console.log("✅ Data Inserted Successfully!");
                process.exit();
        } catch (error) {
                console.error("❌ Error Seeding Data:", error);
                process.exit(1);
        }
};

// ✅ Run Seeder Function
seedData();
