import React, { useState } from 'react';
import Reveal from '../Reveal';
import { web3formsAccessKey } from '../../editable-stuff/configurations.json';

const CONTACT_METHODS = [
  { icon: 'fas fa-envelope', title: 'Email', value: 'anuragvaidhya786@gmail.com', link: 'mailto:anuragvaidhya786@gmail.com', description: 'Send me an email anytime' },
  { icon: 'fab fa-linkedin', title: 'LinkedIn', value: 'linkedin.com/in/anurag-vaidhya', link: 'https://www.linkedin.com/in/anurag-vaidhya-47b93222', description: 'Connect with me professionally' },
  { icon: 'fab fa-github', title: 'GitHub', value: 'github.com/anuu1989', link: 'https://github.com/anuu1989', description: 'Check out my code' },
];

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      if (!web3formsAccessKey) {
        const mailtoLink = `mailto:anuragvaidhya786@gmail.com?subject=${encodeURIComponent(`Contact Form: ${formData.subject}`)}&body=${encodeURIComponent(
          `Name: ${formData.name}\nEmail: ${formData.email}\nSubject: ${formData.subject}\n\nMessage:\n${formData.message}`
        )}`;
        window.location.href = mailtoLink;
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        return;
      }

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: web3formsAccessKey,
          name: formData.name,
          email: formData.email,
          subject: `Portfolio Contact: ${formData.subject}`,
          message: formData.message,
          from_name: formData.name,
          replyto: formData.email,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setSubmitStatus(null), 5000);
      } else {
        setSubmitStatus('error');
      }
    } catch (err) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container">
      <Reveal as="section" className="section" style={{ paddingTop: 0 }}>
        <div className="grid grid-3">
          {CONTACT_METHODS.map((method) => (
            <a key={method.title} href={method.link} target={method.link.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="card card-hover contact-method-card">
              <i className={method.icon} aria-hidden="true"></i>
              <h3>{method.title}</h3>
              <p>{method.description}</p>
            </a>
          ))}
        </div>
      </Reveal>

      <Reveal as="section" className="section-sm">
        <div className="card contact-form-card">
          <h2 className="section-title" style={{ textAlign: 'center', marginBottom: 'var(--space-lg)' }}>Send a Message</h2>

          {submitStatus === 'success' && (
            <div className="form-status success" style={{ marginBottom: 'var(--space-md)' }}>
              <i className="fas fa-check-circle" aria-hidden="true"></i>
              Thank you! Your message has been sent successfully. I'll get back to you soon.
            </div>
          )}
          {submitStatus === 'error' && (
            <div className="form-status error" style={{ marginBottom: 'var(--space-md)' }}>
              <i className="fas fa-exclamation-circle" aria-hidden="true"></i>
              Oops! Something went wrong. Please email me directly at anuragvaidhya786@gmail.com
            </div>
          )}

          <form onSubmit={handleSubmit} className="stack" style={{ '--gap': 'var(--space-md)' }}>
            <div className="contact-form-row">
              <div className="form-field">
                <label htmlFor="name" className="form-label">Full Name *</label>
                <input type="text" id="name" name="name" className="form-input" value={formData.name} onChange={handleChange} required placeholder="Your full name" />
              </div>
              <div className="form-field">
                <label htmlFor="email" className="form-label">Email Address *</label>
                <input type="email" id="email" name="email" className="form-input" value={formData.email} onChange={handleChange} required placeholder="your.email@example.com" />
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="subject" className="form-label">Subject *</label>
              <select id="subject" name="subject" className="form-select" value={formData.subject} onChange={handleChange} required>
                <option value="">Select a subject</option>
                <option value="project">Project Collaboration</option>
                <option value="consulting">Consulting Opportunity</option>
                <option value="job">Job Opportunity</option>
                <option value="speaking">Speaking Engagement</option>
                <option value="mentoring">Mentoring Request</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="message" className="form-label">Message *</label>
              <textarea id="message" name="message" className="form-textarea" value={formData.message} onChange={handleChange} required placeholder="Tell me about your project, idea, or how I can help you..."></textarea>
            </div>

            <button type="submit" className="btn btn-primary" disabled={isSubmitting} style={{ width: '100%', padding: '0.9rem' }}>
              {isSubmitting ? (
                <>Sending&hellip;</>
              ) : (
                <><i className="fas fa-paper-plane" aria-hidden="true"></i> Send Message</>
              )}
            </button>
          </form>
        </div>
      </Reveal>

      <Reveal as="section" className="section-sm contact-cta card">
        <h3 style={{ fontSize: 'var(--fs-lg)', marginBottom: 'var(--space-2xs)' }}>Prefer a Different Approach?</h3>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-md)' }}>
          I'm always open to discussing new opportunities, interesting projects, or just having a chat about technology.
        </p>
        <a href="https://calendly.com/anuragvaidhya786" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
          <i className="fas fa-calendar" aria-hidden="true"></i> Schedule a Call
        </a>
      </Reveal>
    </div>
  );
};

export default ContactSection;
