import { useState } from "react";
import axios from "axios";

export default function UpdateQuiz() {
  const [quizId, setQuizId] = useState("");
  const [updateData, setUpdateData] = useState(null);

  const fetchQuizById = async () => {
    const res = await axios.post(
      "https://codersclub-i9xo.onrender.com/quiz/by-id",
      { quiz_id: quizId }
    );
    setUpdateData(res.data);
  };

  const updateQuiz = async () => {
    await axios.put(
      "https://codersclub-i9xo.onrender.com/quiz/update",
      updateData
    );
    alert("Quiz Updated Successfully");
  };

  return (
    <div className="card">
      <h2>Update Quiz</h2>

      <input
        placeholder="Quiz ID"
        onChange={(e) => setQuizId(e.target.value)}
      />

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
  );
}
