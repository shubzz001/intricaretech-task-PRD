// src/pages/RegisterPage.jsx
import React, { useState } from 'react';
import {
    Box, Button, TextField, Typography, Container, Paper, Alert
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        let users = JSON.parse(localStorage.getItem('users')) || [];
        if (users.some(u => u.username === username)) {
            setError('Username already exists.');
            return;
        }

        const newUser = { username, password };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        navigate('/login'); // Redirect to login after successful registration
    };

    return (
        <Container maxWidth="xs">
            <Paper elevation={3} sx={{ p: 4, mt: 8, borderRadius: '15px', background: 'linear-gradient(145deg, #e6e6e6, #ffffff)', boxShadow: '5px 5px 10px #d9d9d9, -5px -5px 10px #ffffff' }}>
                <Typography variant="h4" component="h1" gutterBottom align="center">
                    Register
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
                        autoComplete="new-password"
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
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        id="confirmPassword"
                        autoComplete="new-password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
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
                        Register
                    </Button>
                    <Box sx={{ textAlign: 'center' }}>
                        <Link to="/login" style={{ textDecoration: 'none', color: '#0C66E4' }}>
                            Already have an account? Login
                        </Link>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default RegisterPage;
