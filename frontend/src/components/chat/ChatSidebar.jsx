import React from "react";
import "./ChatSidebar.css";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "../ThemeToggle";

const ChatSidebar = ({
  chats,
  activeChatId,
  onSelectChat,
  onNewChat,
  open,
  onLogout,
  user, // ✅ receive logged-in user
}) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <aside className={"chat-sidebar " + (open ? "open" : "")}>
      <div className="sidebar-header">
        <h2>Chats</h2>
        <button className="small-btn" onClick={onNewChat}>
          New
        </button>
      </div>

      <nav className="chat-list" aria-live="polite">
        {chats.map((c) => (
          <button
            key={c._id}
            className={
              "chat-list-item " + (c._id === activeChatId ? "active" : "")
            }
            onClick={() => onSelectChat(c._id)}
          >
            <span className="title-line">{c.title}</span>
          </button>
        ))}
        {chats.length === 0 && <p className="empty-hint">No chats yet.</p>}
      </nav>

      {/* ✅ Sidebar footer */}
      <div className="sidebar-footer">
        {!user ? (
          <button className="login-btn" onClick={handleLogin}>
            Login
          </button>
        ) : (
          <div className="user-card">
            <div className="user-info">
              <div className="avatar">
                {user?.fullName?.firstName?.charAt(0).toUpperCase() || "U"}
              </div>
              <div>
                <div className="user-name">
                  {user?.fullName?.firstName} {user?.fullName?.lastName}
                </div>
                <div className="user-email">{user?.email}</div>
              </div>
            </div>
            <hr />
            {/* ✅ Render ThemeToggle as a button */}
            <ThemeToggle className="user-action" />
            <hr />
            <button className="logout-btn" onClick={onLogout}>
              Log out
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};

export default ChatSidebar;
