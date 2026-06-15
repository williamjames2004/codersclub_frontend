import { useEffect, useState } from "react";
import "./UsersTable.css";

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://codersclub-i9xo.onrender.com/auth/allusers")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setUsers(data.user);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="loader">Loading Users…</div>;
  }

  return (
    <div className="premium-page">
      <h1 className="premium-title">User Management</h1>

      <div className="glass-card glow-border">
        <table className="premium-table">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Name</th>
              <th>Reg No</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Password</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td>{u.user_id}</td>
                <td>{u.username}</td>
                <td>{u.regno}</td>
                <td>{u.email}</td>
                <td>{u.mobileno}</td>
                <td>{u.plain_password}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersTable;
