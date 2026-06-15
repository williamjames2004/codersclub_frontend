import "./Achievements.css";

const MoreInfo = () => {
  return (
    <div className="moreinfo-wrapper">
      <h1 className="moreinfo-title">QRush</h1>

      <p className="moreinfo-intro">
        QRush is an Android-based learning application developed by CodersClub to
        help students improve coding skills through challenges and quizzes.
      </p>

      {/* 📱 App Details */}
      <div className="moreinfo-section">
        <h2>App Details</h2>
        <ul>
          <li>Platform: Android (.apk)</li>
          <li>Release Type: Stable & Latest</li>
          <li>Backend: HTTPS-secured APIs</li>
          <li>Local storage only (no external access)</li>
        </ul>
      </div>

      {/* 🔐 Security */}
      <div className="moreinfo-section">
        <h2>Security & Privacy</h2>
        <ul>
          <li>No access to contacts, SMS, calls, or media</li>
          <li>All network traffic is HTTPS encrypted</li>
          <li>No background services or hidden permissions</li>
          <li>Release APK is digitally signed</li>
        </ul>
      </div>

      {/* 🛡️ Virus Scan */}
      <div className="moreinfo-section">
        <h2>Independent Security Verification</h2>
        <p>
          This APK has been scanned using VirusTotal (65+ antivirus engines).
        </p>
        <p className="verified-text">✔ 0 / 65 detections (Clean)</p>
      </div>

      {/* 🚀 NEW VERSION */}
      <div className="moreinfo-section highlight">
        <h2>Latest Update – v1.1.0</h2>

        <ul>
          <li>✔ Options shuffling bug fixed</li>
          <li>✔ Mode2 & Mode3 category quizzes upgraded</li>
          <li>✔ New Buzzer feature added</li>
          <li>✔ Improved UI & styling</li>
          <li>✔ General performance & bug fixes</li>
        </ul>

        <p className="version-meta">
          Version: <strong>1.1.0</strong> • Release: <strong>Feb 2026</strong>
        </p>

        <div className="download-section">
          <a
            href="/QRush1.1.0.apk"
            className="download-btn new"
          >
            Download QRush v1.1.0 (Latest)
          </a>
        </div>
      </div>

      {/* 📦 OLD VERSION */}
      <div className="moreinfo-section">
        <h2>Previous Stable Release – v1.0.0</h2>

        <p>
          Recommended only if you need the original stable build.
        </p>

        <div className="download-section">
          <a
            href="/QRush.apk"
            className="download-btn old"
          >
            Download QRush v1.0.0 (Stable)
          </a>
        </div>
      </div>

      {/* ⚠️ Disclaimer */}
      <div className="disclaimer">
        This app is distributed directly by CodersClub. Users are encouraged to
        verify the APK before installation.
      </div>
    </div>
  );
};

export default MoreInfo;

