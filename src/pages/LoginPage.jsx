// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import {
    Box, Button, TextField, Typography, Container, Paper, Alert
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.username === username && u.password === password);

        if (user) {
            onLogin(user);
            navigate('/'); // Redirect to dashboard after successful login
        } else {
            setError('Invalid username or password.');
        }
    };

    return (
        <Container maxWidth="xs">
            <Paper elevation={3} sx={{ p: 4, mt: 8, borderRadius: '15px', background: 'linear-gradient(145deg, #e6e6e6, #ffffff)', boxShadow: '5px 5px 10px #d9d9d9, -5px -5px 10px #ffffff' }}>
                <Typography variant="h4" component="h1" gutterBottom align="center">
                    Login
                </Typography>
                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '8px',
                                background: 'linear-gradient(145deg, #e6e6e6, #ffffff)',
                                boxShadow: 'inset 5px 5px 10px #d9d9d9, inset -5px -5px 10px #ffffff',
                                '&.Mui-focused fieldset': {
                                    borderColor: '#0C66E4',
                                    boxShadow: 'inset 2px 2px 5px #d9d9d9, inset -2px -2px 5px #ffffff, 0 0 0 2px rgba(12, 102, 228, 0.3)',
                                },
                            },
                        }}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '8px',
                                background: 'linear-gradient(145deg, #e6e6e6, #ffffff)',
                                boxShadow: 'inset 5px 5px 10px #d9d9d9, inset -5px -5px 10px #ffffff',
                                '&.Mui-focused fieldset': {
                                    borderColor: '#0C66E4',
                                    boxShadow: 'inset 2px 2px 5px #d9d9d9, inset -2px -2px 5px #ffffff, 0 0 0 2px rgba(12, 102, 228, 0.3)',
                                },
                            },
                        }}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, borderRadius: '8px', py: 1.5 }}
                    >
                        Login
                    </Button>
                    <Box sx={{ textAlign: 'center' }}>
                        <Link to="/register" style={{ textDecoration: 'none', color: '#0C66E4' }}>
                            Don't have an account? Register
                        </Link>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default LoginPage;
