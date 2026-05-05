import { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function Chat() {
  const { id } = useParams();
  const currentUser = "You";

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [userName, setUserName] = useState("");

  const bottomRef = useRef(null);

  // ✅ memoized function (FIX for Vercel ESLint error)
  const fetchMessages = useCallback(async () => {
    try {
      const res = await axios.get(
        `https://matrimony-backend-1-ri82.onrender.com/api/messages/${currentUser}/${id}`
      );

      setMessages(res.data);

      setTimeout(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (err) {
      console.log("Error:", err);
    }
  }, [id]);

  // ✅ fetch messages + auto refresh
  useEffect(() => {
    fetchMessages();

    const interval = setInterval(() => {
      fetchMessages();
    }, 2000);

    return () => clearInterval(interval);
  }, [fetchMessages]);

  // ✅ get user name
  useEffect(() => {
    axios
      .get(`https://matrimony-backend-1-ri82.onrender.com/api/users/${id}`)
      .then((res) => setUserName(res.data.name))
      .catch(() => setUserName("User"));
  }, [id]);

  const sendMessage = async () => {
    if (!text.trim()) return;

    try {
      await axios.post(
        "https://matrimony-backend-1-ri82.onrender.com/api/messages",
        {
          sender: currentUser,
          receiver: id,
          text,
        }
      );

      setText("");
      fetchMessages();
    } catch (err) {
      console.log("Send error:", err);
    }
  };

  return (
    <div style={styles.container}>
      <h2>💬 Chat with {userName}</h2>

      <div style={styles.chatBox}>
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              textAlign: msg.sender === currentUser ? "right" : "left",
              margin: "8px 0",
            }}
          >
            <span
              style={{
                background:
                  msg.sender === currentUser ? "#dcf8c6" : "#eee",
                padding: "8px 12px",
                borderRadius: 10,
                display: "inline-block",
              }}
            >
              {msg.text}
            </span>
          </div>
        ))}

        <div ref={bottomRef}></div>
      </div>

      <div style={styles.inputArea}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type message..."
          style={styles.input}
        />

        <button onClick={sendMessage} style={styles.button}>
          Send
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: 20,
    maxWidth: 600,
    margin: "auto",
  },

  chatBox: {
    height: 400,
    overflowY: "auto",
    border: "1px solid #ccc",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    background: "#fafafa",
  },

  inputArea: {
    display: "flex",
    gap: 10,
  },

  input: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    border: "1px solid #ccc",
  },

  button: {
    padding: "10px 15px",
    background: "#8B0000",
    color: "white",
    border: "none",
    borderRadius: 5,
  },
};

export default Chat;