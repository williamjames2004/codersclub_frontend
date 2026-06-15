import { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "./BuzzerDashboard.css";

const API = "https://codersclub-i9xo.onrender.com";

/* SCORING */
const C1 = 10;
const C2 = 5;
const C3 = 0;

export default function BuzzerDashboard() {
  const [games, setGames] = useState([]);
  const [selectedGameId, setSelectedGameId] = useState("");
  const [totalQtns, setTotalQtns] = useState(0);
  const [currentQtn, setCurrentQtn] = useState(1);
  const [live, setLive] = useState(null);
  const [scores, setScores] = useState([]);
  const [decisionStage, setDecisionStage] = useState("FIRST");
  const [gameOver, setGameOver] = useState(false);

  const qtnId =
    selectedGameId && currentQtn <= totalQtns
      ? `${selectedGameId}_Q${currentQtn}`
      : null;

  /* -------------------------------- */
  /* FETCH ALL GAMES                  */
  /* -------------------------------- */
  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await axios.get(`${API}/buzzer/all`);
        if (res.data?.success) {
          setGames(res.data.data || []);
        }
      } catch (err) {
        console.error("Game fetch error", err);
      }
    };

    fetchGames();
  }, []);

  /* -------------------------------- */
  /* FETCH LIVE QUESTION              */
  /* -------------------------------- */
  const fetchLiveQuestion = async () => {
    if (!selectedGameId || !qtnId || gameOver) return;

    try {
      const res = await axios.post(`${API}/buzzer/live-question`, {
        game_id: selectedGameId,
        qtn_id: qtnId
      });

      const data = res.data?.data;

      if (!data || !Array.isArray(data.submissions)) {
        setLive(null);
        return;
      }

      setLive(data.submissions.length > 0 ? data : null);
    } catch (err) {
      /* 404 or backend empty → NOT crash */
      setLive(null);
    }
  };

  /* -------------------------------- */
  /* FETCH SCORES                     */
  /* -------------------------------- */
  const fetchScores = async () => {
    if (!selectedGameId) return;

    try {
      const res = await axios.post(`${API}/buzzer/scores`, {
        game_id: selectedGameId
      });

      if (res.data?.success) {
        setScores(res.data.data || []);
      }
    } catch (err) {
      console.error("Score fetch error", err);
    }
  };

  /* -------------------------------- */
  /* POLLING                          */
  /* -------------------------------- */
  useEffect(() => {
    if (!selectedGameId || gameOver) return;

    fetchLiveQuestion();
    fetchScores();

    const interval = setInterval(() => {
      fetchLiveQuestion();
      fetchScores();
    }, 3000);

    return () => clearInterval(interval);
  }, [selectedGameId, currentQtn, gameOver]);

  /* -------------------------------- */
  /* UPDATE SCORE                     */
  /* -------------------------------- */
  const updateScore = async (user, delta) => {
    if (!user) return;

    try {
      await axios.post(`${API}/buzzer/update-score`, {
        game_id: selectedGameId,
        user_id: user,
        delta
      });

      fetchScores();
    } catch (err) {
      console.error("Score update error", err);
    }
  };

  /* -------------------------------- */
  /* END QUESTION                     */
  /* -------------------------------- */
  const endQuestion = async (first = null, second = null) => {
    try {
      await axios.post(`${API}/buzzer/submit-result`, {
        game_id: selectedGameId,
        qtn_id: qtnId,
        first_submission: live?.first_submission || null,
        first_result: first,
        second_submission: live?.second_submission || null,
        second_result: second
      });

      await axios.post(`${API}/buzzer/reset-buzzer`, {
        game_id: selectedGameId,
        qtn_id: qtnId
      });

      /* GAME FINISH */
      if (currentQtn >= totalQtns) {
        setGameOver(true);
        setLive(null);
        return;
      }

      setDecisionStage("FIRST");
      setLive(null);
      setCurrentQtn(q => q + 1);
    } catch (err) {
      console.error("End question error", err);
    }
  };

  /* -------------------------------- */
  /* PDF EXPORT                       */
  /* -------------------------------- */
