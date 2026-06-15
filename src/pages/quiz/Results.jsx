import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import html2canvas from "html2canvas";
import "../quizstyles/quizstyles.css";

export default function Results() {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState("");
  const [results, setResults] = useState(null);

  const leaderboardRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();
  const { adminId } = location.state || {};

  /* ---------- AUTH CHECK ---------- */
  useEffect(() => {
    if (!adminId) {
      navigate("/adminlogin");
    }
  }, [adminId, navigate]);

  const logout = () => {
    navigate("/adminlogin");
  };

  /* ---------- FETCH QUIZZES ---------- */
  const fetchMyQuizzes = async () => {
    try {
      const res = await axios.post(
        "https://codersclub-i9xo.onrender.com/admin/findallquiz",
        { admin_id: adminId }
      );
      setQuizzes(res.data.quizzes || []);
    } catch (err) {
      console.error(err);
    }
  };

  /* ---------- FETCH RESULTS ---------- */
  const fetchResults = async (quizId) => {
    if (!quizId) return;

    try {
      const res = await axios.post(
        "https://codersclub-i9xo.onrender.com/admin/quiz-dashboard",
        { quiz_id: quizId }
      );
      setResults(res.data);
    } catch (err) {
      if (
        err.response &&
        err.response.status === 404 &&
        err.response.data.message === "No attempts found for this quiz"
      ) {
        setResults({
          quiz_id: quizId,
          leaderboard: [],
          attended_students: 0,
          overall_percentage: 0,
          noData: true,
        });
        return;
      }
      console.error(err);
    }
  };

  /* ---------- INITIAL LOAD ---------- */
  useEffect(() => {
    fetchMyQuizzes();
  }, []);

  /* ---------- LIVE UPDATE ---------- */
  useEffect(() => {
    if (!selectedQuiz) return;

    fetchResults(selectedQuiz);
    const interval = setInterval(() => {
      fetchResults(selectedQuiz);
    }, 5000);

    return () => clearInterval(interval);
  }, [selectedQuiz]);

  /* ---------- DOWNLOAD JPG ---------- */
  const downloadRecord = async () => {
    if (!leaderboardRef.current) return;

    const canvas = await html2canvas(leaderboardRef.current, {
      scale: 2,
      backgroundColor: "#0f172a",
    });

    const image = canvas.toDataURL("image/jpeg", 1.0);
    const link = document.createElement("a");
    link.href = image;
    link.download = `quiz_${selectedQuiz}_results.jpg`;
    link.click();
  };

  const quizName =
    quizzes.find((q) => q.quiz_id === selectedQuiz)?.quiz_name || "";

  return (
    <div className="dashboard">
      <button className="logoutbtn" onClick={logout}>
        Logout
      </button>

      <h1>Quiz Results</h1>

      {/* ---------- QUIZ SELECT ---------- */}
      <div className="card">
        <h3>Select Quiz</h3>
        <select
          value={selectedQuiz}
          onChange={(e) => setSelectedQuiz(e.target.value)}
        >
          <option value="">-- Select Quiz --</option>
          {quizzes.map((q) => (
            <option key={q.quiz_id} value={q.quiz_id}>
              {q.quiz_name}
            </option>
          ))}
        </select>
      </div>

      {/* ---------- NO DATA ---------- */}
      {results && results.noData && (
        <div className="card">
          <h3>No Results Yet</h3>
          <p style={{ color: "#94a3b8" }}>
            Students haven’t attempted this quiz yet.
          </p>
        </div>
      )}

      {/* ---------- SUMMARY ---------- */}
      {results && (
        <div className="results-summary">
          <div className="summary-box">
            <span>Attended Students</span>
            <h2>{results.attended_students}</h2>
          </div>

          <div className="summary-box">
            <span>Overall Percentage</span>
            <h2>{results.overall_percentage}%</h2>
          </div>
        </div>
      )}

      {/* ---------- LEADERBOARD CARD (DOWNLOADABLE) ---------- */}
      {results && results.leaderboard.length > 0 && (
        <>
          <div className="card" ref={leaderboardRef}>
            <h3>Quiz Result Record</h3>

            {/* QUIZ DETAILS */}
            <div className="quiz-details">
              <p><strong>Quiz Name:</strong> {quizName}</p>
              <p><strong>Quiz ID:</strong> {results.quiz_id}</p>
              <p><strong>Attended Students:</strong> {results.attended_students}</p>
              <p><strong>Overall Percentage:</strong> {results.overall_percentage}%</p>
            </div>

            <hr />

            <h3>Leaderboard</h3>

            <table className="leaderboard">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>User</th>
                  <th>Score</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {results.leaderboard
                  .sort((a, b) => b.points_obtained - a.points_obtained)
                  .map((user, index) => (
                    <tr key={user.user_id}>
                      <td>{index + 1}</td>
                      <td>{user.user_id}</td>
                      <td>{user.points_obtained}</td>
                      <td>{user.total_points}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {/* ---------- DOWNLOAD BUTTON ---------- */}
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <button className="download-btn" onClick={downloadRecord}>
              Download Record
            </button>
          </div>
        </>
      )}
    </div>
  );
}
