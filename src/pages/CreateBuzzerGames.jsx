import { useState } from "react";
import axios from "axios";
import "./CreateBuzzerGames.css";

const API = "https://codersclub-i9xo.onrender.com";

export default function CreateBuzzerGame() {
  const [form, setForm] = useState({
    game_name: "",
    password: "",
    total_qtns: "",
    start_time: "",
    duration_minutes: ""
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      // ✅ Convert datetime-local to ISO with +05:30
      const isoWithIST = form.start_time + ":00+05:30";

      const response = await axios.post(`${API}/buzzer/createbuzzer`, {
        ...form,
        total_qtns: Number(form.total_qtns),
        duration_minutes: Number(form.duration_minutes),
        start_time: isoWithIST
      });

      setMessage("✅ Game Created Successfully!");
      console.log(response.data);

      setForm({
        game_name: "",
        password: "",
        total_qtns: "",
        start_time: "",
        duration_minutes: ""
      });

    } catch (err) {
      setMessage("❌ " + (err.response?.data?.message || "Error creating game"));
    }

    setLoading(false);
  };

  return (
    <div className="buzzer-container">
      <div className="buzzer-card">
        <h2>Create Buzzer Game</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="game_name"
            placeholder="Game Name"
            value={form.game_name}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Game Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="total_qtns"
            placeholder="Total Questions"
            value={form.total_qtns}
            onChange={handleChange}
            required
          />

          <input
            type="datetime-local"
            name="start_time"
            value={form.start_time}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="duration_minutes"
            placeholder="Duration (Minutes)"
            value={form.duration_minutes}
            onChange={handleChange}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Game"}
          </button>
        </form>

        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );

}
