import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "./Dashboard.css";

export default function Professor() {
  const navigate = useNavigate();
  const location = useLocation();
  const { adminId, adminType } = location.state || {};

  const [loading, setLoading] = useState(true);
  const [authStatus, setAuthStatus] = useState("checking");
  const [activeTab, setActiveTab] = useState("create");

  // ---------- QUIZ STATES ----------
  const [quizData, setQuizData] = useState({
    quiz_name: "",
    category: "",
    description: "",
    difficulty: "easy",
    time_limit: 0,
  });

  const [qtns, setQtns] = useState([]);

  // ---------- UPDATE ----------
  const [quizId, setQuizId] = useState("");
  const [updateData, setUpdateData] = useState(null);

  // ---------- MANAGE ----------
  const [myQuizzes, setMyQuizzes] = useState([]);

  // ---------- DASHBOARD ----------
  const [resultsData, setResultsData] = useState(null);
  const [selectedQuizId, setSelectedQuizId] = useState(""); // choose quiz for results


  // ---------- AUTH CHECK ----------
  useEffect(() => {
    setTimeout(() => {
      if (!adminId || adminType !== "Professor") {
        setAuthStatus("failed");
        setTimeout(() => navigate("/adminlogin"), 1200);
      } else {
        setAuthStatus("success");
        setTimeout(() => setLoading(false), 1200);
      }
    }, 1500);
  }, []);

  // ---------- FETCH QUIZZES (MANAGE TAB) ----------
  useEffect(() => {
    if (activeTab === "manage") {
      fetchMyQuizzes();
    }
  }, [activeTab]);

  const fetchMyQuizzes = async () => {
  try {
    const res = await axios.post(
      "https://codersclub-i9xo.onrender.com/admin/findallquiz",
      { admin_id: adminId }
    );

    if (res.data.success && Array.isArray(res.data.quizzes)) {
      setMyQuizzes(res.data.quizzes);
    } else {
      setMyQuizzes([]);
    }
  } catch (err) {
    console.error(err);
    setMyQuizzes([]);
  }
};
// ---------- TOGGLE QUIZ FLAG ----------
const toggleQuizFlag = async (quiz_id, field, currentValue) => {
  try {
    await axios.post("https://codersclub-i9xo.onrender.com/quiz/updateQuizFlag", {
      quiz_id,
      field,
      value: !currentValue,
    });

    // optimistic UI update
    setMyQuizzes((prev) =>
      prev.map((q) =>
        q.quiz_id === quiz_id ? { ...q, [field]: !currentValue } : q
      )
    );
  } catch (err) {
    alert("Failed to update flag");
  }
};

// ---------- DELETE QUIZ ----------
const deleteQuiz = async (quiz_id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this quiz?"
  );

  if (!confirmDelete) return;

  try {
    await axios.post("https://codersclub-i9xo.onrender.com/admin/deletequiz", {
      admin_id: adminId,
      quiz_id,
    });

    // remove from UI
    setMyQuizzes((prev) =>
      prev.filter((q) => q.quiz_id !== quiz_id)
    );

    alert("Quiz deleted");
  } catch (err) {
    alert("Failed to delete quiz");
  }
};

  // ---------- LOADING ----------
  if (loading) {
    return (
      <div className="ai-lock-screen">
        <div className={`lock ${authStatus}`}>
          <div className="lock-key"></div>
          <div className="lock-body"></div>
        </div>
        <p className="ai-text">
          {authStatus === "checking" && "Verifying Professor Access..."}
          {authStatus === "success" && "Access Granted"}
          {authStatus === "failed" && "Access Denied"}
        </p>
      </div>
    );
  }
 const logout = () => {
    navigate("/adminlogin");
  };
  // ---------- CREATE QUIZ HELPERS ----------
  const handleQtnCount = (n) => {
    setQtns(
      Array.from({ length: n }, () => ({
        qtn: "",
        options: ["", "", "", ""],
        correct_answer: "",
        points: 1,
      }))
    );
  };

  const handleQtnChange = (i, field, value) => {
    const copy = [...qtns];
    copy[i][field] = value;
    setQtns(copy);
  };

  const handleOptionChange = (qi, oi, value) => {
    const copy = [...qtns];
    copy[qi].options[oi] = value;
    setQtns(copy);
  };

  const createQuiz = async () => {
    await axios.post("https://codersclub-i9xo.onrender.com/quiz/create", {
      ...quizData,
      created_by: adminId,
      qtns,
    });
    alert("Quiz Created Successfully");
  };

  // ---------- UPDATE QUIZ ----------
  const fetchQuizById = async () => {
    const res = await axios.post("https://codersclub-i9xo.onrender.com/quiz/by-id", {
      quiz_id: quizId,
    });
    setUpdateData(res.data);
  };

  const updateQuiz = async () => {
    await axios.put("https://codersclub-i9xo.onrender.com/quiz/update", updateData);
    alert("Quiz Updated Successfully");
  };

  // ---------- TOGGLE HANDLER (TEMP) ----------
  const handleToggle = (field, quizId) => {
    alert(`"${field}" toggle clicked for quiz: ${quizId}`);
  };

  return (
    <div className="dashboard">
      <button className="logoutbtn" onClick={logout}>
        Logout
      </button>
      <h1>Professor Dashboard</h1>

      {/* ---------- TABS ---------- */}
      <div className="admintabs">
        <button onClick={() => setActiveTab("create")}>Create Quiz</button>
        <button onClick={() => setActiveTab("update")}>Update Quiz</button>
        <button onClick={() => setActiveTab("manage")}>Manage</button>
      </div>

      {/* ---------- CREATE ---------- */}
      {activeTab === "create" && (
        <div className="card">
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

          <input type="text" placeholder="Time Limit (mins)"
            onChange={(e) => setQuizData({ ...quizData, time_limit: +e.target.value })} />

          <input type="text" placeholder="Number of Questions"
            onChange={(e) => handleQtnCount(+e.target.value)} />

          {qtns.map((q, i) => (
            <div className="question-box" key={i}>
              <input placeholder={`Question ${i + 1}`}
                onChange={(e) => handleQtnChange(i, "qtn", e.target.value)} />

              {q.options.map((_, oi) => (
                <input key={oi} placeholder={`Option ${oi + 1}`}
                  onChange={(e) => handleOptionChange(i, oi, e.target.value)} />
              ))}

              <input placeholder="Correct Answer"
                onChange={(e) => handleQtnChange(i, "correct_answer", e.target.value)} />
            </div>
          ))}

          <button className="primary-btn" onClick={createQuiz}>
            Create Quiz
          </button>
        </div>
      )}

      {/* ---------- UPDATE ---------- */}
      {activeTab === "update" && (
        <div className="card">
          <h2>Update Quiz</h2>

          <input placeholder="Quiz ID"
            onChange={(e) => setQuizId(e.target.value)} />

          <button className="primary-btn" onClick={fetchQuizById}>
            Fetch Quiz
          </button>

          {updateData && (
            <>
              <input
                value={updateData.quiz_name}
                onChange={(e) =>
                  setUpdateData({ ...updateData, quiz_name: e.target.value })
                }
              />

              <button className="primary-btn" onClick={updateQuiz}>
                Update Quiz
              </button>
            </>
          )}
        </div>
      )}

      {/* ---------- MANAGE ---------- */}
      {activeTab === "manage" && (
        <div className="card">
            <h2>Manage My Quizzes</h2>

            {myQuizzes.length === 0 ? (
            <p>No quizzes found.</p>
            ) : (
            myQuizzes.map((quiz) => (
                <div className="quiz-card" key={quiz._id}>
                <div className="quiz-header">
                    <div>
                    <h3>{quiz.quiz_name}</h3>
                    <p>{quiz.category} | {quiz.difficulty}</p>
                    </div>

                    {/* DELETE ICON */}
                    <Trash2
                    className="delete-icon"
                    onClick={() => deleteQuiz(quiz.quiz_id)}
                    />
                </div>

                <div className="toggle-row">
                    <button
                    onClick={() =>
                        toggleQuizFlag(
                        quiz.quiz_id,
                        "shuffle_questions",
                        quiz.shuffle_questions
                        )
                    }
                    >
                    Shuffle Questions: {quiz.shuffle_questions ? "ON" : "OFF"}
                    </button>

                    <button
                    onClick={() =>
                        toggleQuizFlag(
                        quiz.quiz_id,
                        "shuffle_options",
                        quiz.shuffle_options
                        )
                    }
                    >
                    Shuffle Options: {quiz.shuffle_options ? "ON" : "OFF"}
                    </button>

                    <button
                    onClick={() =>
                        toggleQuizFlag(
                        quiz.quiz_id,
                        "is_active",
                        quiz.is_active
                        )
                    }
                    >
                    Active: {quiz.is_active ? "YES" : "NO"}
                    </button>

                    <button
                    onClick={() =>
                        toggleQuizFlag(
                        quiz.quiz_id,
                        "is_public",
                        quiz.is_public
                        )
                    }
                    >
                    Public: {quiz.is_public ? "YES" : "NO"}
                    </button>
                </div>
                </div>
            ))
            )}
        </div>
        )}
        <div className="center">
          <button className="results-btn" onClick={() => navigate("/results", { state: { adminId }})}>View Results</button>
        </div>
    </div>
  );
}
