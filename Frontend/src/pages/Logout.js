import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("userToken");
    window.dispatchEvent(new Event("storage")); // Update authentication state
    navigate("/");
  }, []);

  return <p>Logging out...</p>;
};

export default Logout;
