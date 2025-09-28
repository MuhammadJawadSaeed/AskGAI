import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import ChatMobileBar from "../components/chat/ChatMobileBar.jsx";
import ChatSidebar from "../components/chat/ChatSideBar.jsx";
import ChatMessages from "../components/chat/ChatMessages.jsx";
import ChatComposer from "../components/chat/ChatComposer.jsx";
import "../components/chat/ChatLayout.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import {
  startNewChat,
  selectChat,
  setInput,
  sendingStarted,
  sendingFinished,
  setChats,
} from "../store/chatSlice.js";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const chats = useSelector((state) => state.chat.chats);
  const activeChatId = useSelector((state) => state.chat.activeChatId);
  const input = useSelector((state) => state.chat.input);
  const isSending = useSelector((state) => state.chat.isSending);

  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(null); // ✅ logged-in user

  const activeChat = chats.find((c) => c.id === activeChatId) || null;

  // 🚀 Create a new chat
  const handleNewChat = async () => {
    let title = window.prompt("Enter a title for the new chat:", "");
    if (title) title = title.trim();
    if (!title) return;

    try {
      const response = await axios.post(
        "https://askgai.onrender.com/api/chat",
        { title },
        { withCredentials: true }
      );
      getMessages(response.data.chat._id);
      dispatch(startNewChat(response.data.chat));
      setSidebarOpen(false);
    } catch (err) {
      if (err.response?.status === 401) navigate("/login");
    }
  };

  // 🚀 Handle Logout
  const handleLogout = async () => {
    try {
      await axios.post(
        "https://askgai.onrender.com/api/auth/logout",
        {},
        { withCredentials: true }
      );
    } catch (err) {
      console.error("Logout error:", err);
    }

    Cookies.remove("token"); // just in case non-httpOnly token
    dispatch(setChats([]));
    setMessages([]);
    setUser(null);
    // navigate("/login"); // optional redirect
  };

  // 🚀 Fetch chats + user profile
  useEffect(() => {
    // ✅ fetch chats
    axios
      .get("https://askgai.onrender.com/api/chat", { withCredentials: true })
      .then((response) => {
        dispatch(setChats(response.data.chats.reverse()));
      })
      .catch((err) => {
        if (err.response?.status === 401) {
          // navigate("/login");
        }
      });

    // ✅ fetch logged in user
    axios
      .get("https://askgai.onrender.com/api/auth/me", { withCredentials: true })
      .then((res) => {
        setUser(res.data.user);
      })
      .catch(() => setUser(null));

    // ✅ setup socket
    const tempSocket = io("https://askgai.onrender.com", {
      withCredentials: true,
    });

    tempSocket.on("ai-response", (messagePayload) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: "ai", content: messagePayload.content },
      ]);
      dispatch(sendingFinished());
    });

    setSocket(tempSocket);
  }, []);

  // 🚀 Send message
  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || !activeChatId || isSending) return;

    dispatch(sendingStarted());
    setMessages([...messages, { type: "user", content: trimmed }]);
    dispatch(setInput(""));

    socket.emit("ai-message", { chat: activeChatId, content: trimmed });
  };

  // 🚀 Fetch messages of a chat
  const getMessages = async (chatId) => {
    try {
      const response = await axios.get(
        `https://askgai.onrender.com/api/chat/messages/${chatId}`,
        { withCredentials: true }
      );

      setMessages(
        response.data.messages.map((m) => ({
          type: m.role === "user" ? "user" : "ai",
          content: m.content,
        }))
      );
    } catch (err) {
      if (err.response?.status === 401) navigate("/login");
    }
  };

  return (
    <div className="chat-layout minimal">
      <ChatMobileBar
        onToggleSidebar={() => setSidebarOpen((o) => !o)}
        onNewChat={handleNewChat}
      />

      <ChatSidebar
        chats={chats}
        activeChatId={activeChatId}
        onSelectChat={(id) => {
          dispatch(selectChat(id));
          setSidebarOpen(false);
          getMessages(id);
        }}
        onNewChat={handleNewChat}
        open={sidebarOpen}
        onLogout={handleLogout}
        user={user} // ✅ pass user down
      />

      <main className="chat-main" role="main">
        {messages.length === 0 && (
          <div className="chat-welcome" aria-hidden="true">
            <div className="chip">Early Preview</div>
            <h1>AskGAI</h1>
            <p>
              Ask anything. Paste text, brainstorm ideas, or get quick
              explanations. Your chats stay in the sidebar so you can pick up
              where you left off.
            </p>
          </div>
        )}

        <ChatMessages messages={messages} isSending={isSending} />

        {activeChatId && (
          <ChatComposer
            input={input}
            setInput={(v) => dispatch(setInput(v))}
            onSend={sendMessage}
            isSending={isSending}
          />
        )}
      </main>

      {sidebarOpen && (
        <button
          className="sidebar-backdrop"
          aria-label="Close sidebar"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Home;
