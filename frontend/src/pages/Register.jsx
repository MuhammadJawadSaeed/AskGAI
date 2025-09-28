import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Bot, Mail, Lock } from "lucide-react";
import { RiUser3Line } from "react-icons/ri";

const Register = () => {
  const [form, setForm] = useState({
    email: "",
    firstname: "",
    lastname: "",
    password: "",
    confirmPassword: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setSubmitting(true);
    try {
      const res = await axios.post(
        "https://askgai.onrender.com/api/auth/register",
        {
          email: form.email,
          fullName: {
            firstName: form.firstname,
            lastName: form.lastname,
          },
          password: form.password,
        },
        { withCredentials: true }
      );

      console.log(res);
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Registration failed");
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
          <h1>Create your account</h1>
          <p>Join Ask-Bot and start chatting with AI</p>
        </header>

        {/* Form */}
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="input-row">
            <div className="input-group">
              <RiUser3Line className="input-icon" />
              <input
                type="text"
                name="firstname"
                placeholder="First name"
                value={form.firstname}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <RiUser3Line className="input-icon" />
              <input
                type="text"
                name="lastname"
                placeholder="Last name"
                value={form.lastname}
                onChange={handleChange}
                required
              />
            </div>
          </div>

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
              placeholder="Create a password"
              value={form.password}
              onChange={handleChange}
              required
              minLength={6}
            />
          </div>

          <div className="input-group">
            <Lock className="input-icon" />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              minLength={6}
            />
          </div>

          <button type="submit" className="submit-btn" disabled={submitting}>
            {submitting ? "Creating..." : "Create account"}
          </button>
        </form>

        <p className="register-alt">
          Already have an account?{" "}
          <Link to="/login" className="login-link">
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
