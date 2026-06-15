import { useNavigate } from "react-router-dom";

const Achievements = () => {
  const navigate = useNavigate();

  const releases = [
    {
      id: "qrush",
      type: "Mobile Application",
      name: "QRush",
      purpose:
        "Daily coding challenges, quizzes, and practice platform for developers.",
      platform: "Android (.apk)",
      status: "Stable Release",
      security: "VirusTotal verified (0 detections)",
    },
  ];

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start gap-10 px-6 md:px-12 py-24 bg-[#050b1e]">

      {releases.map((app) => (
        <div
          key={app.id}
          onClick={() => navigate(`/achievements/${app.id}`)}
          className="
            w-full max-w-5xl
            bg-gradient-to-br from-[#0e1d3a] to-[#060c20]
            border border-white/10
            rounded-2xl
            p-6 md:p-8
            cursor-pointer
            
            transition-all duration-300 ease-in-out
            hover:-translate-y-2 hover:scale-[1.02]
            hover:shadow-[0_30px_70px_rgba(79,195,247,0.25)]
            
            shadow-[0_18px_40px_rgba(0,0,0,0.6)]
          "
        >
          {/* TYPE */}
          <div className="text-xs uppercase tracking-widest text-sky-400 mb-2">
            {app.type}
          </div>

          {/* TITLE */}
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            {app.name}
          </h2>

          {/* DESCRIPTION */}
          <p className="text-gray-400 leading-relaxed mb-5">
            {app.purpose}
          </p>

          {/* INFO */}
          <div className="space-y-2 text-sm text-gray-400">
            <div className="flex justify-between">
              <span className="font-semibold text-white/80">Platform</span>
              <span>{app.platform}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-semibold text-white/80">Status</span>
              <span>{app.status}</span>
            </div>
          </div>

          {/* SECURITY BADGE */}
          <div className="
            mt-6 inline-block px-4 py-1.5 text-xs rounded-full
            text-emerald-300 border border-emerald-400/40
            bg-emerald-400/10
          ">
            ✔ {app.security}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Achievements;