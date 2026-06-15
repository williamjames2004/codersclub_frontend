import { useState } from "react";
import axios from "axios";

export default function CreateQuiz({ adminId }) {
  const [quizData, setQuizData] = useState({
    quiz_name: "",
    category: "",
    description: "",
    mode: "mode1",
    difficulty: "easy",
    time_limit: 0,
    max_attempt: 1,
    password: "",
  });

  const createQuiz = async () => {
    try {
      const res = await axios.post(
        "https://codersclub-i9xo.onrender.com/quiz/create",
        {
          ...quizData,
          created_by: adminId
        }
      );
      if (res.data.success) {
        alert(`Quiz created successfully. Quiz ID: ${res.data.quiz_id}`);
        setQuizData({
          quiz_name: "",
          category: "",
          description: "",
          mode: "mode1",
          difficulty: "easy",
          time_limit: 0,
          max_attempt: 1,
          password: "",
        });
      }
    } catch (err) {
      alert("Failed to create quiz");
      console.error(err);
    }
  };

  return (
    <div className="card">
      <h2>Create Quiz</h2>

      <input
        placeholder="Quiz Name"
        value={quizData.quiz_name}
        onChange={(e) => setQuizData({ ...quizData, quiz_name: e.target.value })}
      />
      <select
        value={quizData.category}
        onChange={(e) =>
          setQuizData({ ...quizData, category: e.target.value })
        }
      >
        <option value="">Select category</option>
        <option value="regular">Regular</option>
        <option value="event">Event</option>
      </select>
      <input
        placeholder="Description"
        value={quizData.description}
        onChange={(e) => setQuizData({ ...quizData, description: e.target.value })}
      />

      <select
        value={quizData.mode}
        onChange={(e) => setQuizData({ ...quizData, mode: e.target.value })}
      >
        <option value="mode1">Mode 1 - Regular</option>
        <option value="mode2">Mode 2 - Timed</option>
        <option value="mode3">Mode 3 - Secure</option>
      </select>

      <select
        value={quizData.difficulty}
        onChange={(e) => setQuizData({ ...quizData, difficulty: e.target.value })}
      >
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>

      <input
        type="text"
        placeholder="Time Limit (minutes)"
        onChange={(e) => setQuizData({ ...quizData, time_limit: +e.target.value })}
      />

      <input
        type="text"
        placeholder="Max Attempts"
        onChange={(e) => setQuizData({ ...quizData, max_attempt: +e.target.value })}
      />

      <input
        placeholder="Password (mandatary)"
        value={quizData.password}
        onChange={(e) => setQuizData({ ...quizData, password: e.target.value })}
      />

      <button className="primary-btn" onClick={createQuiz}>
        Create Quiz
      </button>
    </div>
  );
}
