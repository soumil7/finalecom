import React from 'react';
import './Footer.css'; // Import your CSS file for styles

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    {/* Contact Information */}
                    <div className="contact-info">
                        <h2>Contact Us</h2>
                        <p>Email: <a href="mailto:info@example.com" className="link">info@example.com</a></p>
                        <p>Phone: <a href="tel:+1234567890" className="link">+1 (234) 567-890</a></p>
                    </div>

                    {/* Quick Links */}
                    <div className="quick-links">
                        <h2>Quick Links</h2>
                        <ul>
                            <li><a href="#home" className="link">Home</a></li>
                            <li><a href="#about" className="link">About Us</a></li>
                            <li><a href="#services" className="link">Services</a></li>
                            <li><a href="#blog" className="link">Blog</a></li>
                            <li><a href="#contact" className="link">Contact</a></li>
                        </ul>
                    </div>

                    {/* Contact Form */}
                    <div className="contact-form">
                        <h2>Send Us a Message</h2>
                        <form id="contactForm" className="form">
                            <div className="form-field">
                                <label htmlFor="name">Name</label>
                                <input type="text" id="name" name="name" required />
                            </div>
                            <div className="form-field">
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" name="email" required />
                            </div>
                            <div className="form-field">
                                <label htmlFor="message">Message</label>
                                <textarea id="message" name="message" rows="4" required></textarea>
                            </div>
                            <button type="submit" className="submit-button">Submit</button>
                        </form>
                    </div>
                </div>
                {/* Copyright */}
                <div className="footer-bottom">
                    <p>&copy; 2024 Lion King Homepage. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
