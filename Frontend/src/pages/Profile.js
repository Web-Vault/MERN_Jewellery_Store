import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MapPin, Phone, Edit, Camera,LogOut } from "lucide-react";


const Profile = () => {
        // profile
        const [user, setUser] = useState(null);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState("");
        // const [reviews, setReview] = useState(null);
        const navigate = useNavigate();

        useEffect(() => {
                const fetchUserProfile = async () => {
                        try {
                                const token = localStorage.getItem("userToken");
                                if (!token) return navigate("/login");

                                const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/profile`, {
                                        headers: { Authorization: `Bearer ${token}` },
                                });
                                setUser(data);
                        } catch (error) {
                                setError("Failed to fetch user profile.");
                        } finally {
                                setLoading(false);
                        }
                };

                // const fetchReviewByUser = async () => {
                //         try {
                //                 // console.log("user: ", user);
                //                 const userId = user._id;
                //                 // console.log("userId", userId);

                //                 const token = localStorage.getItem("userToken");
                //                 if (!token) return navigate("/login");

                //                 const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/review/user/${userId}`, {
                //                         headers: { Authorization: `Bearer ${token}`, "Content-Type": "Application/json" },
                //                 });
                //                 // console.log("data", data); 
                //                 setReview(data);
                //                 // console.log("reviews", reviews);
                //         } catch(error) {
                //                 // console.log("catch block for fetchReviewByUser", error);
                //         }
                // };

                fetchUserProfile();
                // fetchReviewByUser(); 
        }, [navigate]);




        const handleLogout = () => {
                localStorage.removeItem("userToken");
                window.dispatchEvent(new Event("storage")); // Update authentication state
                navigate("/");
        };

        if (loading) return <div className="text-center text-xl mt-10">Loading...</div>;
        if (error) return <div className="text-center text-red-500">{error}</div>;

        return (
                <>
                        <div className="flex justify-center items-center min-h-screen bg-[#FAF6F0] px-4 sm:px-6 relative overflow-hidden">

                                {/* Decorative Elements */}
                                <div className="absolute top-20 left-20 w-48 h-48 bg-[#B76E79]/10 rounded-full blur-2xl"></div>
                                <div className="absolute bottom-32 right-32 w-64 h-64 bg-[#C5A880]/10 rounded-full blur-2xl"></div>

                                {/* Geometric Pattern Background */}
                                <div className="absolute inset-0 opacity-10 [background-image:linear-gradient(to_right,#B76E79_1px,transparent_1px),linear-gradient(to_bottom,#B76E79_1px,transparent_1px)] bg-[size:3rem_3rem]"></div>

                                {/* Profile Container */}
                                <div className="w-full max-w-4xl bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-white/30 p-8 flex flex-col lg:flex-row gap-8 lg:gap-12">

                                        {/* Profile Picture Section */}
                                        <div className="flex flex-col items-center lg:items-start lg:w-1/3">
                                                <div className="relative group">
                                                        <div className="absolute -inset-2 bg-gradient-to-br from-[#B76E79]/20 to-[#C5A880]/20 rounded-full blur-lg"></div>
                                                        <img
                                                                className="w-40 h-40 rounded-full border-4 border-white shadow-xl relative z-10"
                                                                src={`https://ui-avatars.com/api/?name=${user?.name}&background=B76E79&color=fff&bold=true`}
                                                                alt="User Avatar"
                                                        />
                                                        <button className="absolute bottom-2 right-2 z-20 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:scale-105 transition-transform">
                                                                <Camera className="w-6 h-6 text-[#B76E79]" />
                                                        </button>
                                                </div>
                                        </div>

                                        {/* Profile Details Section */}
                                        <div className="flex-1 space-y-8">
                                                {/* Header Section */}
                                                <div className="text-center lg:text-left">
                                                        <h1 className="text-4xl font-serif text-[#6B4E4D] mb-2">{user?.name}</h1>
                                                        <p className="text-lg text-[#6B4E4D]/80">{user?.email}</p>
                                                </div>

                                                {/* Contact Info Card */}
                                                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-inner border border-white/50 space-y-4">
                                                        <div className="flex items-center gap-4 text-[#6B4E4D]">
                                                                <div className="p-2 bg-[#B76E79]/10 rounded-lg">
                                                                        <Phone className="w-6 h-6 text-[#B76E79]" />
                                                                </div>
                                                                <p className="text-lg">{user?.phone || "Not provided"}</p>
                                                        </div>
                                                        <div className="flex items-center gap-4 text-[#6B4E4D]">
                                                                <div className="p-2 bg-[#B76E79]/10 rounded-lg">
                                                                        <MapPin className="w-6 h-6 text-[#B76E79]" />
                                                                </div>
                                                                <p className="text-lg">{user?.address || "Not provided"}</p>
                                                        </div>
                                                </div>

                                                {/* Action Buttons */}
                                                <div className="flex flex-col sm:flex-row gap-4">
                                                        <button
                                                                onClick={() => navigate("/edit-profile")}
                                                                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-br from-[#B76E79] to-[#C5A880] text-white py-3 px-6 rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all"
                                                        >
                                                                <Edit className="w-5 h-5" />
                                                                <span className="font-medium">Edit Profile</span>
                                                        </button>
                                                        <button
                                                                onClick={handleLogout}
                                                                className="flex-1 flex items-center justify-center gap-2 bg-white border border-[#E0D6CC] text-[#6B4E4D] py-3 px-6 rounded-xl hover:bg-[#FAF6F0] hover:border-[#B76E79]/30 transition-all"
                                                        >
                                                                <LogOut className="w-5 h-5" />
                                                                <span className="font-medium">Log Out</span>
                                                        </button>
                                                </div>
                                        </div>
                                </div>
                        </div>


                </>

        );
};

export default Profile;
