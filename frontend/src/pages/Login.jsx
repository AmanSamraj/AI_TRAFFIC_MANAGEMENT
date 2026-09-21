import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('•••••••••••');
  const [showPassword, setShowPassword] = useState(false);
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
    <div className="min-h-screen bg-[#060e1a] text-slate-100 flex items-center justify-center p-4 selection:bg-cyan-500/30 selection:text-cyan-200 relative overflow-hidden font-sans">
      {/* Background Decorative Ambient Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#162b4c_1px,transparent_1px)] [background-size:24px_24px] opacity-25" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Login Card */}
      <div className="relative w-full max-w-[400px] rounded-2xl bg-[#0c182b]/95 backdrop-blur-xl border border-slate-750/80 shadow-2xl shadow-black/60 p-8 z-10">
        {/* Header Branding */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2 select-none">
            <span className="text-2xl filter drop-shadow">🚦</span>
            <h1 className="text-2xl font-black tracking-wider text-white uppercase">
              TRAFFIC <span className="text-cyan-400">AI</span>
            </h1>
          </div>
          <p className="text-xs text-slate-400 font-medium tracking-wide">
            City Traffic Intelligence
          </p>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Field */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2 tracking-wide">
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                className="w-full bg-[#070e1c] border border-slate-700/90 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all font-mono"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2 tracking-wide">
              Password
            </label>
            <div className="relative flex items-center">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="•••••••••••"
                className="w-full bg-[#070e1c] border border-slate-700/90 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all font-mono pr-11"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 text-slate-400 hover:text-white transition-colors cursor-pointer p-1"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Action Button: [ LOGIN ] */}
          <div className="pt-3">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 active:scale-[0.98] text-slate-950 font-bold text-sm tracking-widest uppercase flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 border border-cyan-400/40 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  <span>LOGGING IN...</span>
                </>
              ) : (
                <span>[ LOGIN ]</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
