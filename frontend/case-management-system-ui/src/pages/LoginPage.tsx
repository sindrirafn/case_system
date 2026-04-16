import { useState } from "react";
import type { FormEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { login } from "../api/authApi";
import { useAuth } from "../context/AuthContext";
import styles from "./LoginPage.module.css";


function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  // const { loginUser } = useAuth();
  const { user, loginUser } = useAuth();
  const [email, setEmail] = useState("sindri.admin@casevia.local");
  const [password, setPassword] = useState("Password123!");
  const [message, setMessage] = useState("");

  const from = (location.state as { from?: { pathname?: string } } | undefined)?.from?.pathname || "/dashboard";

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      loginUser({
        token: data.token,
        userId: data.userId,
        fullName: data.fullName,
        email: data.email,
        role: data.role
      });

      navigate(from, { replace: true });
    },
    onError: () => {
      setMessage("Invalid email or password.");
    }
  });

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");

    if (!email.trim() || !password.trim()) {
      setMessage("Email and password are required.");
      return;
    }

    loginMutation.mutate({
      email: email.trim(),
      password
    });
  }

  return (
    <section className={styles.page}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h2>Login</h2>
          <p>Sign in to access Casevia.</p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            className={styles.primaryButton}
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? "Signing in..." : "Sign In"}
          </button>

          {message && <p className={styles.message}>{message}</p>}
        </form>
      </div>
    </section>
  );
}

export default LoginPage;