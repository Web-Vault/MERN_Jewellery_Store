const API_URL = `${process.env.REACT_APP_API_URL}/api`;

export const fetchWithAuth = async (endpoint, options = {}) => {
        const token = localStorage.getItem("userToken");
        const headers = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
        };

        const response = await fetch(`${API_URL}${endpoint}`, {
                ...options,
                headers: { ...headers, ...options.headers },
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Request failed");
        return data;
};
