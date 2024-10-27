import React from 'react';
import '../App.css';


const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-links">
                <a href="https://www.secondbind.com/about-us" className="footer-link">About</a>
                <a href="https://www.secondbind.com/privacy-policy" className="footer-link">Privacy Policy</a>
                <a href="https://www.secondbind.com/terms" className="footer-link">Terms & Conditions</a>
            </div>
            <p className="footer-copyright">©2024 Second Bind. All Rights Reserved.</p>
        </footer>
    );
};

export default Footer;
