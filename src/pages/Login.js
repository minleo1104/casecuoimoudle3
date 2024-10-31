import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../services/api';
import ToastNotification from '../components/Notification';
import '../styles/Login.css'; 

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState('success');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await login({ username, password });
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('username', response.data.username);
            showToastMessage('Đăng nhập thành công!', 'success');
            setTimeout(() => {
                navigate('/home');
            }, 1500);
        } catch (err) {
            showToastMessage('Đăng nhập thất bại! Vui lòng kiểm tra lại thông tin.', 'error');
        }
    };

    const showToastMessage = (message, type) => {
        setToastMessage(message);
        setToastType(type);
        setShowToast(true);
    };

    return (
        <div className="login-background">
            <div className="login-card shadow-lg">
                <h2 className="text-center mb-4">Đăng nhập</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Đăng nhập</button>
                </form>
                <div className="mt-3 text-center">
                    <p>Bạn có tài khoản?</p>
                    <Link to="/register" className="btn btn-secondary">Tạo tài khoản mới</Link>
                </div>
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

export default Login;
