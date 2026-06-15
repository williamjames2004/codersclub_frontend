import { useEffect, useState } from "react";
import axios from "axios";
import "../quizstyles/quizstyles.css";

export default function AddQuestions({ adminId }) {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState("");
  const [qtns, setQtns] = useState([]);

  // Fetch quizzes for dropdown
  useEffect(() => {
    fetchMyQuizzes()
  }, []);

  const fetchMyQuizzes = async () => {
    const res = await axios.post(
      "https://codersclub-i9xo.onrender.com/admin/findallquiz",
      { admin_id: adminId }
    );
    setQuizzes(res.data.quizzes || []);
  };

  const addQuestion = () => {
    setQtns(prev => [
      ...prev,
      { qtn: "", options: ["", "", "", ""], correct_answer: "", points: 1 }
    ]);
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

  const saveQuestions = async () => {
    if (!selectedQuiz || qtns.length === 0) {
      return alert("Select a quiz and add at least one question");
    }

    try {
      await axios.post("https://codersclub-i9xo.onrender.com/quiz/add-questions", {
        quiz_id: selectedQuiz,
        qtns
      });
      alert("Questions added successfully");
      setQtns([]);
    } catch (err) {
      console.error(err);
      alert("Failed to add questions");
    }
  };

  return (
    <div className="card">
      <h2>Add Questions</h2>

      <select
        value={selectedQuiz}
        onChange={(e) => setSelectedQuiz(e.target.value)}
      >
        <option value="">-- Select Quiz --</option>
        {quizzes.map((q) => (
          <option key={q.quiz_id} value={q.quiz_id}>{q.quiz_name}</option>
        ))}
      </select>

      <button onClick={addQuestion} className="add-qtn">Add Question</button>

      {qtns.map((q, i) => (
        <div className="question-box" key={i}>
          <input
            placeholder={`Question ${i + 1}`}
            value={q.qtn}
            onChange={(e) => handleQtnChange(i, "qtn", e.target.value)}
          />

          {q.options.map((_, oi) => (
            <input
              key={oi}
              placeholder={`Option ${oi + 1}`}
              value={q.options[oi]}
              onChange={(e) => handleOptionChange(i, oi, e.target.value)}
            />
          ))}

          <input
            placeholder="Correct Answer"
            value={q.correct_answer}
            onChange={(e) => handleQtnChange(i, "correct_answer", e.target.value)}
          />

          <input
            type="text"
            placeholder="Points"
            onChange={(e) => handleQtnChange(i, "points", +e.target.value)}
          />
        </div>
      ))}

      <button className="primary-btn" onClick={saveQuestions}>Save Questions</button>
    </div>
  );
}
