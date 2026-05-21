import { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function Chat() {
  const { id } = useParams();

  const currentUser = "You";

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [user, setUser] = useState(null);

  const bottomRef = useRef(null);

  const API = "https://matrimony-backend-1-ri82.onrender.com/api";

  // FETCH MESSAGES
  const fetchMessages = useCallback(async () => {
    try {
      const res = await axios.get(
        `${API}/messages/${currentUser}/${id}`
      );

      setMessages(res.data);

      setTimeout(() => {
        bottomRef.current?.scrollIntoView({
          behavior: "smooth",
        });
      }, 100);

    } catch (err) {
      console.log(err);
    }
  }, [id]);

  // AUTO REFRESH
  useEffect(() => {
    fetchMessages();

    const interval = setInterval(() => {
      fetchMessages();
    }, 2000);

    return () => clearInterval(interval);
  }, [fetchMessages]);

  // FETCH USER
  useEffect(() => {
    axios
      .get(`${API}/users/${id}`)
      .then((res) => setUser(res.data))
      .catch(() => console.log("User fetch error"));
  }, [id]);

  // SEND MESSAGE
  const sendMessage = async () => {
    if (!text.trim()) return;

    try {
      await axios.post(`${API}/messages`, {
        sender: currentUser,
        receiver: id,
        text,
      });

      setText("");
      fetchMessages();

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={styles.page}>

      <div style={styles.chatContainer}>

        {/* HEADER */}
        <div style={styles.header}>

          <div style={styles.userInfo}>

            <img
              src={
                user?.image
                  ? user.image.startsWith("http")
                    ? user.image
                    : `https://matrimony-backend-1-ri82.onrender.com${user.image}`
                  : "https://via.placeholder.com/100"
              }
              alt="profile"
              style={styles.avatar}
            />

            <div>
              <h2 style={styles.userName}>
                {user?.name || "Loading..."}
              </h2>

              <p style={styles.online}>
                🟢 Online
              </p>
            </div>

          </div>

        </div>

        {/* CHAT AREA */}
        <div style={styles.chatBox}>

          {messages.map((msg, index) => {

            const isMe = msg.sender === currentUser;

            return (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent: isMe ? "flex-end" : "flex-start",
                  marginBottom: 15,
                }}
              >

                <div
                  style={{
                    ...styles.messageBubble,
                    background: isMe
                      ? "#ff4d6d"
                      : "#ffffff",
                    color: isMe ? "#fff" : "#333",
                    borderBottomRightRadius: isMe ? 5 : 18,
                    borderBottomLeftRadius: isMe ? 18 : 5,
                  }}
                >

                  <p style={styles.messageText}>
                    {msg.text}
                  </p>

                  <span style={styles.time}>
                    {new Date(msg.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>

                </div>

              </div>
            );
          })}

          <div ref={bottomRef}></div>

        </div>

        {/* INPUT */}
        <div style={styles.inputArea}>

          <input
            type="text"
            placeholder="Type your message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && sendMessage()
            }
            style={styles.input}
          />

          <button
            onClick={sendMessage}
            style={styles.sendBtn}
          >
            ➤
          </button>

        </div>

      </div>

    </div>
  );
}

const styles = {

  page: {
    minHeight: "100vh",
    background: "#f6f7fb",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    fontFamily: "Arial",
  },

  chatContainer: {
    width: "100%",
    maxWidth: 700,
    height: "90vh",
    background: "#fff",
    borderRadius: 25,
    overflow: "hidden",
    boxShadow: "0 10px 35px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
  },

  header: {
    padding: "20px 25px",
    borderBottom: "1px solid #eee",
    background: "#fff",
  },

  userInfo: {
    display: "flex",
    alignItems: "center",
    gap: 15,
  },

  avatar: {
    width: 60,
    height: 60,
    borderRadius: "50%",
    objectFit: "cover",
  },

  userName: {
    margin: 0,
    fontSize: 22,
    color: "#222",
  },

  online: {
    margin: 0,
    color: "#777",
    fontSize: 14,
  },

  chatBox: {
    flex: 1,
    overflowY: "auto",
    padding: 25,
    background: "#fff5f7",
  },

  messageBubble: {
    maxWidth: "70%",
    padding: "12px 16px",
    borderRadius: 18,
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
  },

  messageText: {
    margin: 0,
    fontSize: 15,
    lineHeight: 1.5,
  },

  time: {
    display: "block",
    marginTop: 6,
    fontSize: 11,
    opacity: 0.7,
    textAlign: "right",
  },

  inputArea: {
    display: "flex",
    gap: 10,
    padding: 20,
    borderTop: "1px solid #eee",
    background: "#fff",
  },

  input: {
    flex: 1,
    padding: "15px 18px",
    borderRadius: 30,
    border: "1px solid #ddd",
    outline: "none",
    fontSize: 15,
  },

  sendBtn: {
    width: 55,
    borderRadius: "50%",
    border: "none",
    background: "#ff4d6d",
    color: "white",
    fontSize: 20,
    cursor: "pointer",
    fontWeight: "bold",
  },

};

export default Chat;