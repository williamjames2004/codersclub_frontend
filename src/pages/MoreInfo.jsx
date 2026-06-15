const MoreInfo = () => {
  return (
    <div className="min-h-screen w-full flex justify-center bg-[#050b1e] px-6 py-20">

      <div className="w-full max-w-4xl text-gray-300">

        {/* TITLE */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
          QRush
        </h1>

        {/* INTRO */}
        <p className="mb-8 leading-relaxed text-gray-400">
          QRush is an Android-based learning application developed by CodersClub to
          help students improve coding skills through challenges and quizzes.
        </p>

        {/* SECTION */}
        <div className="bg-[#0e1d3a]/90 border border-white/10 rounded-xl p-6 mb-8 backdrop-blur-md">
          <h2 className="text-sky-400 text-xl font-semibold mb-3">
            App Details
          </h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Platform: Android (.apk)</li>
            <li>Release Type: Stable & Latest</li>
            <li>Backend: HTTPS-secured APIs</li>
            <li>Local storage only (no external access)</li>
          </ul>
        </div>

        {/* SECURITY */}
        <div className="bg-[#0e1d3a]/90 border border-white/10 rounded-xl p-6 mb-8 backdrop-blur-md">
          <h2 className="text-sky-400 text-xl font-semibold mb-3">
            Security & Privacy
          </h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>No access to contacts, SMS, calls, or media</li>
            <li>All network traffic is HTTPS encrypted</li>
            <li>No background services or hidden permissions</li>
            <li>Release APK is digitally signed</li>
          </ul>
        </div>

        {/* VIRUS TOTAL */}
        <div className="bg-[#0e1d3a]/90 border border-white/10 rounded-xl p-6 mb-8 backdrop-blur-md">
          <h2 className="text-sky-400 text-xl font-semibold mb-3">
            Independent Security Verification
          </h2>
          <p className="mb-2 text-gray-400">
            This APK has been scanned using VirusTotal (65+ antivirus engines).
          </p>
          <p className="text-emerald-400 font-semibold">
            ✔ 0 / 65 detections (Clean)
          </p>
        </div>

        {/* NEW VERSION */}
        <div className="bg-gradient-to-br from-[#0e1d3a] to-[#060c20] border border-sky-400/30 rounded-xl p-6 mb-8 shadow-[0_0_40px_rgba(79,195,247,0.15)]">

          <h2 className="text-sky-400 text-xl font-semibold mb-3">
            Latest Update – v1.1.0
          </h2>

          <ul className="list-disc pl-5 space-y-2 mb-4">
            <li>✔ Options shuffling bug fixed</li>
            <li>✔ Mode2 & Mode3 category quizzes upgraded</li>
            <li>✔ New Buzzer feature added</li>
            <li>✔ Improved UI & styling</li>
            <li>✔ General performance & bug fixes</li>
          </ul>

          <p className="text-sm text-gray-400 mb-6">
            Version: <span className="font-semibold text-white">1.1.0</span> •
            Release: <span className="font-semibold text-white">Feb 2026</span>
          </p>

          <div className="text-center">
            <a
              href="/QRush1.1.0.apk"
              className="
                inline-block px-10 py-4 rounded-xl font-bold
                text-[#001018]
                bg-gradient-to-r from-sky-400 to-emerald-300
                
                transition-all duration-300
                hover:-translate-y-1 hover:scale-105
                hover:shadow-[0_35px_80px_rgba(79,195,247,0.6)]
                active:scale-95
              "
            >
              Download QRush v1.1.0 (Latest)
            </a>
          </div>
        </div>

        {/* OLD VERSION */}
        <div className="bg-[#0e1d3a]/90 border border-white/10 rounded-xl p-6 mb-8 backdrop-blur-md">

          <h2 className="text-sky-400 text-xl font-semibold mb-3">
            Previous Stable Release – v1.0.0
          </h2>

          <p className="text-gray-400 mb-6">
            Recommended only if you need the original stable build.
          </p>

          <div className="text-center">
            <a
              href="/QRush.apk"
              className="
                inline-block px-8 py-3 rounded-lg font-semibold
                text-gray-200 border border-gray-500/40
                
                transition-all duration-300
                hover:bg-gray-700/30 hover:scale-105
                active:scale-95
              "
            >
              Download QRush v1.0.0 (Stable)
            </a>
          </div>
        </div>

        {/* DISCLAIMER */}
        <div className="mt-10 pt-4 border-t border-white/10 text-xs text-gray-500">
          This app is distributed directly by CodersClub. Users are encouraged to
          verify the APK before installation.
        </div>

      </div>
    </div>
  );
};

export default MoreInfo;
