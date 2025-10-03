import React, { useState } from 'react';

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
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      setTimeout(() => setSubmitStatus(null), 5000);
    }, 2000);
  };

  const contactMethods = [
    {
      icon: 'fas fa-envelope',
      title: 'Email',
      value: 'anurag@example.com',
      link: 'mailto:anurag@example.com',
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
    <div className="contact-section py-5">
      <div className="container">
        {/* Section Header */}
        <div className="modern-section-header animate-fade-in-up">
          <h2 className="modern-section-title modern-heading">Get In Touch</h2>
          <p className="modern-section-subtitle modern-text">
            With 14+ years of experience in technology leadership, I'm ready to discuss your next project, 
            share insights, or explore collaboration opportunities. Let's connect!
          </p>
        </div>

        <div className="row">
          {/* Contact Methods */}
          <div className="col-lg-4 mb-5">
            <div className="contact-methods animate-stagger">
              <h3 className="modern-heading mb-4">Let's Connect</h3>
              {contactMethods.map((method, index) => (
                <a
                  key={method.title}
                  href={method.link}
                  className="contact-method modern-card p-4 mb-3 d-block text-decoration-none"
                  target={method.link.startsWith('http') ? '_blank' : '_self'}
                  rel={method.link.startsWith('http') ? 'noopener noreferrer' : ''}
                >
                  <div className="d-flex align-items-center">
                    <div className="contact-icon me-3">
                      <i className={method.icon}></i>
                    </div>
                    <div className="contact-info">
                      <h5 className="modern-heading mb-1">{method.title}</h5>
                      <p className="contact-value mb-1">{method.value}</p>
                      <small className="text-muted">{method.description}</small>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Quick Stats */}
            <div className="contact-stats modern-card p-4 mt-4">
              <h4 className="modern-heading mb-3">Response Time</h4>
              <div className="stat-item mb-3">
                <div className="d-flex justify-content-between align-items-center">
                  <span>Email</span>
                  <span className="badge bg-success">&lt; 24 hours</span>
                </div>
              </div>
              <div className="stat-item mb-3">
                <div className="d-flex justify-content-between align-items-center">
                  <span>LinkedIn</span>
                  <span className="badge bg-primary">&lt; 12 hours</span>
                </div>
              </div>
              <div className="stat-item">
                <div className="d-flex justify-content-between align-items-center">
                  <span>Phone</span>
                  <span className="badge bg-warning">Business hours</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="col-lg-8">
            <div className="contact-form-container modern-card p-5">
              <h3 className="modern-heading mb-4">Send a Message</h3>
              
              {submitStatus === 'success' && (
                <div className="alert alert-success d-flex align-items-center mb-4">
                  <i className="fas fa-check-circle me-2"></i>
                  Thank you! Your message has been sent successfully. I'll get back to you soon.
                </div>
              )}

              <form onSubmit={handleSubmit} className="contact-form">
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="name" className="form-label">Full Name *</label>
                    <input
                      type="text"
                      className="form-control modern-input"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your full name"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="email" className="form-label">Email Address *</label>
                    <input
                      type="email"
                      className="form-control modern-input"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
                
                <div className="mb-3">
                  <label htmlFor="subject" className="form-label">Subject *</label>
                  <select
                    className="form-select modern-input"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
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
                  <label htmlFor="message" className="form-label">Message *</label>
                  <textarea
                    className="form-control modern-input"
                    id="message"
                    name="message"
                    rows="6"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Tell me about your project, idea, or how I can help you..."
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="modern-btn modern-btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Sending...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-paper-plane me-2"></i>
                      Send Message
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
            <div className="contact-additional modern-card p-4 text-center">
              <h4 className="modern-heading mb-3">Prefer a Different Approach?</h4>
              <p className="modern-text mb-4">
                I'm always open to discussing new opportunities, interesting projects, or just having a chat about technology.
              </p>
              <div className="contact-alternatives">
                <a href="/resume.pdf" className="modern-btn modern-btn-secondary me-3">
                  <i className="fas fa-download"></i>
                  Download Resume
                </a>
                <a href="https://calendly.com/anuragvaidhya" className="modern-btn modern-btn-primary">
                  <i className="fas fa-calendar"></i>
                  Schedule a Call
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