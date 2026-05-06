import React, { useState } from 'react';
import { web3formsAccessKey } from '../../editable-stuff/configurations.json';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      // Check if Web3Forms access key is configured
      if (!web3formsAccessKey) {
        // Fallback to mailto if Web3Forms is not configured
        const mailtoLink = `mailto:anuragvaidhya786@gmail.com?subject=${encodeURIComponent(`Contact Form: ${formData.subject}`)}&body=${encodeURIComponent(
          `Name: ${formData.name}\n` +
          `Email: ${formData.email}\n` +
          `Subject: ${formData.subject}\n\n` +
          `Message:\n${formData.message}`
        )}`;
        
        window.location.href = mailtoLink;
        setIsSubmitting(false);
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        return;
      }

      // Submit to Web3Forms
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: web3formsAccessKey,
          name: formData.name,
          email: formData.email,
          subject: `Portfolio Contact: ${formData.subject}`,
          message: formData.message,
          from_name: formData.name,
          replyto: formData.email,
        })
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        
        // Clear success message after 5 seconds
        setTimeout(() => setSubmitStatus(null), 5000);
      } else {
        setSubmitStatus('error');
        console.error('Form submission error:', result);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: 'fas fa-envelope',
      title: 'Email',
      value: 'anuragvaidhya786@gmail.com',
      link: 'mailto:anuragvaidhya786@gmail.com',
      description: 'Send me an email anytime'
    },
    {
      icon: 'fab fa-linkedin',
      title: 'LinkedIn',
      value: 'linkedin.com/in/anuragvaidhya',
      link: 'https://linkedin.com/in/anuragvaidhya',
      description: 'Connect with me professionally'
    },
    {
      icon: 'fab fa-github',
      title: 'GitHub',
      value: 'github.com/anuragvaidhya',
      link: 'https://github.com/anuragvaidhya',
      description: 'Check out my code'
    },
    {
      icon: 'fas fa-phone',
      title: 'Phone',
      value: '+1 (555) 123-4567',
      link: 'tel:+15551234567',
      description: 'Call me during business hours'
    }
  ];

  return (
    <div className="contact-section portfolio-section">
      <div className="container-fluid px-4">
        {/* Section Header */}
        <div className="experience-hero">
          <div className="hero-content">
            <div className="hero-badge animate">
              <i className="fas fa-envelope"></i>
              <span>Get In Touch</span>
            </div>
            <h1 className="hero-title animate">
              Let's <span className="gradient-text">Connect</span>
            </h1>
            <p className="hero-description animate">
              With 15+ years of experience in technology leadership, I'm ready to discuss your next project, 
              share insights, or explore collaboration opportunities. Let's connect!
            </p>
          </div>
        </div>

        {/* Contact Methods Section */}
        <div className="row mb-5">
          <div className="col-12">
            <div className="row justify-content-center">
              {contactMethods.map((method, index) => (
                <div key={method.title} className="col-lg-3 col-md-6 mb-4">
                  <a
                    href={method.link}
                    className="experience-detail-card contact-method-card p-4 d-block text-decoration-none text-center h-100"
                    target={method.link.startsWith('http') ? '_blank' : '_self'}
                    rel={method.link.startsWith('http') ? 'noopener noreferrer' : ''}
                    style={{ '--hover-color': method.color || '#667eea' }}
                  >
                    <div className="contact-icon mb-3" style={{ color: method.color || '#667eea' }}>
                      <i className={method.icon} style={{ fontSize: '2.5rem' }}></i>
                    </div>
                    <div className="contact-info">
                      <h5 className="mb-2" style={{ fontWeight: '600', color: '#2c3e50' }}>{method.title}</h5>
                      <p className="contact-value mb-2" style={{ fontSize: "0.9rem", color: '#495057' }}>{method.value}</p>
                      <small style={{ color: '#6c757d' }}>{method.description}</small>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10">
            <div className="experience-detail-card contact-form-container p-5 animate">
              <h3 className="text-center mb-4" style={{ fontSize: '2rem', fontWeight: '700', color: '#2c3e50' }}>Send a Message</h3>
              
              {submitStatus === 'success' && (
                <div className="alert alert-success d-flex align-items-center mb-4">
                  <i className="fas fa-check-circle me-2"></i>
                  Thank you! Your message has been sent successfully. I'll get back to you soon.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="alert alert-danger d-flex align-items-center mb-4">
                  <i className="fas fa-exclamation-circle me-2"></i>
                  Oops! Something went wrong. Please try again or email me directly at anuragvaidhya786@gmail.com
                </div>
              )}

              <form onSubmit={handleSubmit} className="contact-form">
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="name" className="form-label" style={{ fontWeight: '600', color: '#2c3e50' }}>Full Name *</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your full name"
                      style={{ 
                        padding: '0.75rem 1rem',
                        borderRadius: '10px',
                        border: '2px solid #e9ecef',
                        transition: 'all 0.3s ease'
                      }}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="email" className="form-label" style={{ fontWeight: '600', color: '#2c3e50' }}>Email Address *</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your.email@example.com"
                      style={{ 
                        padding: '0.75rem 1rem',
                        borderRadius: '10px',
                        border: '2px solid #e9ecef',
                        transition: 'all 0.3s ease'
                      }}
                    />
                  </div>
                </div>
                
                <div className="mb-3">
                  <label htmlFor="subject" className="form-label" style={{ fontWeight: '600', color: '#2c3e50' }}>Subject *</label>
                  <select
                    className="form-select"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    style={{ 
                      padding: '0.75rem 1rem',
                      borderRadius: '10px',
                      border: '2px solid #e9ecef',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <option value="">Select a subject</option>
                    <option value="project">Project Collaboration</option>
                    <option value="consulting">Consulting Opportunity</option>
                    <option value="job">Job Opportunity</option>
                    <option value="speaking">Speaking Engagement</option>
                    <option value="mentoring">Mentoring Request</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="message" className="form-label" style={{ fontWeight: '600', color: '#2c3e50' }}>Message *</label>
                  <textarea
                    className="form-control"
                    id="message"
                    name="message"
                    rows="6"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Tell me about your project, idea, or how I can help you..."
                    style={{ 
                      padding: '0.75rem 1rem',
                      borderRadius: '10px',
                      border: '2px solid #e9ecef',
                      transition: 'all 0.3s ease'
                    }}
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="btn btn-lg w-100"
                  disabled={isSubmitting}
                  style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '1rem',
                    fontWeight: '600',
                    fontSize: '1rem',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
                    cursor: 'pointer',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
                  }}
                  onMouseEnter={(e) => {
                    if (!isSubmitting) {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.4)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)';
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      <span style={{ color: 'white' }}>Sending...</span>
                    </>
                  ) : (
                    <>
                      <i className="fas fa-paper-plane me-2" style={{ color: 'white' }}></i>
                      <span style={{ color: 'white' }}>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="row mt-5">
          <div className="col-12">
            <div className="experience-detail-card contact-additional p-4 text-center animate">
              <h4 className="mb-3" style={{ fontSize: '1.5rem', fontWeight: '700', color: '#2c3e50' }}>Prefer a Different Approach?</h4>
              <p className="mb-4" style={{ color: '#495057', fontSize: '1.1rem' }}>
                I'm always open to discussing new opportunities, interesting projects, or just having a chat about technology.
              </p>
              <div className="contact-alternatives">
                <a 
                  href="https://calendly.com/anuragvaidhya786" 
                  className="btn btn-lg" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '0.75rem 2rem',
                    fontWeight: '600',
                    fontSize: '1rem',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
                    textDecoration: 'none',
                    display: 'inline-block',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)';
                  }}
                >
                  <i className="fas fa-calendar me-2" style={{ color: 'white' }}></i>
                  <span style={{ color: 'white' }}>Schedule a Call</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;