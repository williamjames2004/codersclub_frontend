import { useState } from "react";
import "./ChangePassword.css";

const ChangePassword = () => {
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await fetch(
        "https://codersclub-i9xo.onrender.com/admin/changepassword",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            admin_id: adminId,
            password: password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to change password");
      }

      setMessage("Password changed request sent successfully");
      setAdminId("");
      setPassword("");
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cp-wrapper">
      <div className="cp-card">
        <h2 className="cp-title">Change Admin Password</h2>

        <form onSubmit={handleSubmit} className="cp-form">
          <div className="cp-field">
            <label>Admin ID</label>
            <input
              type="text"
              value={adminId}
              onChange={(e) => setAdminId(e.target.value)}
              required
            />
          </div>

          <div className="cp-field">
            <label>New Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Updating..." : "Change Password"}
          </button>
        </form>

        {message && <p className="cp-success">{message}</p>}
        {error && <p className="cp-error">{error}</p>}
      </div>
    </div>
  );
};

export default ChangePassword;