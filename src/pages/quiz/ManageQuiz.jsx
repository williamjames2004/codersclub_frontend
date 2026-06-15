import { useEffect, useState } from "react";
import axios from "axios";
import { Trash2 } from "lucide-react";

export default function ManageQuiz({ adminId }) {
  const [myQuizzes, setMyQuizzes] = useState([]);

  useEffect(() => {
    fetchMyQuizzes();
  }, []);

  const fetchMyQuizzes = async () => {
    const res = await axios.post(
      "https://codersclub-i9xo.onrender.com/admin/findallquiz",
      { admin_id: adminId }
    );
    setMyQuizzes(res.data.quizzes || []);
  };

  const toggleQuizFlag = async (quiz_id, field, currentValue) => {
    await axios.post(
      "https://codersclub-i9xo.onrender.com/quiz/updateQuizFlag",
      {
        quiz_id,
        field,
        value: !currentValue,
      }
    );

    setMyQuizzes(prev =>
      prev.map(q =>
        q.quiz_id === quiz_id ? { ...q, [field]: !currentValue } : q
      )
    );
  };

  const deleteQuiz = async (quiz_id) => {
  if (!window.confirm("Delete this quiz?")) return;

  try {
    await axios.post(
      "https://codersclub-i9xo.onrender.com/quiz/delete",
      { quiz_id }
    );

    // remove from UI
    setMyQuizzes(prev =>
      prev.filter(q => q.quiz_id !== quiz_id)
    );

  } catch (error) {
    console.error("Delete failed:", error);
    alert("Failed to delete quiz");
  }
};

  return (
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

              <Trash2
                className="delete-icon"
                onClick={() => deleteQuiz(quiz.quiz_id)}
              />
            </div>

            <div className="toggle-row">
              <button onClick={() =>
                toggleQuizFlag(quiz.quiz_id, "shuffle_questions", quiz.shuffle_questions)
              }>
                Shuffle Questions: {quiz.shuffle_questions ? "ON" : "OFF"}
              </button>

              <button onClick={() =>
                toggleQuizFlag(quiz.quiz_id, "shuffle_options", quiz.shuffle_options)
              }>
                Shuffle Options: {quiz.shuffle_options ? "ON" : "OFF"}
              </button>

              <button onClick={() =>
                toggleQuizFlag(quiz.quiz_id, "is_active", quiz.is_active)
              }>
                Active: {quiz.is_active ? "YES" : "NO"}
              </button>

              <button onClick={() =>
                toggleQuizFlag(quiz.quiz_id, "is_public", quiz.is_public)
              }>
                Public: {quiz.is_public ? "YES" : "NO"}
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
