import { useEffect, useRef, useState } from "react";
import axios from "axios";

const Officials = () => {
  const cardsRef = useRef([]);
  const [officials, setOfficials] = useState([]);

  // 🔥 Fetch API
  useEffect(() => {
    const fetchOfficials = async () => {
      try {
        const res = await axios.get(
          "https://codersclub-i9xo.onrender.com/clubofficials/officials"
        );
        setOfficials(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchOfficials();
  }, []);

  // 🔥 Reset refs before render
  cardsRef.current = [];

  // 🔥 Animation Observer (runs AFTER data loads)
  useEffect(() => {
    if (!officials.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove(
              "opacity-0",
              "translate-y-16",
              "scale-95"
            );
            entry.target.classList.add(
              "opacity-100",
              "translate-y-0",
              "scale-100"
            );
          }
        });
      },
      { threshold: 0.25 }
    );

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, [officials]); // ✅ important

  return (
    <div className="min-h-screen w-full px-6 md:px-20 pt-32 pb-20 bg-[radial-gradient(circle_at_top,_#0b1d3a,_#020617)] text-gray-200">

      {/* HEADER */}
      <div className="text-center mb-24">
        <h2 className="text-3xl md:text-5xl font-black tracking-wide">
          <span className="text-sky-400 text-4xl md:text-5xl drop-shadow-[0_0_30px_rgba(56,189,248,0.7)]">
            Officials
          </span>{" "}
          of our{" "}
          <span className="text-amber-400 text-5xl md:text-5xl font-semibold">
            Coders Club
          </span>
        </h2>
      </div>

      {/* LIST */}
      <div className="flex flex-col gap-20 max-w-6xl mx-auto">

        {officials.map((officer, index) => (
          <div
            key={officer._id} // ✅ FIXED
            ref={(el) => (cardsRef.current[index] = el)}
            className={`
              flex flex-col md:flex-row items-center gap-10
              ${index % 2 !== 0 ? "md:flex-row-reverse" : ""}
              
              opacity-0 translate-y-16 scale-95
              transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
            `}
          >

            {/* IMAGE */}
            <img
              src={`https://codersclub-i9xo.onrender.com/${officer.image}`}
              alt={officer.name}
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/200";
              }}
              className="w-56 h-72 object-cover rounded-2xl border border-sky-400/50
              shadow-[0_0_35px_rgba(56,189,248,0.6),inset_0_0_20px_rgba(56,189,248,0.2)]"
            />

            {/* CONTENT */}
            <div className="max-w-xl p-8 rounded-2xl bg-[#020617]/70 border border-sky-400/30 backdrop-blur-xl
              shadow-[0_0_40px_rgba(56,189,248,0.18),inset_0_0_25px_rgba(56,189,248,0.06)]">

              <h2 className="text-2xl md:text-3xl font-extrabold text-sky-100 mb-4">
                {officer.name}
              </h2>

              <p className="mb-2">
                <span className="text-sky-400 font-semibold">Profession:</span>{" "}
                {officer.prof}
              </p>

              <p className="mb-2">
                <span className="text-sky-400 font-semibold">Department:</span>{" "}
                {officer.dept}
              </p>

              <p className="mt-4 italic text-indigo-300">
                <span className="text-sky-400 font-semibold">Role:</span>{" "}
                {officer.role?.join(", ")}
              </p>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Officials;
