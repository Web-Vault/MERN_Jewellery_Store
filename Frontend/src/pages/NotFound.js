import React from "react";
import { useNavigate } from "react-router-dom";
import { Home, ArrowLeft, Search } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FAF6F0] flex items-center justify-center p-4">
      {/* Decorative Elements */}
      <div className="fixed top-10 left-10 w-24 h-24 bg-[#B76E79]/10 rounded-full blur-xl"></div>
      <div className="fixed bottom-16 right-16 w-32 h-32 bg-[#C5A880]/10 rounded-full blur-xl"></div>

      <div className="max-w-lg w-full backdrop-blur-sm rounded-2xl p-8">
        <div className="text-center space-y-6">
          {/* 404 Text */}
          <h1 className="text-8xl font-serif text-[#B76E79]">404</h1>
          <div className="space-y-2">
            <h2 className="text-2xl font-serif text-[#6B4E4D]">Page Not Found</h2>
            <p className="text-[#6B4E4D]/80">
              The page you're looking for seems to have vanished into thin air...
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => navigate("/")}
              className="w-full flex items-center justify-center gap-2 py-3 bg-[#B76E79] text-white rounded-lg hover:bg-[#B76E79]/90 transition-colors"
            >
              <Home className="w-5 h-5" />
              <span>Return Home</span>
            </button>

            <div className="flex gap-3">
              <button
                onClick={() => navigate(-1)}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#B76E79]/10 text-[#B76E79] rounded-lg hover:bg-[#B76E79]/20 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Go Back</span>
              </button>
              <button
                onClick={() => navigate("/products")}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#B76E79]/10 text-[#B76E79] rounded-lg hover:bg-[#B76E79]/20 transition-colors"
              >
                <Search className="w-5 h-5" />
                <span>Browse Products</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
