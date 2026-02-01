import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();



  useEffect(() => {
    // Check if user is already logged in
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      navigate('/profile');
    }
  }, [navigate]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const validateName = (name) => {
    // At least 2 characters, only letters and spaces
    const nameRegex = /^[a-zA-Z\s]{2,}$/;
    return nameRegex.test(name);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    setLoginError('');
  };

  const validateForm = () => {
    const newErrors = {};

    if (isSignup) {
      if (!formData.name.trim()) {
        newErrors.name = 'Name is required';
      } else if (!validateName(formData.name)) {
        newErrors.name = 'Name must be at least 2 characters and contain only letters';
      }

      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!validateEmail(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }

      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (!validatePassword(formData.password)) {
        newErrors.password = 'Password must be at least 8 characters with 1 uppercase, 1 lowercase, and 1 number';
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    } else {
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!validateEmail(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }

      if (!formData.password) {
        newErrors.password = 'Password is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Check if user already exists
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const existingUser = users.find(user => user.email === formData.email);

    if (existingUser) {
      setLoginError('User with this email already exists. Please login instead.');
      return;
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      name: formData.name.trim(),
      email: formData.email.trim(),
      password: formData.password, // In production, this should be hashed
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(newUser));

    // Dispatch custom event to update header
    window.dispatchEvent(new Event('userLogin'));

    navigate('/profile');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Check user credentials
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(
      u => u.email === formData.email && u.password === formData.password
    );

    if (!user) {
      setLoginError('Invalid email or password. Please try again or sign up.');
      return;
    }

    // Set current user
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    // Dispatch custom event to update header
    window.dispatchEvent(new Event('userLogin'));

    navigate('/profile');
  };

  const toggleMode = () => {
    setIsSignup(!isSignup);
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
    setErrors({});
    setLoginError('');
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center py-20 px-4 relative"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1920&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/80 to-black/90"></div>
      
      <div className="w-full max-w-md relative z-10">
        <div className="bg-black/80 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/10">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent mb-2">
              {isSignup ? 'Create Account' : 'Welcome Back'}
            </h2>
            <p className="text-gray-300">
              {isSignup ? 'Sign up to start gaming' : 'Login to continue'}
            </p>
          </div>

          {loginError && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-sm">
              {loginError}
            </div>
          )}

          <form onSubmit={isSignup ? handleSignup : handleLogin}>
            {isSignup && (
              <div className="mb-4">
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-black/50 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 ${
                    errors.name
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-white/20 focus:ring-cyan-500'
                  }`}
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-400">{errors.name}</p>
                )}
              </div>
            )}

            <div className="mb-4">
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-black/50 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 ${
                  errors.email
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-white/20 focus:ring-cyan-500'
                }`}
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-400">{errors.email}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-black/50 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 ${
                  errors.password
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-white/20 focus:ring-cyan-500'
                }`}
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-400">{errors.password}</p>
              )}
              {isSignup && !errors.password && (
                <p className="mt-1 text-xs text-gray-400">
                  Must be 8+ characters with uppercase, lowercase, and number
                </p>
              )}
            </div>

            {isSignup && (
              <div className="mb-6">
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-black/50 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 ${
                    errors.confirmPassword
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-white/20 focus:ring-cyan-500'
                  }`}
                  placeholder="Confirm your password"
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-400">{errors.confirmPassword}</p>
                )}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105 shadow-lg mb-4"
            >
              {isSignup ? 'Sign Up' : 'Login'}
            </button>
          </form>

          <div className="text-center">
            <p className="text-gray-400">
              {isSignup ? 'Already have an account? ' : "Don't have an account? "}
              <button
                onClick={toggleMode}
                className="text-cyan-400 hover:text-cyan-300 font-medium"
              >
                {isSignup ? 'Login' : 'Sign Up'}
              </button>
            </p>
          </div>

          <div className="mt-6 text-center">
            <Link
              to="/"
              className="text-gray-400 hover:text-cyan-400 text-sm transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