const downloadPDF = () => {
  const doc = new jsPDF();

  doc.text("Final Scoreboard", 14, 16);

  autoTable(doc, {
    startY: 25,
    head: [["User ID", "Score"]],
    body: scores.map(s => [s.user_id, s.score])
  });

  doc.save("buzzer-scoreboard.pdf");
};

  /* -------------------------------- */
  /* GAME SELECTION UI                */
  /* -------------------------------- */
  if (!selectedGameId) {
    return (
      <div className="center">
        <h2>Select Game</h2>

        <select
          onChange={e => {
            const g = games.find(x => x.game_id === e.target.value);
            if (!g) return;

            setSelectedGameId(g.game_id);
            setTotalQtns(g.total_qtns || 0);
            setCurrentQtn(1);
            setGameOver(false);
          }}
        >
          <option value="">-- Select --</option>

          {games.map(g => (
            <option key={g.game_id} value={g.game_id}>
              {g.game_name}
            </option>
          ))}
        </select>
      </div>
    );
  }

  /* -------------------------------- */
  /* FINAL SCOREBOARD UI              */
  /* -------------------------------- */
  if (gameOver) {
    return (
      <div className="scoreboard-full">
        <h1>🏆 Final Scoreboard</h1>

        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Score</th>
            </tr>
          </thead>

          <tbody>
            {scores.map(s => (
              <tr key={s.user_id}>
                <td>{s.user_id}</td>
                <td>{s.score}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <button onClick={downloadPDF}>⬇ Download PDF</button>
      </div>
    );
  }

  /* -------------------------------- */
  /* WAITING SCREEN                   */
  /* -------------------------------- */
  if (!live) {
    return <h2 className="waiting">Waiting for submissions…</h2>;
  }

  /* -------------------------------- */
  /* MAIN DASHBOARD                   */
  /* -------------------------------- */
  return (
    <div className="dashboard-container">
      {/* LEFT */}
      <div className="dashboard-left">
        <h2>Question {currentQtn}</h2>

        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>✔</th>
              <th>✖</th>
              <th>⏭</th>
            </tr>
          </thead>

          <tbody>
            {decisionStage === "FIRST" && live.first_submission && (
              <tr>
                <td>{live.first_submission}</td>

                <td>
                  <button
                    onClick={() => {
                      updateScore(live.first_submission, C1);
                      endQuestion("CORRECT", null);
                    }}
                  >
                    ✔
                  </button>
                </td>

                <td>
                  <button
                    onClick={() => {
                      updateScore(live.first_submission, -C2);
                      setDecisionStage("SECOND");
                    }}
                  >
                    ✖
                  </button>
                </td>

                <td>
                  <button onClick={() => endQuestion(null, null)}>⏭</button>
                </td>
              </tr>
            )}

            {decisionStage === "SECOND" && live.second_submission && (
              <tr>
                <td>{live.second_submission}</td>

                <td>
                  <button
                    onClick={() => {
                      updateScore(live.second_submission, C2);
                      endQuestion("WRONG", "CORRECT");
                    }}
                  >
                    ✔
                  </button>
                </td>

                <td>
                  <button
                    onClick={() => {
                      updateScore(live.second_submission, -C3);
                      endQuestion("WRONG", "WRONG");
                    }}
                  >
                    ✖
                  </button>
                </td>

                <td>
                  <button onClick={() => endQuestion("WRONG", null)}>⏭</button>
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* ALL SUBMISSIONS */}
        <h3>All Submissions</h3>

        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>User</th>
            </tr>
          </thead>

          <tbody>
            {(live.submissions || []).map((u, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{u}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* RIGHT SCOREBOARD */}
      <div className="dashboard-right">
        <h2>Scoreboard</h2>

        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Score</th>
            </tr>
          </thead>

          <tbody>
            {scores.map(s => (
              <tr key={s.user_id}>
                <td>{s.user_id}</td>
                <td>{s.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

