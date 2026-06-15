import { FaBrain, FaCode, FaUsers, FaTrophy } from "react-icons/fa";
import Loading from "./Loading";
import heroimg from "../assets/codersclub-hero.png";
import aboutimg from "../assets/aboutimg.png";

export default function Landing() {
  const hasLoaded = sessionStorage.getItem("ai_loaded");

  if (!hasLoaded) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen w-full text-white overflow-x-hidden">
      <section className="min-h-screen w-full flex items-center justify-center px-6 md:px-16">
        <div className="max-w-7xl w-full grid lg:grid-cols-2 md:grid-cols-1 gap-10 items-center">
          <div className="text-center md:mt-20 lg:mt-0">
            <h1 className="text-blue-300 tracking-widest text-2xl md:text-3xl lg:text-5xl sm:text-3xl">
              Welcome to
            </h1>
            <h2 className="mt-4 font-semibold leading-tight">
              <span className="text-blue-200 text-4xl md:text-5xl lg:text-6xl">TECH </span>
              <span className="text-green-300 text-5xl md:text-6xl lg:text-7xl tracking-wider font-[Orbitron]">
                VERSE
              </span>
              <span className="text-orange-300 text-4xl md:text-5xl lg:text-6xl mx-2">
                of
              </span>
              <span className="text-purple-400 text-6xl md:text-7xl lg:text-8xl font-extrabold drop-shadow-[0_0_35px_rgba(168,85,247,0.9)]">
                AI
              </span>
            </h2>
            <h1 className="mt-10 flex justify-center md:justify-center items-center gap-4 text-3xl md:text-6xl lg:text-7xl font-black text-sky-100">
              <FaCode className="text-sky-400 drop-shadow-[0_0_15px_rgba(56,189,248,0.9)]" />
              <span className="bg-gradient-to-r from-sky-300 to-cyan-400 bg-clip-text text-transparent">
                Coders Club
              </span>
              <FaBrain className="text-sky-400 drop-shadow-[0_0_15px_rgba(56,189,248,0.9)]" />
            </h1>
            <p className="mt-6 text-indigo-300 text-lg md:text-xl max-w-xl mx-auto">
              filled with young talent & mixture of knowledge
            </p>
          </div>

          <div className="flex justify-center">
            <img src={heroimg} alt="Hero Image" className="w-full max-w-xl" />
          </div>
        </div>
      </section>

      <section className="min-h-screen w-full flex flex-col items-center px-6 md:px-16">
        <div className="my-10 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-sky-100 drop-shadow-[0_0_25px_rgba(56,189,248,0.6)]">
            About <span className="text-sky-400">Coders Club</span>
          </h1>
          <p className="mt-4 text-indigo-300 text-sm md:text-lg">
            Department of Artificial Intelligence <br />
            <span className="text-blue-300">
              St. Joseph’s College, Tiruchirappalli
            </span>
          </p>
        </div>
        <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center">
            <img src={aboutimg} alt="" className="w-[90%] md:h-100 lg:h-3/4" />
          </div>
          <div className="h-[500px] overflow-hidden relative">
            <div className="absolute w-full scroll-cards space-y-6">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="grid gap-6">
                  <div className="bg-[#020617]/70 backdrop-blur-xl border border-sky-400/20 p-6 rounded-2xl">
                    <FaBrain className="text-sky-400 mb-3" />
                    <p>
                      Department established in <span className="text-sky-400">2024</span>.  
                      Clubs introduced in <span className="text-sky-400">2025</span>.
                    </p>
                  </div>
                  <div className="bg-[#020617]/70 backdrop-blur-xl border border-sky-400/20 p-6 rounded-2xl">
                    <FaUsers className="text-sky-400 mb-3" />
                    <p>
                      Initiated by <span className="text-blue-400">Prof. Jesudoss</span>.
                    </p>
                  </div>
                  <div className="bg-[#020617]/70 backdrop-blur-xl border border-sky-400/20 p-6 rounded-2xl">
                    <FaCode className="text-sky-400 mb-3" />
                    <p>
                      Focus on programming & technical skills.
                    </p>
                  </div>
                  <div className="bg-[#020617]/70 backdrop-blur-xl border border-sky-400/20 p-6 rounded-2xl">
                    <FaTrophy className="text-sky-400 mb-3" />
                    <p>
                      Inaugurated on <span className="text-sky-400">05•07•2025</span>.
                    </p>
                  </div>

                </div>
              ))}

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}