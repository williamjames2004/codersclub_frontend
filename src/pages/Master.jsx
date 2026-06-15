import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./Dashboard.css";

export default function Master() {
  const navigate = useNavigate();
  const location = useLocation();
  const { adminId, adminType } = location.state || {};

  const [loading, setLoading] = useState(true);
  const [authStatus, setAuthStatus] = useState("checking");

  /* ---------- TABS ---------- */
  const [activeTab, setActiveTab] = useState("create");

  /* ---------- CREATE ADMIN STATE ---------- */
  const [adminForm, setAdminForm] = useState({
    name: "",
    password: "",
    adminType: "Volunteer",
  });

  /* ---------- VIEW ADMINS STATE ---------- */
  const [admins, setAdmins] = useState([]);
  const [adminsLoading, setAdminsLoading] = useState(false);

  /* ---------- PASSWORD REQUEST STATE ---------- */
  const [passwordRequests, setPasswordRequests] = useState({});

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
    }, 1500);
  }, [adminId, adminType, navigate]);

  /* ---------- LOGOUT ---------- */
  const logout = () => {
    navigate("/adminlogin");
  };

  /* ---------- CREATE ADMIN ---------- */
  const createAdmin = async () => {
    try {
      await axios.post(
        "https://codersclub-i9xo.onrender.com/admin/adminRegister",
        adminForm
      );

      alert("Admin created successfully");

      setAdminForm({
        name: "",
        password: "",
        adminType: "Volunteer",
      });
    } catch (err) {
      alert("Failed to create admin");
    }
  };

  /* ---------- CHECK PASSWORD REQUEST ---------- */
  const checkPasswordRequest = async (admin_id) => {
    try {
      const res = await axios.post(
        "https://codersclub-i9xo.onrender.com/admin/checkforpasswordchange",
        { admin_id }
      );

      if (res.data.message === "No requests") return false;
      return true;
    } catch {
      return false;
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

      const filteredAdmins = res.data.Admins.filter(
        (admin) => admin.adminType !== "Master"
      );

      setAdmins(filteredAdmins);

      const requestMap = {};
      for (const admin of filteredAdmins) {
        requestMap[admin.admin_id] = await checkPasswordRequest(
          admin.admin_id
        );
      }

      setPasswordRequests(requestMap);
    } catch (err) {
      alert("Failed to fetch admins");
    } finally {
      setAdminsLoading(false);
    }
  };

  /* ---------- DELETE ADMIN ---------- */
  const deleteAdmin = async (admin_id) => {
    if (!window.confirm(`Delete admin (${admin_id})?`)) return;

    try {
      await axios.post(
        "https://codersclub-i9xo.onrender.com/admin/deleteadmin",
        { admin_id }
      );

      alert("Admin deleted");
      fetchAdmins();
    } catch {
      alert("Delete failed");
    }
  };

  /* ---------- APPROVE PASSWORD ---------- */
  const approvePassword = async (admin_id) => {
    try {
      await axios.patch(
        "https://codersclub-i9xo.onrender.com/admin/approvepassword",
        { admin_id }
      );

      alert("Password change approved");
      fetchAdmins();
    } catch {
      alert("Approval failed");
    }
  };

  /* ---------- REJECT PASSWORD ---------- */
  const rejectPassword = async (admin_id) => {
    try {
      await axios.post(
        "https://codersclub-i9xo.onrender.com/admin/rejectrequest",
        { admin_id }
      );

      alert("Password change rejected");
      fetchAdmins();
    } catch {
      alert("Rejection failed");
    }
  };

  /* ---------- LOADING SCREEN ---------- */
  if (loading) {
    return (
      <div className="ai-lock-screen">
        <div className={`lock ${authStatus}`}>
          <div className="lock-key"></div>
          <div className="lock-body"></div>
        </div>

        <p className="ai-text">
          {authStatus === "checking" && "Authenticating Master Access..."}
          {authStatus === "success" && "Master Access Granted"}
          {authStatus === "failed" && "Unauthorized Access"}
        </p>
      </div>
    );
  }

  /* ---------- UI ---------- */
  return (
    <div className="dashboard">
      <button className="logoutbtn" onClick={logout}>
        Logout
      </button>

      <h1>Master Control Panel</h1>

      {/* ---------- TABS ---------- */}
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
                  <th>Admin ID</th>
                  <th>Name</th>
                  <th>Admin Type</th>
                  <th>Profession</th>
                  <th>Password Request</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {admins.map((admin) => (
                  <tr key={admin._id}>
                    <td>{admin.admin_id}</td>
                    <td>{admin.name}</td>
                    <td>{admin.adminType}</td>
                    <td>{admin.profession}</td>

                    <td>
                      {passwordRequests[admin.admin_id] ? (
                        <div style={{display:"flex",gap: 5, justifyContent: "center"}}>
                          <button
                            className="approve-btn"
                            onClick={() =>
                              approvePassword(admin.admin_id)
                            }
                          >
                            Approve
                          </button>
                          <button
                            className="reject-btn"
                            onClick={() =>
                              rejectPassword(admin.admin_id)
                            }
                          >
                            Reject
                          </button>
                        </div>
                      ) : (
                        <span>No requests</span>
                      )}
                    </td>

                    <td>
                      <button
                        className="danger-btn"
                        onClick={() => deleteAdmin(admin.admin_id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
