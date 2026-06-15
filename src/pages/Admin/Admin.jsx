import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../Adminstyles/adminstyle.css";
import CreateQuiz from "../quiz/CreateQuiz";
import AddQuestions from "../quiz/AddQuestions";
import UpdateQuiz from "../quiz/UpdateQuiz";
import ManageQuiz from "../quiz/ManageQuiz";
import Results from "../Results";
import ProfileDataEntry from "./ProfileDataEntry";

export default function Admin() {
  const location = useLocation();
  const { adminId, adminType } = location.state || {};
  const navigate = useNavigate();
  const [permissions, setPermissions] = useState(null);
  const [activeComponent, setActiveComponent] = useState(null);

  useEffect(() => {
    axios.post("https://codersclub-i9xo.onrender.com/admin/permissions", {
      admin_id: adminId
    }).then(res => {
      if (res.data.success) {
        setPermissions(res.data.permissions);
      }
    });
  }, [adminId]);

  if (!permissions) return <p>Loading permissions...</p>;

  return (
    <div className="admin-dashboard flex flex-col relative">
      <div className="text-end absolute top-20 right-5">
        <button type="button" onClick={()=>navigate("/adminlogin")} className="logout bg-pink-400 font-bold px-8 py-3 rounded-2xl hover:bg-pink-500">Logout</button>
      </div>
      <div className="container">
        <h1>Admin Panel</h1>
        <div className="row">
          <p><b>ID:</b> {adminId}</p>
          <p><b>Type:</b> {adminType}</p>
        </div>

        {/* ---- ACTION BUTTONS ---- */}
        <div className="admin-actions">
          {permissions.create_quiz && (
            <>
              <button
                className={activeComponent === "create" ? "active" : ""}
                onClick={() => setActiveComponent("create")}
              >
                Create Quiz
              </button>
              <button
                className={activeComponent === "addquestion" ? "active" : ""}
                onClick={() => setActiveComponent("addquestion")}
              >
                Add Questions
              </button>
            </>
          )}

          {permissions.update_quiz && (
            <button
              className={activeComponent === "update" ? "active" : ""}
              onClick={() => setActiveComponent("update")}
            >
              Update Quiz
            </button>
          )}

          {permissions.manage_quiz && (
            <button
              className={activeComponent === "manage" ? "active" : ""}
              onClick={() => setActiveComponent("manage")}
            >
              Manage Quiz
            </button>
          )}
          {permissions.dashboard && (
            <button
              className={activeComponent === "results" ? "active" : ""}
              onClick={() => setActiveComponent("results")}
            >
              Results
            </button>
          )}
          {permissions.update_profile && (
            <button className={activeComponent === "updateprofile" ? "active" : ""}
              onClick={() => setActiveComponent("updateprofile")}
            >Update Profile</button>
          )}
        </div>

        {/* ---- COMPONENT VIEW ---- */}
        <div className="admin-component">
          {activeComponent === "create" && <CreateQuiz adminId={adminId} />}
          {activeComponent === "addquestion" && <AddQuestions adminId={adminId} />}
          {activeComponent === "update" && <UpdateQuiz />}
          {activeComponent === "manage" && <ManageQuiz adminId={adminId} />}
          {activeComponent === "results" && <Results/>}
          {activeComponent === "updateprofile" && <ProfileDataEntry/>}
        </div>
      </div>
    </div>
  );
}
