import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setErrorMessage('');
    setSubmitted(false);

    // EmailJS configuration
    const serviceId = 'service_4ue0li5';
    const templateId = 'template_torg1z4';
    const publicKey = 'jECA-FiDZwEnJvxNB';

    // Initialize EmailJS
    emailjs.init(publicKey);

    // Prepare template parameters
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject,
      message: formData.message,
      to_email: 'pavithraganapathy04@gmail.com' // Your Gmail address
    };

    try {
      // Send email using EmailJS
      await emailjs.send(serviceId, templateId, templateParams);
      
      // Store contact message in localStorage as backup
      const contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
      const newContact = {
        id: Date.now().toString(),
        ...formData,
        createdAt: new Date().toISOString()
      };
      contacts.push(newContact);
      localStorage.setItem('contacts', JSON.stringify(contacts));

      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });

      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    } catch (error) {
      console.error('EmailJS Error:', error);
      setErrorMessage('Failed to send message. Please try again later or contact us directly at info@crazygame.com');
      
      // Still store in localStorage as backup
      const contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
      const newContact = {
        id: Date.now().toString(),
        ...formData,
        createdAt: new Date().toISOString()
      };
      contacts.push(newContact);
      localStorage.setItem('contacts', JSON.stringify(contacts));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen py-20 px-4 relative"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1920&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/80 to-black/90"></div>
      
      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="bg-black/80 backdrop-blur-md rounded-2xl shadow-2xl p-8 md:p-12 border border-white/10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent text-center">
            Contact Us
          </h1>
          <p className="text-gray-300 text-center mb-8 text-lg">
            Have a question or feedback? We'd love to hear from you!
          </p>

          {submitted && (
            <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-300 text-center">
              ✅ Thank you for contacting us! Your message has been sent successfully. We'll get back to you soon.
            </div>
          )}

          {errorMessage && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-center">
              ⚠️ {errorMessage}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-4">
              <div className="bg-black/50 rounded-lg p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-2">Email</h3>
                <p className="text-gray-300">info@crazygame.com</p>
              </div>
              <div className="bg-black/50 rounded-lg p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-2">Phone</h3>
                <p className="text-gray-300">+1 (555) 123-4567</p>
              </div>
              <div className="bg-black/50 rounded-lg p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-2">Address</h3>
                <p className="text-gray-300">123 Gaming Street<br />Digital City, DC 12345</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Your Name
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
                  placeholder="Enter your name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-400">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Your Email
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

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-black/50 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 ${
                    errors.subject
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-white/20 focus:ring-cyan-500'
                  }`}
                  placeholder="Enter subject"
                />
                {errors.subject && (
                  <p className="mt-1 text-sm text-red-400">{errors.subject}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className={`w-full px-4 py-3 bg-black/50 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 resize-none ${
                    errors.message
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-white/20 focus:ring-cyan-500'
                  }`}
                  placeholder="Enter your message (minimum 10 characters)"
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-400">{errors.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
