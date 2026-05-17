function Footer() {
    const currentYear: number = new Date().getFullYear();

    return (
        <footer className="footer" id="contact">
            <div className="footer-content">
                <p className="footer-name">Nguyễn Văn A</p>
                <p className="footer-role">Frontend Developer</p>
                <div className="footer-links">
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
                    <span>·</span>
                    <a href="mailto:email@example.com">Email</a>
                    <span>·</span>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                </div>
                <p className="footer-copy">© {currentYear} · Built with React + TypeScript</p>
            </div>
        </footer>
    );
}

export default Footer;