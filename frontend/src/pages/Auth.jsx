import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";
import { motion } from "framer-motion";

const SIDE_IMG = "https://images.unsplash.com/photo-1605733513597-a8f8341084e6?w=900";

const AuthShell = ({ title, children, footer, testId }) => (
  <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-2 bg-white" data-testid={testId}>
    <motion.div
      initial={{ opacity: 0, scale: 1.04 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7 }}
      className="relative hidden lg:block overflow-hidden"
    >
      <img src={SIDE_IMG} alt="Jute craftsmanship" className="absolute inset-0 w-full h-full object-cover" />
    </motion.div>
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col justify-center items-center px-6 py-12 sm:px-12"
    >
      <div className="w-full max-w-md">
        <h1 className="text-4xl sm:text-5xl font-display font-semibold text-[#007D7B] mb-10 text-center">{title}</h1>
        {children}
        <div className="text-center mt-6 text-sm text-gray-600">{footer}</div>
        <div className="text-center my-6 text-sm font-semibold text-gray-700">OR</div>
        <button
          onClick={() => toast.info("Google sign-in coming soon")}
          className="w-full border border-gray-300 rounded-md py-3 flex items-center justify-center gap-3 hover:bg-gray-50 btn-press"
          data-testid="google-signin"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="" className="w-5 h-5" />
          <span className="text-sm font-medium text-gray-700">Sign up with Google</span>
        </button>
      </div>
    </motion.div>
  </div>
);

export const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ full_name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signup(form.full_name, form.email, form.password);
      toast.success("Account created!");
      navigate("/");
    } catch (e) {
      toast.error(e?.response?.data?.detail || "Signup failed");
    } finally { setLoading(false); }
  };

  return (
    <AuthShell title="Welcome" testId="signup-page" footer={
      <>Already have an account? <Link to="/login" className="text-[#007D7B] font-semibold hover:underline">Log in</Link></>
    }>
      <form onSubmit={onSubmit} className="space-y-5" data-testid="signup-form">
        <Field label="Full Name" name="full_name" placeholder="John Doe" value={form.full_name}
          onChange={(v) => setForm({ ...form, full_name: v })} testId="signup-name" />
        <Field label="Email" name="email" type="email" placeholder="Enter your Email here" value={form.email}
          onChange={(v) => setForm({ ...form, email: v })} testId="signup-email" />
        <Field label="Password" name="password" type="password" placeholder="Enter your Password" value={form.password}
          onChange={(v) => setForm({ ...form, password: v })} testId="signup-password" />
        <button type="submit" disabled={loading}
          className="w-full bg-[#007D7B] hover:bg-[#006B69] text-white font-semibold py-3 rounded-md btn-press disabled:opacity-60"
          data-testid="signup-submit">
          {loading ? "Creating..." : "Create Account"}
        </button>
      </form>
    </AuthShell>
  );
};

export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form.email, form.password);
      toast.success("Welcome back!");
      navigate("/");
    } catch (e) {
      toast.error(e?.response?.data?.detail || "Login failed");
    } finally { setLoading(false); }
  };

  return (
    <AuthShell title="Welcome" testId="login-page" footer={
      <>Don't have an account? <Link to="/signup" className="text-[#007D7B] font-semibold hover:underline">Sign up</Link></>
    }>
      <form onSubmit={onSubmit} className="space-y-5" data-testid="login-form">
        <Field label="Email" name="email" type="email" placeholder="Enter your Email here" value={form.email}
          onChange={(v) => setForm({ ...form, email: v })} testId="login-email" />
        <Field label="Password" name="password" type="password" placeholder="Enter your Password" value={form.password}
          onChange={(v) => setForm({ ...form, password: v })} testId="login-password" />
        <button type="submit" disabled={loading}
          className="w-full bg-[#007D7B] hover:bg-[#006B69] text-white font-semibold py-3 rounded-md btn-press disabled:opacity-60"
          data-testid="login-submit">
          {loading ? "Logging in..." : "Log in"}
        </button>
      </form>
    </AuthShell>
  );
};

const Field = ({ label, name, type = "text", placeholder, value, onChange, testId }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
    <input
      id={name} name={name} type={type} placeholder={placeholder}
      required
      value={value} onChange={(e) => onChange(e.target.value)}
      className="w-full bg-gray-100 border border-transparent focus:border-[#007D7B] focus:bg-white focus:outline-none rounded-md px-4 py-3 text-sm placeholder-gray-400"
      data-testid={testId}
    />
  </div>
);
