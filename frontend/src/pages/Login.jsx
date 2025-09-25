import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Bot, Mail, Lock } from "lucide-react";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/login",
        {
          email: form.email,
          password: form.password,
        },
        { withCredentials: true }
      );

      console.log(res);
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Login failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="register-page">
      <div className="register-card">
        {/* Header */}
        <header className="register-header">
          <div className="icon-circle">
            <Bot size={28} />
          </div>
          <h1>Welcome back</h1>
          <p>Sign in to your Ask-Bot account</p>
        </header>

        {/* Form */}
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <Mail className="input-icon" />
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <Lock className="input-icon" />
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="submit-btn" disabled={submitting}>
            {submitting ? "Signing in..." : "Sign in"}
          </button>
        </form>

        {/* Footer */}
        <p className="register-alt">
          Don’t have an account?{" "}
          <Link to="/register" className="login-link">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
