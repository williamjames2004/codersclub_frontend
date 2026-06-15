import { useState } from "react";
import axios from "axios";
import PermissionsTable from "./PermissionsTable";
import "../Adminstyles/adminstyle.css";

const admins = ["pf01", "pf02"];

export default function Dev() {
  const [adminId, setAdminId] = useState("");
  const [permissions, setPermissions] = useState({});

  const togglePermission = (key) => {
    setPermissions(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const savePermissions = async () => {
    await axios.post(
      "https://codersclub-i9xo.onrender.com/admin/update-permissions",
      { admin_id: adminId, permissions }
    );
    alert("Permissions updated");
  };

  return (
    <div className="dev-panel">
      <h2>Admin Permission Control</h2>

      <select onChange={(e) => setAdminId(e.target.value)}>
        <option value="">Select Admin</option>
        {admins.map(a => (
          <option key={a} value={a}>{a}</option>
        ))}
      </select>

      {adminId && (
        <>
          <PermissionsTable
            permissions={permissions}
            onToggle={togglePermission}
          />

          <button className="save-btn" onClick={savePermissions}>
            Save Permissions
          </button>
        </>
      )}
    </div>
  );
}
