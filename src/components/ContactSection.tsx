import { Link } from 'react-router-dom';

function ContactSection() {
  return (
    <section className="contact" id="contact">
      <div className="section-container">
        <div className="contact-cta">
          <p className="contact-cta-eyebrow">Bạn muốn trao đổi thêm?</p>
          <h2 className="section-title">Liên hệ với tôi</h2>
          <p className="section-subtitle">
            Tôi đã chuẩn bị một trang liên hệ riêng với đầy đủ thông tin và biểu
            mẫu gửi tin nhắn.
          </p>

          <div className="contact-cta-actions">
            <Link className="btn-primary contact-cta-button" to="/contact">
              Đi đến trang liên hệ
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
