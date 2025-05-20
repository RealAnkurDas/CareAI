import React, { useState, useRef } from "react";

// Sample data for medications and schedule
const medications = [
  { name: "Paracetamol 500mg", time: "08:00 AM", taken: true },
  { name: "Aspirin 100mg", time: "12:00 PM", taken: true },
  { name: "Metformin 500mg", time: "06:00 PM", taken: false },
  { name: "Atorvastatin 20mg", time: "10:00 PM", taken: false },
];

const schedule = [
  { time: "07:30 AM", event: "Breakfast" },
  { time: "09:00 AM", event: "Physiotherapy" },
  { time: "12:30 PM", event: "Lunch" },
  { time: "03:00 PM", event: "Doctor Visit" },
  { time: "06:30 PM", event: "Dinner" },
  { time: "08:00 PM", event: "Family Video Call" },
];

const faqs = [
  { q: "Can I have visitors?", a: "Visiting hours are 4:00 PM to 8:00 PM daily." },
  { q: "How do I request water or snacks?", a: "Use the 'Request Help' button or ask the chatbot." },
  { q: "When is my next medication?", a: "Check the Medications section for your full schedule." },
  { q: "How do I contact my doctor?", a: "Use the 'Request Help' button and select 'Doctor'." },
];

const styles = {
  container: {
    maxWidth: 600,
    margin: "48px auto",
    padding: 32,
    borderRadius: 20,
    background: "#fff",
    boxShadow: "0 8px 32px rgba(0,0,0,0.10)",
    fontFamily: "Segoe UI, Arial, sans-serif",
  },
  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  header: {
    fontSize: "2rem",
    fontWeight: 700,
    color: "#1976d2",
    letterSpacing: 1,
  },
  langBtn: {
    background: "#f0f4ff",
    border: "none",
    borderRadius: 10,
    padding: "8px 18px",
    fontWeight: 600,
    color: "#1976d2",
    cursor: "pointer",
    fontSize: "1rem",
  },
  chatContainer: {
    background: "#f5f7fa",
    borderRadius: 16,
    padding: 16,
    minHeight: 220,
    marginBottom: 16,
    boxShadow: "0 2px 8px rgba(25, 118, 210, 0.07)",
    display: "flex",
    flexDirection: "column",
    gap: 12,
    overflowY: "auto",
    maxHeight: 280,
  },
  chatInputRow: {
    display: "flex",
    gap: 16,
    marginTop: 16,
    marginBottom: 32,
  },
  chatInput: {
    flex: 1,
    padding: 14,
    borderRadius: 10,
    border: "1px solid #bdbdbd",
    fontSize: "1rem",
  },
  chatButton: {
    background: "#1976d2",
    color: "#fff",
    border: "none",
    borderRadius: 10,
    padding: "14px 28px",
    fontWeight: 600,
    cursor: "pointer",
    fontSize: "1rem",
    transition: "background 0.2s",
  },
  messageUser: {
    alignSelf: "flex-end",
    background: "#e3f2fd",
    color: "#1976d2",
    borderRadius: "16px 16px 4px 16px",
    padding: "12px 18px",
    maxWidth: "80%",
    fontSize: "1rem",
    marginBottom: 8,
  },
  messageBot: {
    alignSelf: "flex-start",
    background: "#fffde7",
    color: "#795548",
    borderRadius: "16px 16px 16px 4px",
    padding: "12px 18px",
    maxWidth: "80%",
    fontSize: "1rem",
    marginBottom: 8,
  },
  quickActions: {
    display: "flex",
    justifyContent: "space-between",
    margin: "32px 0 0 0",
    gap: 24,
  },
  quickButton: {
    flex: 1,
    background: "#f0f4ff",
    color: "#1976d2",
    border: "none",
    borderRadius: 14,
    padding: "20px 0",
    fontWeight: 600,
    cursor: "pointer",
    fontSize: "1.1rem",
    boxShadow: "0 1px 4px rgba(25, 118, 210, 0.06)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
    transition: "background 0.2s",
  },
  medicationInfo: {
    background: "#fff8e1",
    color: "#a1887f",
    borderRadius: 14,
    padding: 18,
    marginTop: 24,
    fontSize: "1.05em",
    textAlign: "center",
    boxShadow: "0 1px 4px rgba(255, 193, 7, 0.08)",
  },
  helpOptions: {
    display: "flex",
    justifyContent: "center",
    gap: 20,
    marginTop: 24,
  },
  helpBtn: {
    padding: "12px 22px",
    borderRadius: 10,
    border: "none",
    background: "#43a047",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "1.05rem",
  },
  modeSwitch: {
    margin: "24px 0 8px 0",
    display: "flex",
    alignItems: "center",
    gap: 20,
    fontSize: "1.05rem",
    justifyContent: "center",
  },
  section: {
    marginBottom: 36,
  },
  sectionTitle: {
    fontSize: "1.2rem",
    fontWeight: 600,
    color: "#1976d2",
    marginBottom: 12,
    marginTop: 8,
  },
  medList: {
    display: "flex",
    flexDirection: "column",
    gap: 18,
  },
  medItem: {
    background: "#f5f7fa",
    borderRadius: 12,
    padding: 16,
    display: "flex",
    alignItems: "center",
    gap: 16,
    boxShadow: "0 2px 8px rgba(25, 118, 210, 0.04)",
  },
  medInfo: { flex: 1 },
  medName: { fontWeight: 600, fontSize: "1.05rem" },
  medTime: { color: "#888", fontSize: "0.98rem" },
  medTaken: { color: "#43a047", fontWeight: 600 },
  medNotTaken: { color: "#f57c00", fontWeight: 600 },
  progress: {
    width: 90,
    height: 12,
    borderRadius: 6,
    background: "#e0e0e0",
    overflow: "hidden",
    marginLeft: 12,
    marginRight: 8,
  },
  progressBar: (percent) => ({
    width: `${percent}%`,
    height: "100%",
    background: percent === 100 ? "#43a047" : "#1976d2",
    transition: "width 0.5s",
  }),
  scheduleList: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    background: "#f9fbe7",
    borderRadius: 10,
    padding: 16,
  },
  scheduleItem: {
    display: "flex",
    alignItems: "center",
    gap: 18,
    fontSize: "1.05rem",
  },
  scheduleTime: {
    fontWeight: 600,
    color: "#1976d2",
    width: 90,
  },
  faqList: {
    display: "flex",
    flexDirection: "column",
    gap: 14,
    background: "#f5f7fa",
    borderRadius: 10,
    padding: 16,
  },
  faqQ: { fontWeight: 600, color: "#1976d2" },
  faqA: { marginLeft: 12, color: "#333" },
};

