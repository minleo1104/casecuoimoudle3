import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPostById, updatePostById } from '../services/api';
import ToastNotification from '../components/Notification';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
const EditPost = () => {
    const { postId } = useParams(); 
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [status, setStatus] = useState('public');
    const [type, setType] = useState('technology');
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState('success');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await getPostById(token, postId);
                const post = response.data;
                setTitle(post.title);
                setContent(post.content);
                setStatus(post.status);
                setType(post.type);
            } catch (err) {
                showToastMessage('Không tìm thấy bài đăng. Xin hãy thử lại.', 'error');
            }
        };

        fetchPost();
    }, [postId]);

    const handleEditPost = async (e) => {
        e.preventDefault();
        savePost();
    };

    const handleCancel = () => {
        navigate('/home');
    };

    const savePost = async () => {
        try {
            const token = localStorage.getItem('token');
            const updatedPost = { title, content, status, type };
            await updatePostById(token, postId, updatedPost);
            showToastMessage('Cập nhật bài đăng thành công!', 'success');
            setTimeout(() => {
                navigate('/home');
            }, 1000);
        } catch (err) {
            showToastMessage('Cập nhật bài đăng thất bại. Xin hãy thử lại.', 'error');
        }
    };

    const showToastMessage = (message, type) => {
        setToastMessage(message);
        setToastType(type);
        setShowToast(true);
    };

    return (
        <div className="container my-4">
            <h2>Cập nhật bài đăng</h2>
            <form onSubmit={handleEditPost}>
                <div className="mb-3">
                    <label className="form-label">Tiêu đề</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Bạn đang nghĩ gì...</label>
                    <ReactQuill
                        theme="snow"
                        value={content}
                        onChange={setContent}
                        className="mb-3"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Trạng thái</label>
                    <select 
                        className="form-control" 
                        value={status} 
                        onChange={(e) => setStatus(e.target.value)} 
                    >
                        <option value="public">Công khai</option>
                        <option value="private">Riêng tư</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Type</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        value={type} 
                        onChange={(e) => setType(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit" className="btn btn-primary">Cập nhật bài đăng</button>
                <button type="button" className="btn btn-secondary ms-2" onClick={handleCancel}>Hủy</button>
            </form>
            <ToastNotification
                message={toastMessage}
                type={toastType}
                show={showToast}
                onClose={() => setShowToast(false)}
            />
        </div>
    );
};

export default EditPost;
