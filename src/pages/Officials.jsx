import { useEffect, useRef } from "react";
import profImg from "../assets/1.jpg";
import nandhaImg from "../assets/2.jpeg";
import jeevaImg from "../assets/3.jpg";

const Officials = () => {
  const cardsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("opacity-0");
            entry.target.classList.remove("translate-y-16");
            entry.target.classList.remove("scale-95");

            entry.target.classList.add("opacity-100");
            entry.target.classList.add("translate-y-0");
            entry.target.classList.add("scale-100");
          }
        });
      },
      { threshold: 0.25 }
    );

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  const officials = [
    {
      name: "Prof. Jesudoss",
      image: profImg,
      profession: "Professor",
      department: "Department of Artificial Intelligence",
      role: "Founder, In-charge, Full Administrator Control",
    },
    {
      name: "Mr. Nandhakumaaran",
      image: nandhaImg,
      profession: "Student",
      pursuing: "I M.Sc Artificial Intelligence",
      department: "Department of Artificial Intelligence",
      role:
        "President, responsible for chief guest invitations, arrangements, front-line coordination, and complete non-technical management of events",
    },
    {
      name: "Mr. Jeeva Loganathan",
      image: jeevaImg,
      profession: "Student",
      pursuing: "I M.Sc Artificial Intelligence",
      department: "Department of Artificial Intelligence",
      role:
        "Vice President, backbone of technical works, question preparation, evaluations, and technical execution",
    },
  ];

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
            key={index}
            ref={(el) => (cardsRef.current[index] = el)}
            className={`
              flex flex-col md:flex-row items-center gap-10
              ${index % 2 !== 0 ? "md:flex-row-reverse" : ""}
              
              opacity-0 translate-y-16 scale-95
              transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
            `}
          >

            {/* IMAGE */}
            <div>
              <img
                src={officer.image}
                alt={officer.name}
                className="w-56 h-72 object-cover rounded-2xl border border-sky-400/50
                shadow-[0_0_35px_rgba(56,189,248,0.6),inset_0_0_20px_rgba(56,189,248,0.2)]"
              />
            </div>

            {/* CONTENT */}
            <div className="max-w-xl p-8 rounded-2xl bg-[#020617]/70 border border-sky-400/30 backdrop-blur-xl
              shadow-[0_0_40px_rgba(56,189,248,0.18),inset_0_0_25px_rgba(56,189,248,0.06)]">

              <h2 className="text-2xl md:text-3xl font-extrabold text-sky-100 mb-4">
                {officer.name}
              </h2>

              <p className="mb-2">
                <span className="text-sky-400 font-semibold">Profession:</span>{" "}
                {officer.profession}
              </p>

              {officer.pursuing && (
                <p className="mb-2">
                  <span className="text-sky-400 font-semibold">Pursuing:</span>{" "}
                  {officer.pursuing}
                </p>
              )}

              <p className="mb-2">
                <span className="text-sky-400 font-semibold">Department:</span>{" "}
                {officer.department}
              </p>

              <p className="mt-4 italic text-indigo-300">
                <span className="text-sky-400 font-semibold">Role:</span>{" "}
                {officer.role}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Officials;