// Helper function (keep outside the component)
function getMedProgress(med) {
  if (med.taken) return 100;
  const now = new Date();
  const [h, m, ampm] = med.time.match(/(\d+):(\d+) (\w+)/).slice(1);
  let hour = parseInt(h, 10);
  if (ampm === "PM" && hour !== 12) hour += 12;
  const medDate = new Date(now);
  medDate.setHours(hour, parseInt(m, 10), 0, 0);
  if (now > medDate) return 40;
  return 0;
}

export default function App() {
  // Chat state
  const [messages, setMessages] = useState([
    { sender: "bot", text: "👋 Hey! I'm here to help. How can I assist you today?" },
  ]);
  const [input, setInput] = useState("");
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [showMedicationList, setShowMedicationList] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [faqOpen, setFaqOpen] = useState(false);
  const [lang, setLang] = useState("EN");
  const [mode, setMode] = useState("text");
  const audioRef = useRef(null);

  // Simple canned bot replies for demo
  const getBotReply = (userMsg) => {
    const msg = userMsg.toLowerCase();
    if (msg.includes("hello") || msg.includes("hi")) return "Hello! How can I assist you today?";
    if (msg.includes("medication")) return "Please check the Medications section for your full schedule.";
    if (msg.includes("help")) return "If you need urgent help, please press the 'Request Help' button.";
    return "Thanks for your message! I'm here to help with your questions.";
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { sender: "user", text: input };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput("");
    setTimeout(() => {
      const reply = getBotReply(input);
      setMessages((msgs) => [...msgs, { sender: "bot", text: reply }]);
    }, 800);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  // Robust audio play/pause with ref check and no double state update
  const handleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  };

  const handleHelp = (type) => {
    setShowHelp(false);
    setMessages((msgs) => [
      ...msgs,
      { sender: "bot", text: `Your request has been sent to your ${type}.` },
    ]);
  };

  const handleAudioInput = () => {
    setMessages((msgs) => [
      ...msgs,
      { sender: "user", text: "[Audio message]" },
      { sender: "bot", text: "Audio mode is under construction in this demo." },
    ]);
  };

  return (
    <div style={styles.container}>
      {/* Header with language selector */}
      <div style={styles.headerRow}>
        <div style={styles.header}>AI Patient Companion</div>
        <button style={styles.langBtn} onClick={() => setLang(lang === "EN" ? "AR" : "EN")}>
          🌐 {lang}
        </button>
      </div>

      {/* Chatbox */}
      <div style={styles.chatContainer}>
        {messages.map((msg, i) => (
          <div
            key={i}
            style={msg.sender === "user" ? styles.messageUser : styles.messageBot}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Mode Switch */}
      <div style={styles.modeSwitch}>
        <label>
          <input
            type="radio"
            value="text"
            checked={mode === "text"}
            onChange={() => setMode("text")}
          />
          Text
        </label>
        <label>
          <input
            type="radio"
            value="audio"
            checked={mode === "audio"}
            onChange={() => setMode("audio")}
          />
          Audio
        </label>
      </div>

      {/* Chat Input */}
      {mode === "text" ? (
        <div style={styles.chatInputRow}>
          <input
            style={styles.chatInput}
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button style={styles.chatButton} onClick={handleSend}>
            Send
          </button>
        </div>
      ) : (
        <div style={styles.chatInputRow}>
          <button style={styles.chatButton} onClick={handleAudioInput}>
            🎤 Start Recording
          </button>
        </div>
      )}

      {/* Hidden Audio Player */}
      <audio
        ref={audioRef}
        loop
        onPause={() => setMusicPlaying(false)}
        onPlay={() => setMusicPlaying(true)}
        style={{ display: "none" }}
      >
        <source
          src="https://cdn.pixabay.com/audio/2022/07/26/audio_124bfae5e4.mp3"
          type="audio/mp3"
        />
      </audio>

      {/* Quick Actions */}
      <div style={styles.quickActions}>
        <button style={styles.quickButton} onClick={handleMusic}>
          <span role="img" aria-label="music">
            🎵
          </span>
          {musicPlaying ? "Pause Music" : "Play Music"}
        </button>

        <button
          style={styles.quickButton}
          onClick={() => setShowMedicationList((show) => !show)}
        >
          <span role="img" aria-label="pill">
            💊
          </span>
          Medications
        </button>

        <button
          style={styles.quickButton}
          onClick={() => setShowHelp((show) => !show)}
        >
          <span role="img" aria-label="help">
            🆘
          </span>
          Request Help
        </button>
      </div>

      {/* Medications List */}
      {showMedicationList && (
        <div style={styles.section}>
          <div style={styles.sectionTitle}>Today's Medications</div>
          <div style={styles.medList}>
            {medications.map((med, i) => (
              <div key={i} style={styles.medItem}>
                <div style={styles.medInfo}>
                  <div style={styles.medName}>{med.name}</div>
                  <div style={styles.medTime}>{med.time}</div>
                </div>
                <div style={styles.progress}>
                  <div style={styles.progressBar(getMedProgress(med))}></div>
                </div>
                <div>
                  {med.taken ? (
                    <span style={styles.medTaken}>Taken</span>
                  ) : (
                    <span style={styles.medNotTaken}>Upcoming</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Help Options */}
      {showHelp && (
        <div style={styles.helpOptions}>
          <button style={styles.helpBtn} onClick={() => handleHelp("Family")}>
            Family
          </button>
          <button style={styles.helpBtn} onClick={() => handleHelp("Doctor")}>
            Doctor
          </button>
        </div>
      )}

      {/* Daily Schedule */}
      <div style={styles.section}>
        <div style={styles.sectionTitle}>Today's Schedule</div>
        <div style={styles.scheduleList}>
          {schedule.map((item, i) => (
            <div key={i} style={styles.scheduleItem}>
              <span style={styles.scheduleTime}>{item.time}</span>
              <span>{item.event}</span>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div style={styles.section}>
        <div
          style={{ ...styles.sectionTitle, cursor: "pointer", userSelect: "none" }}
          onClick={() => setFaqOpen((open) => !open)}
        >
          FAQ & Quick Info {faqOpen ? "▲" : "▼"}
        </div>
        {faqOpen && (
          <div style={styles.faqList}>
            {faqs.map((faq, i) => (
              <div key={i}>
                <div style={styles.faqQ}>{faq.q}</div>
                <div style={styles.faqA}>{faq.a}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
