import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

export default function AdminLogin() {
  const [adminCode, setAdminCode] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://codersclub-i9xo.onrender.com/admin/adminlogin/",
        {
          admin_id: adminCode,
          password: password,
        }
      );

      if (res.data.success) {
        if (res.data.adminType === "Master"){
          navigate("/master", {
          state: {
            adminId: res.data.admin_id,
            adminType: res.data.adminType
          }
        });
        }
        else{
          navigate("/admin", {
          state: {
            adminId: res.data.admin_id,
            adminType: res.data.adminType
          }
        });
        }
      }
    } catch (err) {
      alert("Invalid login");
    }
  };
  return (
    <div className="login">
      <form onSubmit={handleLogin}>
        <h2>Administrator Login</h2>
        <input
          type="text"
          placeholder="Admin Code"
          value={adminCode}
          onChange={(e) => setAdminCode(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
        <p className="forgetpassword" onClick={()=> navigate("/admin/forgotpassword")}>Forget Password?</p>
      </form>
    </div>
  );
}
