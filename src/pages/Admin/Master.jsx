import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Permission from "./Permission";
import Officials from "./Officials";
import "../Adminstyles/adminstyle.css";

export default function Master() {
  const navigate = useNavigate();
  const location = useLocation();
  const { adminId, adminType } = location.state || {};

  const [loading, setLoading] = useState(true);
  const [authStatus, setAuthStatus] = useState("checking");

  /* ---------- TABS ---------- */
  const [activeTab, setActiveTab] = useState("create");

  /* ---------- CREATE ADMIN ---------- */
  const [adminForm, setAdminForm] = useState({
    name: "",
    password: "",
    adminType: "Volunteer"
  });

  /* ---------- VIEW ADMINS ---------- */
  const [admins, setAdmins] = useState([]);
  const [adminsLoading, setAdminsLoading] = useState(false);

  /* ---------- PERMISSIONS ---------- */
  const [selectedAdminId, setSelectedAdminId] = useState("");
  const [permissions, setPermissions] = useState({});
  const [permissionsLoading, setPermissionsLoading] = useState(false);

  /* ---------- AUTH CHECK ---------- */
  useEffect(() => {
    setTimeout(() => {
      if (!adminId || adminType !== "Master") {
        setAuthStatus("failed");
        setTimeout(() => navigate("/adminlogin"), 1200);
      } else {
        setAuthStatus("success");
        setTimeout(() => setLoading(false), 1200);
      }
    }, 1200);
  }, [adminId, adminType, navigate]);

  /* ---------- CREATE ADMIN ---------- */
  const createAdmin = async () => {
    try {
      await axios.post(
        "https://codersclub-i9xo.onrender.com/admin/adminRegister",
        adminForm
      );

      alert("Admin created successfully");
      setAdminForm({ name: "", password: "", adminType: "Volunteer" });
    } catch {
      alert("Failed to create admin");
    }
  };

  /* ---------- FETCH ADMINS ---------- */
  const fetchAdmins = async () => {
    try {
      setAdminsLoading(true);

      const res = await axios.post(
        "https://codersclub-i9xo.onrender.com/admin/getadmins",
        { admin_id: adminId }
      );

      const filtered = res.data.Admins.filter(
        (a) => a.adminType !== "Master"
      );

      setAdmins(filtered);
    } catch {
      alert("Failed to fetch admins");
    } finally {
      setAdminsLoading(false);
    }
  };

  /* ---------- FETCH PERMISSIONS ---------- */
  const fetchPermissions = async (admin_id) => {
    try {
      setPermissionsLoading(true);
      setPermissions({});

      const res = await axios.post(
        "https://codersclub-i9xo.onrender.com/admin/permissions",
        { admin_id }
      );

      setPermissions(res.data.permissions);
    } catch {
      alert("Failed to load permissions");
    } finally {
      setPermissionsLoading(false);
    }
  };

  /* ---------- TOGGLE PERMISSION ---------- */
  const togglePermission = (key) => {
    setPermissions((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  /* ---------- SAVE PERMISSIONS ---------- */
  const savePermissions = async () => {
    try {
      await axios.post(
        "https://codersclub-i9xo.onrender.com/admin/update-permissions",
        {
          admin_id: selectedAdminId,
          permissions
        }
      );

      alert("Permissions updated successfully");
    } catch {
      alert("Failed to update permissions");
    }
  };

  /* ---------- LOADING SCREEN ---------- */
  if (loading) {
    return (
      <div className="ai-lock-screen">
        <p>
          {authStatus === "checking" && "Authenticating Master Access..."}
          {authStatus === "success" && "Access Granted"}
          {authStatus === "failed" && "Unauthorized Access"}
        </p>
      </div>
    );
  }

  /* ---------- UI ---------- */
  return (
    <div className="dashboard">
      <div className="text-end mt-20 mx-10">
          <button type="button" onClick={()=>navigate("/adminlogin")} className="logout bg-pink-400 font-bold px-8 py-3 rounded-2xl hover:bg-pink-500">Logout</button>
        </div>

      <h1>Master Control Panel</h1>

      {/* ---------- TAB BAR ---------- */}
      <div className="tab-bar">
        <button
          className={activeTab === "create" ? "tab active" : "tab"}
          onClick={() => setActiveTab("create")}
        >
          Create Admin
        </button>

        <button
          className={activeTab === "view" ? "tab active" : "tab"}
          onClick={() => {
            setActiveTab("view");
            fetchAdmins();
          }}
        >
          View Admins
        </button>

        <button
          className={activeTab === "officials" ? "tab active" : "tab"}
          onClick={() => {
            setActiveTab("officials");
          }}
        >
          Officials
        </button>

        <button
          className={activeTab === "permissions" ? "tab active" : "tab"}
          onClick={() => {
            setActiveTab("permissions");
            fetchAdmins();
            setSelectedAdminId("");
            setPermissions({});
          }}
        >
          Permissions
        </button>
      </div>

      {/* ---------- CREATE ADMIN ---------- */}
      {activeTab === "create" && (
        <div className="card">
          <h2>Create Admin</h2>

          <input
            placeholder="Admin Name"
            value={adminForm.name}
            onChange={(e) =>
              setAdminForm({ ...adminForm, name: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Password"
            value={adminForm.password}
            onChange={(e) =>
              setAdminForm({ ...adminForm, password: e.target.value })
            }
          />

          <select
            value={adminForm.adminType}
            onChange={(e) =>
              setAdminForm({ ...adminForm, adminType: e.target.value })
            }
          >
            <option value="President">President</option>
            <option value="VicePresident">Vice President</option>
            <option value="Secretary">Secretary</option>
            <option value="ViceSecretary">Vice Secretary</option>
            <option value="Volunteer">Volunteer</option>
            <option value="Professor">Professor</option>
          </select>

          <button className="primary-btn" onClick={createAdmin}>
            Create Admin
          </button>
        </div>
      )}

      {/* ---------- VIEW ADMINS ---------- */}
      {activeTab === "view" && (
        <div className="card">
          <h2>Admins List</h2>

          {adminsLoading ? (
            <p>Loading admins...</p>
          ) : admins.length === 0 ? (
            <p>No admins found</p>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Profession</th>
                </tr>
              </thead>
              <tbody>
                {admins.map((a) => (
                  <tr key={a._id}>
                    <td>{a.admin_id}</td>
                    <td>{a.name}</td>
                    <td>{a.adminType}</td>
                    <td>{a.profession}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* ---------- OFFICIALS ---------- */}
      {activeTab === "officials" && (
        <div className="card">
          <h2>Officials</h2>
          <Officials/>
        </div>
      )}

      {/* ---------- PERMISSIONS ---------- */}
      {activeTab === "permissions" && (
        <div className="card">
          <h2>Admin Permissions</h2>

          <select
            value={selectedAdminId}
            onChange={(e) => {
              const admin_id = e.target.value;
              setSelectedAdminId(admin_id);
              if (admin_id) fetchPermissions(admin_id);
            }}
          >
            <option value="">Select Admin</option>
            {admins.map((a) => (
              <option key={a._id} value={a.admin_id}>
                {a.admin_id} — {a.name}
              </option>
            ))}
          </select>

          {permissionsLoading && <p>Loading permissions...</p>}

          {!permissionsLoading && selectedAdminId && (
            <>
              <Permission
                permissions={permissions}
                onToggle={togglePermission}
              />
              <button className="save-btn" onClick={savePermissions}>
                Save Permissions
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
