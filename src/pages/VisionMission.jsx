import { FaEye, FaRocket, FaBrain } from "react-icons/fa";

const VisionMission = () => {
  return (
    <div className="min-h-screen w-full px-6 md:px-20 pt-32 pb-20 bg-[radial-gradient(circle_at_top,_#0b1d3a,_#020617)] text-gray-200">

      {/* HEADER */}
      <div className="text-center mb-24">
        <h1 className="text-4xl md:text-6xl font-black tracking-wide">
          <span className="text-sky-400 drop-shadow-[0_0_30px_rgba(56,189,248,0.8)]">
            Vision
          </span>{" "}
          &{" "}
          <span className="text-cyan-400">
            Mission
          </span>
        </h1>

        <p className="mt-4 text-indigo-300 text-sm md:text-base">
          Coders Club • Department of Artificial Intelligence
        </p>
      </div>

      {/* CARDS CONTAINER */}
      <div className="space-y-16 max-w-6xl mx-auto">

        {/* VISION */}
        <div className="flex flex-col md:flex-row items-center gap-10 p-8 md:p-12 rounded-3xl bg-[#020617]/70 border border-sky-400/30 backdrop-blur-xl shadow-[0_0_40px_rgba(56,189,248,0.15)]">

          <FaEye className="text-9xl text-sky-400 drop-shadow-[0_0_15px_rgba(56,189,248,0.7)]" />

          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-sky-100 mb-4">
              Our Vision
            </h2>

            <p className="leading-relaxed text-gray-300">
              Our vision is to create a generation of students with
              <span className="text-sky-400 font-semibold"> strong technical knowledge</span>,
              <span className="text-sky-400 font-semibold"> innovative thinking</span>, and the confidence to apply
              technology in real-world scenarios. Coders Club envisions a learning
              ecosystem where students are not just consumers of technology, but
              <span className="text-sky-400 font-semibold"> creators, innovators, and problem solvers</span>.
            </p>
          </div>
        </div>

        {/* MISSION */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-10 p-8 md:p-12 rounded-3xl bg-[#020617]/70 border border-sky-400/30 backdrop-blur-xl shadow-[0_0_40px_rgba(56,189,248,0.15)]">

          <FaRocket className="text-9xl text-sky-400 drop-shadow-[0_0_15px_rgba(56,189,248,0.7)]" />

          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-sky-100 mb-4">
              Our Mission
            </h2>

            <p className="leading-relaxed text-gray-300">
              The mission of Coders Club is to provide students with continuous
              opportunities to <span className="text-sky-400 font-semibold">learn, practice, and apply</span> technical
              skills through hands-on activities, competitions, workshops, and
              collaborative projects. The club encourages students to explore programming,
              logical thinking, and emerging technologies, enabling them to
              <span className="text-sky-400 font-semibold"> transform knowledge into career-ready skills</span>.
            </p>
          </div>
        </div>

        {/* GOAL */}
        <div className="flex flex-col md:flex-row items-center gap-10 p-8 md:p-12 rounded-3xl bg-[#020617]/70 border border-sky-400/30 backdrop-blur-xl shadow-[0_0_40px_rgba(56,189,248,0.15)]">

          <FaBrain className="text-9xl text-sky-400 drop-shadow-[0_0_15px_rgba(56,189,248,0.7)]"/>

          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-sky-100 mb-4">
              Our Goal
            </h2>

            <p className="leading-relaxed text-gray-300">
              The ultimate goal of Coders Club is to empower students to build
              strong foundations in programming and technical domains, while
              fostering curiosity and self-learning. By providing a platform to
              experiment, innovate, and showcase their talents, the club prepares
              students for academics, careers, and real-world problem solving.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default VisionMission;