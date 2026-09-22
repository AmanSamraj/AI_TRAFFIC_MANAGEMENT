import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@traffic.gov.in');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard');
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)] flex items-center justify-center p-4 selection:bg-[var(--color-amber)] selection:text-[var(--color-charcoal)] relative font-sans">
      {/* Main Login Card */}
      <div className="relative w-full max-w-[390px] rounded-xl bg-[var(--color-card)] border border-[var(--color-border-dark)] shadow-sm p-7 z-10">
        {/* Header Branding */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-1.5 select-none">
            <span className="text-xl">🚦</span>
            <h1 className="text-xl font-bold tracking-wider text-[var(--color-text)] uppercase">
              TRAFFIC <span className="text-[var(--color-amber-dark)]">AI</span>
            </h1>
          </div>
          <p className="text-xs text-[var(--color-text-muted)] font-medium">
            Municipal Surveillance & Traffic Command
          </p>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div>
            <label className="block text-xs font-semibold text-[var(--color-text-secondary)] mb-1.5">
              Operator Email / Badge ID
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@traffic.gov.in"
              className="w-full bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg px-3.5 py-2.5 text-xs text-[var(--color-text)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-amber)] focus:ring-1 focus:ring-[var(--color-amber)] transition-all font-mono"
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-xs font-semibold text-[var(--color-text-secondary)] mb-1.5">
              Security Clearance Passcode
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="•••••••••••"
              className="w-full bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg px-3.5 py-2.5 text-xs text-[var(--color-text)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-amber)] focus:ring-1 focus:ring-[var(--color-amber)] transition-all font-mono"
            />
          </div>

          {/* Action Button: LOGIN */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 px-4 rounded-lg bg-[var(--color-amber)] hover:bg-[var(--color-amber-dark)] text-[var(--color-charcoal)] font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 border border-[var(--color-amber-dark)] transition-all cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-[var(--color-charcoal)] border-t-transparent rounded-full animate-spin" />
                  <span>AUTHENTICATING...</span>
                </>
              ) : (
                <span>ACCESS COMMAND CENTER</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
