import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/api';
import ToastNotification from '../components/Notification';
import '../styles/Login.css';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [dob, setDob] = useState('');
    const [errors, setErrors] = useState({});
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState('success');
    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors = {};
        const usernameRegex = /^[a-zA-Z0-9]+$/;
        const today = new Date().toISOString().split('T')[0];

        if (!username) {
            newErrors.username = 'Username is required.';
        } else if (username.length < 4) {
            newErrors.username = 'Username phải trên 4 kí tự.';
        } else if (!usernameRegex.test(username)) {
            newErrors.username = 'Username không được có kí tự đặc biệt.';
        }

        if (!password) {
            newErrors.password = 'Password is required.';
        } else if (password.length < 6) {
            newErrors.password = 'Password phải trên 6 kí tự.';
        }

        if (!dob) {
            newErrors.dob = 'Date of Birth is required.';
        } else if (dob > today) {
            newErrors.dob = 'Date of Birth error.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                await register({ username, password, dob });
                showToastMessage('Đăng ký thành công!', 'Thành công!');
                setTimeout(() => {
                    navigate('/login');
                }, 1500);
            } catch (err) {
                showToastMessage('Đăng ký thất bại! Vui lòng kiểm tra lại thông tin.', 'Lỗi!');
            }
        } else {
            showToastMessage('Sửa lại thông tin đăng kí.', 'Lỗi!');
        }
    };

    const handleBack = () => {
        navigate('/login');
    };

    const showToastMessage = (message, type) => {
        setToastMessage(message);
        setToastType(type);
        setShowToast(true);
    };

    return (
        <div className="d-flex align-items-center justify-content-center " style={{
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            minHeight: '100vh'
        }}
        >
            <div className="card p-4 shadow-lg" style={{ maxWidth: '400px', width: '100%' }}>
                <h2 className="text-center mb-4">Tạo tài khoản mới</h2>
                <form onSubmit={handleRegister}>
                    <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input
                            type="text"
                            className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        {errors.username && <div className="invalid-feedback">{errors.username}</div>}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Tháng / Ngày / Năm Sinh </label>
                        <input
                            type="date"
                            className={`form-control ${errors.dob ? 'is-invalid' : ''}`}
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
                            required
                        />
                        {errors.dob && <div className="invalid-feedback">{errors.dob}</div>}
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Đăng ký</button>
                    <button type="button" className="btn btn-secondary w-100 mt-1" onClick={handleBack}>Quay Lại Đăng Nhậo</button>
                </form>
            </div>
            <ToastNotification
                message={toastMessage}
                type={toastType}
                show={showToast}
                onClose={() => setShowToast(false)}
            />
        </div>
    );
};

export default Register;
