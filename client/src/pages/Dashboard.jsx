import axios from "axios";
import { useEffect, useState } from "react";

export function Dashboard() {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchUserData() {
      const token = localStorage.getItem(
        import.meta.env.VITE_LOCAL_STORAGE_TOKEN_NAME
      );

      const USER_DASHBOARD_URI = import.meta.env.VITE_USER_DASHBOARD_URI;

      if (!token) {
        setError("No token found. Please login.");
        return;
      }

      try {
        const res = await axios.get(USER_DASHBOARD_URI, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setName(res.data.fullName); 
      } catch (err) {
        console.error("Dashboard fetch error:", err);
        setError(err.response?.data?.error || "Failed to fetch dashboard data");
      }
    }
    fetchUserData();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      {error ? <p style={{ color: "red" }}>{error}</p> : <p>{name}</p>}
    </div>
  );
}
