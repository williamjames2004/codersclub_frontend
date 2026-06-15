import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const adminId = localStorage.getItem("admin_id");

  const [activeTab, setActiveTab] = useState("create");

  // ---------- CREATE STATES ----------
  const [quizData, setQuizData] = useState({
    quiz_name: "",
    category: "",
    description: "",
    difficulty: "easy",
    time_limit: 0,
  });

  const [qtnCount, setQtnCount] = useState(0);
  const [qtns, setQtns] = useState([]);

  // ---------- UPDATE STATES ----------
  const [quizId, setQuizId] = useState("");
  const [updateData, setUpdateData] = useState(null);

  // ---------- AUTH CHECK ----------
  useEffect(() => {
    if (!adminId) {
      navigate("/adminlogin");
    }
  }, []);

  // ---------- CREATE HANDLERS ----------
  const handleQtnCount = (n) => {
    setQtnCount(n);
    setQtns(
      Array.from({ length: n }, () => ({
        qtn: "",
        options: ["", "", "", ""],
        correct_answer: "",
        points: 1,
      }))
    );
  };

  const handleQtnChange = (index, field, value) => {
    const updated = [...qtns];
    updated[index][field] = value;
    setQtns(updated);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const updated = [...qtns];
    updated[qIndex].options[oIndex] = value;
    setQtns(updated);
  };

  const createQuiz = async () => {
    const payload = {
      ...quizData,
      created_by: adminId,
      qtns,
    };

    await axios.post("http://localhost:5000/quiz/create", payload);
    alert("Quiz Created Successfully");
  };

  // ---------- UPDATE HANDLERS ----------
  const fetchQuizById = async () => {
    const res = await axios.post("http://localhost:5000/quiz/by-id", {
      quiz_id: quizId,
    });
    setUpdateData(res.data);
  };

  const updateQuiz = async () => {
    await axios.put("http://localhost:5000/quiz/update", updateData);
    alert("Quiz Updated Successfully");
  };

  return (
    <div className="dashboard">
      <h1>Admin Dashboard</h1>

      {/* ---------- TABS ---------- */}
      <div className="admintabs">
        <button onClick={() => setActiveTab("create")}>Create</button>
        <button onClick={() => setActiveTab("update")}>Update</button>
        <button onClick={() => setActiveTab("manage")}>Manage</button>
      </div>

      {/* ---------- CREATE TAB ---------- */}
      {activeTab === "create" && (
        <div className="createquiz">
          <h2>Create Quiz</h2>

          <input placeholder="Quiz Name"
            onChange={(e) => setQuizData({ ...quizData, quiz_name: e.target.value })} />

          <input placeholder="Category"
            onChange={(e) => setQuizData({ ...quizData, category: e.target.value })} />

          <input placeholder="Description"
            onChange={(e) => setQuizData({ ...quizData, description: e.target.value })} />

          <select onChange={(e) => setQuizData({ ...quizData, difficulty: e.target.value })}>
            <option>easy</option>
            <option>medium</option>
            <option>hard</option>
          </select>

          <input type="number" placeholder="Time Limit (mins)"
            onChange={(e) => setQuizData({ ...quizData, time_limit: +e.target.value })} />

          <input type="number" placeholder="Number of Questions"
            onChange={(e) => handleQtnCount(+e.target.value)} />

          {/* QUESTIONS */}
          {qtns.map((q, i) => (
            <div key={i} style={{ border: "1px solid #ccc", padding: 10, marginTop: 10, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap:"10px" }}>
              <h4>Question {i + 1}</h4>

              <input placeholder="Question"
                onChange={(e) => handleQtnChange(i, "qtn", e.target.value)} />

              {q.options.map((opt, oi) => (
                <input key={oi} placeholder={`Option ${oi + 1}`}
                  onChange={(e) => handleOptionChange(i, oi, e.target.value)} />
              ))}

              <input placeholder="Correct Answer"
                onChange={(e) => handleQtnChange(i, "correct_answer", e.target.value)} />

              <input type="number" placeholder="Points"
                onChange={(e) => handleQtnChange(i, "points", +e.target.value)} />
            </div>
          ))}

          <button onClick={createQuiz}>Create Quiz</button>
        </div>
      )}

      {/* ---------- UPDATE TAB ---------- */}
      {activeTab === "update" && (
        <div className="updatequiz">
          <h2>Update Quiz</h2>

          <input placeholder="Quiz ID"
            value={quizId}
            onChange={(e) => setQuizId(e.target.value)} />

          <button onClick={fetchQuizById}>Fetch Quiz</button>

          {updateData && (
            <div>
              <input readOnly value={updateData.quiz_id} />

              <input value={updateData.quiz_name}
                onChange={(e) => setUpdateData({ ...updateData, quiz_name: e.target.value })} />

              <input value={updateData.category}
                onChange={(e) => setUpdateData({ ...updateData, category: e.target.value })} />

              <input value={updateData.description}
                onChange={(e) => setUpdateData({ ...updateData, description: e.target.value })} />

              <input type="number" value={updateData.time_limit}
                onChange={(e) => setUpdateData({ ...updateData, time_limit: +e.target.value })} />

              {updateData.qtns.map((q, i) => (
                <div key={i}>
                  <input value={q.qtn}
                    onChange={(e) => {
                      const copy = { ...updateData };
                      copy.qtns[i].qtn = e.target.value;
                      setUpdateData(copy);
                    }} />
                </div>
              ))}

              <button onClick={updateQuiz}>Update Quiz</button>
            </div>
          )}
        </div>
      )}

      {/* ---------- MANAGE TAB ---------- */}
      {activeTab === "manage" && (
        <h2>Manage (Coming Soon)</h2>
      )}
    </div>
  );
}