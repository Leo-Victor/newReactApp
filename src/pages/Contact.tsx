import './Contact.css';
import { useState } from 'react';
import { profile } from '../data/profileData';

interface FormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

interface FormErrors {
    name?: string;
    email?: string;
    message?: string;
}

function Contact() {
    const [form, setForm] = useState<FormData>({
        name: '', email: '', subject: '', message: '',
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const validate = (): boolean => {
        const newErrors: FormErrors = {};
        if (!form.name.trim()) newErrors.name = 'Vui lòng nhập họ tên';
        if (!form.email.trim()) newErrors.email = 'Vui lòng nhập email';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
            newErrors.email = 'Email không hợp lệ';
        if (!form.message.trim()) newErrors.message = 'Vui lòng nhập tin nhắn';
        else if (form.message.trim().length < 10)
            newErrors.message = 'Tin nhắn tối thiểu 10 ký tự';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        if (errors[name as keyof FormErrors]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    };

    const handleSubmit = (e: React.MouseEvent) => {
        e.preventDefault();
        if (!validate()) return;
        setLoading(true);
        // Giả lập gửi form
        setTimeout(() => {
            setLoading(false);
            setSubmitted(true);
        }, 1500);
    };

    return (
        <div className="contact-page">
            <div className="contact-container">

                {/* Header */}
                <div className="contact-header">
                    <h1 className="contact-title">Liên hệ với mình</h1>
                    <p className="contact-subtitle">
                        Có dự án muốn hợp tác? Hay chỉ muốn nói chuyện? Mình luôn sẵn lòng!
                    </p>
                </div>

                <div className="contact-grid">

                    {/* Thông tin liên hệ */}
                    <div className="contact-info">
                        <h2 className="contact-info-title">Thông tin</h2>

                        <div className="contact-info-items">
                            <a href={`mailto:${profile.email}`} className="contact-info-item">
                                <div className="contact-info-icon">📧</div>
                                <div>
                                    <p className="contact-info-label">Email</p>
                                    <p className="contact-info-value">{profile.email}</p>
                                </div>
                            </a>
                            <a href={profile.github} target="_blank" rel="noopener noreferrer"
                                className="contact-info-item">
                                <div className="contact-info-icon">🐙</div>
                                <div>
                                    <p className="contact-info-label">GitHub</p>
                                    <p className="contact-info-value">github.com/Leo-Victor</p>
                                </div>
                            </a>
                            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer"
                                className="contact-info-item">
                                <div className="contact-info-icon">💼</div>
                                <div>
                                    <p className="contact-info-label">LinkedIn</p>
                                    <p className="contact-info-value">linkedin.com/in/leo-victor</p>
                                </div>
                            </a>
                            <div className="contact-info-item">
                                <div className="contact-info-icon">📍</div>
                                <div>
                                    <p className="contact-info-label">Địa điểm</p>
                                    <p className="contact-info-value">{profile.location}</p>
                                </div>
                            </div>
                        </div>

                        {/* Available badge */}
                        <div className="contact-available">
                            <span className="available-dot"></span>
                            Đang tìm kiếm cơ hội thực tập
                        </div>
                    </div>

                    {/* Form */}
                    <div className="contact-form-wrapper">
                        {submitted ? (
                            <div className="contact-success">
                                <div className="success-icon">✅</div>
                                <h3>Gửi thành công!</h3>
                                <p>Cảm ơn bạn đã liên hệ. Mình sẽ phản hồi sớm nhất có thể!</p>
                                <button className="contact-btn" onClick={() => {
                                    setSubmitted(false);
                                    setForm({ name: '', email: '', subject: '', message: '' });
                                }}>
                                    Gửi tin nhắn khác
                                </button>
                            </div>
                        ) : (
                            <div className="contact-form">
                                <div className="form-row">
                                    <div className="form-group">
                                        <label className="form-label">Họ tên *</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={form.name}
                                            onChange={handleChange}
                                            placeholder="Nguyễn Văn A"
                                            className={`form-input ${errors.name ? 'error' : ''}`}
                                        />
                                        {errors.name && <p className="form-error">{errors.name}</p>}
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Email *</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={form.email}
                                            onChange={handleChange}
                                            placeholder="email@example.com"
                                            className={`form-input ${errors.email ? 'error' : ''}`}
                                        />
                                        {errors.email && <p className="form-error">{errors.email}</p>}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Chủ đề</label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={form.subject}
                                        onChange={handleChange}
                                        placeholder="Hợp tác dự án, cơ hội việc làm..."
                                        className="form-input"
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Tin nhắn *</label>
                                    <textarea
                                        name="message"
                                        value={form.message}
                                        onChange={handleChange}
                                        placeholder="Xin chào! Mình muốn..."
                                        rows={5}
                                        className={`form-textarea ${errors.message ? 'error' : ''}`}
                                    />
                                    {errors.message && <p className="form-error">{errors.message}</p>}
                                    <p className="form-count">{form.message.length} ký tự</p>
                                </div>
                                <button
                                    className={`contact-btn ${loading ? 'loading' : ''}`}
                                    onClick={handleSubmit}
                                    disabled={loading}
                                >
                                    {loading ? '⏳ Đang gửi...' : '🚀 Gửi tin nhắn'}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;